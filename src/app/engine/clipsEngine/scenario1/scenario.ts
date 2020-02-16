import {
  Engine,
  Scene,
  ArcRotateCamera,
  PointLight,
  Vector3,
  Camera,
  WebVRFreeCamera,
  ActionManager,
  ExecuteCodeAction,
  UniversalCamera
} from 'babylonjs';
import { ClipObjects } from './clipObjects';
import { PostEffects } from './PostEffects';
import { KeyboardInputs } from './keyboard';

export class Scenario {
  public scene: Scene;
  public camera: Camera;
  private light: PointLight;
  private clipObjects: ClipObjects;
  private postEffects: PostEffects;

  public constructor(engine: Engine) {
    this.createScene(engine);
    this.createCamera('universalCamera');
    this.createLight();
    this.createClipObjects();
    this.createPostEffects();
    this.createKeyboardInputs();
  }


  /* Metodos del constructor */

  public createKeyboardInputs(): void {
    const keyBoard = new KeyboardInputs(this);
  }

  public createCamera(cameraName: string) {
    if (cameraName === 'arcRotateCamera') { this.createArcRotateCamera(); }
    if (cameraName === 'webVRFreeCamera') { this.createWebVRFreeCamera(); }
    if (cameraName === 'universalCamera') { this.createUniversalCamera(); }
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

  public createUniversalCamera(): void {
    this.camera = new UniversalCamera(
      'UniversalCamera',
      new Vector3(0, 0, -10), this.scene);
    this.attachControlCamera();
  }

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