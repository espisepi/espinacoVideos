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
  UniversalCamera,
  HemisphericLight,
  Light
} from 'babylonjs';
import { ClipObjects } from './clipObjects';
import { PostEffects } from './PostEffects';
import { KeyboardInputs } from './keyboard';
import { AnimationUtility } from './animationUtility';
import { NubesParticleSystem } from './NubesParticleSystem';
import { ParticlesLearn } from './particlesLearn';
import { threadId } from 'worker_threads';

export class Scenario {
  public scene: Scene;
  public camera: Camera;
  public light: Light;
  public clipObjects: ClipObjects;
  public postEffects: PostEffects;

  public constructor(engine: Engine) {
    this.createScene(engine);
    this.createCamera('arcRotateCamera');
    this.createHemisphericLight();
    this.createClipObjects();
    this.createPostEffects();
    //this.createKeyboardInputs();
    //this.createAnimations();
    //this.createNubesParticleSystem();
    this.createParticlesLearn();
  }


  /* Metodos del constructor */

  public createParticlesLearn(): void {
    const particlesLearn = new ParticlesLearn(this.scene);
  }

  public createNubesParticleSystem(): void {
    const sucio = new NubesParticleSystem(this.scene);
  }

  public createAnimations(): void {
    const animation = new AnimationUtility(this);
  }

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

  public createPointLight() {
    const light = new PointLight(
    'Omni',
    new Vector3(20, 200, 100),
    this.scene);
    this.scene.registerBeforeRender(() => {
      light.position = this.camera.position;
    });
    this.light = light;
  }

  public createHemisphericLight() {
    this.light = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this.scene
    );
    this.light.intensity = 1.0;
  }

  public createClipObjects(): void {
    this.clipObjects = new ClipObjects(this.scene, this.camera);
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