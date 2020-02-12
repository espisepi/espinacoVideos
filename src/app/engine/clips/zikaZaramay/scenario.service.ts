// https://www.youtube.com/watch?v=PH90HL9qfhU

import { Injectable, ElementRef, NgZone } from '@angular/core';
import { WindowRefService } from './../../../services/window-ref.service';

import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  PhotoDome,
  StandardMaterial,
  VideoTexture,
  Mesh,
  Color4,
  MeshBuilder,
  Color3,
  PointLight,
  SolidParticleSystem,
  Layer
} from 'babylonjs';
import { Calavera } from './calavera';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;
  private light: PointLight;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) { }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.light = new PointLight('Omni', new Vector3(20, 200, 100), this.scene);

    this.createCameraArc();

    this.createBackground('assets/textures/charliGarcia.mp4');

    const calavera = new Calavera(this.scene, this.camera);
    // this.createPhotoDome();
    // this.createVideo();
    // this.createCubeParticles();

    this.scene.registerBeforeRender(() => {
      this.light.position = this.camera.position;
  });

  }

  public createBackground(path: string): void {
    const background = new Layer('back', null, this.scene);
    const videoTexture = new VideoTexture('video', [path], this.scene, false);
    background.texture = videoTexture;
    background.isBackground = true;
    background.texture.level = 0;
    background.texture.wAng = 0;

    // Access video for play/pause
    let playing = true;
    document.onkeydown = () => {
        if (playing) {
            videoTexture.video.pause();
        } else {
            videoTexture.video.play();
        }
        playing = !playing;
    }

  }


  public createCubeParticles() {

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
      //SPS.mesh.rotation.y += 0.01;
      // SPS.mesh.rotation.z += 0.005;
    });
  }

  public createVideo(): void {

    // Create a material from the video
    const videoTexture = new VideoTexture(
      'video',
      ['assets/textures/babylonjs.mp4', 'assets/textures/babylonjs.webm'],
      this.scene, true, false);
    videoTexture.video.play();

    const mat = new StandardMaterial('mat', this.scene);
    mat.diffuseTexture = videoTexture;

    // Attach the video material to the mesh
    const plane = Mesh.CreatePlane('plane1', 8, this.scene);
    plane.scaling.x = 1920 / 1080; // set aspect ratio
    plane.material = mat;

  }

  public createPhotoDome(): void {
    const dome = new PhotoDome(
      'testdome',
      '/assets/textures/360photo.jpg',
      {
        resolution: 32,
        size: 1000
      },
      this.scene
    );
  }

  public createCameraArc(): void {
    this.camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 4,
      Math.PI / 2.5,
      10,
      Vector3.Zero(),
      this.scene
      );
    this.camera.attachControl(this.canvas, true);
    // this.camera.inputs.attached.mouseWheel.detachControl(this.canvas);
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

