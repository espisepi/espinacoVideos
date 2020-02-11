// https://www.babylonjs-playground.com/#14KRGG#3

import { Injectable, ElementRef, NgZone } from '@angular/core';
import { WindowRefService } from './../../services/window-ref.service';

import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  GizmoManager,
  Mesh,
  PBRMaterial,
  CubeTexture,
  Color3,
  FreeCamera,
  PhotoDome
} from 'babylonjs';

@Injectable({
  providedIn: 'root'
})
export class Photo360Service {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) { }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);

    this.createCameraArc();

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

