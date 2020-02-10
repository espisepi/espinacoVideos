// https://www.babylonjs-playground.com/#8MGKWK#25

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
  FreeCamera
} from 'babylonjs';

@Injectable({
  providedIn: 'root'
})
export class GizmoManipulatorService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera: ArcRotateCamera;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) { }

  public createScene(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);

    this.createCameraArc();

    // Initialize GizmoManager
    const gizmoManager = new GizmoManager(this.scene);
    // initialize all gizmos

    this.createObjects();
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
    this.camera.minZ = 0.1;
  }

  public createObjects(): void {
    const hdrTexture = CubeTexture.CreateFromPrefilteredData('assets/textures/environment.dds', this.scene);
    // create skybox
    const hdrSkybox = Mesh.CreateBox('hdrSkyBox', 1000.0, this.scene);
    hdrSkybox.isPickable = false;
    const hdrSkyboxMaterial = new PBRMaterial('skyBox', this.scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;

    // create sphere
    const sphereGlass = Mesh.CreateSphere('sphereGlass', 48, 1.0, this.scene);
    sphereGlass.translate(new Vector3(1, 0, 0), -3);

    const glass = new PBRMaterial('glass', this.scene);
    glass.reflectionTexture =  hdrTexture;
    glass.refractionTexture = hdrTexture;
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;
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
