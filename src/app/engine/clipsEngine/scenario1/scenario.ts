import {
  Engine,
  Scene,
  ArcRotateCamera,
  PointLight,
  Vector3
} from 'babylonjs';
import { ClipObjects } from './clipObjects';

export class Scenario {
  public scene: Scene;
  public camera: ArcRotateCamera;
  private light: PointLight;
  private clipObjects: ClipObjects;

  public constructor(engine: Engine) {
    this.createScene(engine);
    this.createCamera();
    this.createLight();
    this.createClipObjects();
  }


  /* Metodos del constructor */

  public createScene(engine: Engine): void {
    this.scene = new Scene(engine);
  }

  public createCamera(): void {
    this.camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 4,
      Math.PI / 2.5,
      10,
      Vector3.Zero(),
      this.scene
    );
    const canvas = this.getCanvas();
    this.camera.attachControl(canvas, true);
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

  private getCanvas(): HTMLCanvasElement {
    return this.scene.getEngine().getRenderingCanvas();
  }



}