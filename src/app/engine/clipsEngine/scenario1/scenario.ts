import {
  Engine,
  Scene,
  ArcRotateCamera,
  PointLight,
  Vector3,
  Camera,
  WebVRFreeCamera
} from 'babylonjs';
import { ClipObjects } from './clipObjects';
import { PostEffects } from './PostEffects';

export class Scenario {
  public scene: Scene;
  public camera: Camera;
  private light: PointLight;
  private clipObjects: ClipObjects;
  private postEffects: PostEffects;

  public constructor(engine: Engine) {
    this.createScene(engine);
    this.createCamera('arcRotateCamera');
    this.createLight();
    this.createClipObjects();
    this.createPostEffects();
  }


  /* Metodos del constructor */

  public createCamera(cameraName: string) {
    if (cameraName === 'arcRotateCamera') { this.createArcRotateCamera(); }
    if (cameraName === 'webVRFreeCamera') { this.createWebVRFreeCamera(); }
  }

  public createPostEffects(): void {
    // this.postEffects = new PostEffects(this);
  }

  public createScene(engine: Engine): void {
    this.scene = new Scene(engine);
  }

  public createLight() {
    this.light = new PointLight(
    'Omni',
    new Vector3(20, 200, 100),
    this.scene);

    this.scene.registerBeforeRender(() => {
      this.light.position = this.camera.position;
    });
  }

  public createClipObjects(): void {
    this.clipObjects = new ClipObjects(this);
  }

  /* Metodos privados que utilizo */

  public createWebVRFreeCamera(): void {
    this.camera = new WebVRFreeCamera(
      'camera',
      new Vector3(0, 2, 0),
      this.scene
      );
    this.attachControlCamera();
  }

  public createArcRotateCamera(): void {
    this.camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 4,
      Math.PI / 2.5,
      10,
      Vector3.Zero(),
      this.scene
    );
    this.attachControlCamera();
  }

  public attachControlCamera(): void {
    const canvas = this.getCanvas();
    this.camera.attachControl(canvas, true);
  }

  private getCanvas(): HTMLCanvasElement {
    return this.scene.getEngine().getRenderingCanvas();
  }


}