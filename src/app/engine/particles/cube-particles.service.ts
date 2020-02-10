// https://www.babylonjs-playground.com/#2FPT1A#5

import { Injectable, ElementRef, NgZone } from '@angular/core';
import { WindowRefService } from './../../services/window-ref.service';
import {
  Engine,
  Scene,
  Color4,
  FreeCamera,
  Vector3,
  Camera,
  Light,
  HemisphericLight,
  Mesh,
  StandardMaterial,
  Texture,
  DynamicTexture,
  AssetsManager,
  Color3,
  ArcRotateCamera,
  PointLight,
  MeshBuilder,
  SolidParticle,
  SolidParticleSystem
} from 'babylonjs';

@Injectable({
  providedIn: 'root'
})
export class CubeParticlesService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private light: Light;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);

    this.camera = new ArcRotateCamera('camera1', 0, 0, 0, new Vector3(0, 0, -0), this.scene);
    this.camera.setPosition(new Vector3(0, 50, -200));
    this.camera.attachControl(this.canvas, true);

    let pl = new PointLight('p1', new Vector3(0, 0, 0), this.scene);
    pl.diffuse = new Color3(1, 1, 1);
    pl.intensity = 1.0;

    let nb = 160000; // nb of triangles
    let fact = 100; // cube size

    let myPositionFunction = (particle, i, s) => {
      particle.position.x = (Math.random() - 0.5) * fact;
      particle.position.y = (Math.random() - 0.5) * fact;
      particle.position.z = (Math.random() - 0.5) * fact;
      particle.rotation.x = Math.random() * 3.15;
      particle.rotation.y = Math.random() * 3.15;
      particle.rotation.z = Math.random() * 1.5;
      particle.color = new Color4(
        particle.position.x / fact + 0.5,
        particle.position.y / fact + 0.5,
        particle.position.z / fact + 0.5, 1.0
      );
    };

    // model: triangle
    const triangle = MeshBuilder.CreateDisc('t', {tessellation: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, this.scene);

    // SPS creation: Immutable {updatable: false}
    const SPS = new SolidParticleSystem('SPS', this.scene, {updatable: false});
    SPS.addShape(triangle, nb, {positionFunction: myPositionFunction});
    const shape = SPS.buildMesh();

    // dispose the model
    triangle.dispose();

    // SPS mesh animation
    this.scene.registerBeforeRender(() => {
      pl.position = this.camera.position;
      SPS.mesh.rotation.y += 0.01;
      // SPS.mesh.rotation.z += 0.005;
    });
  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }

}
