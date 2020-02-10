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
  AssetsManager
} from 'babylonjs';

@Injectable({
  providedIn: 'root'
})
export class LoadGltfModelService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scene: Scene;
  private camera: FreeCamera;
  private light: Light;

  private sphere: Mesh;
  private assetsManager: AssetsManager;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
    ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);

    this.camera = new FreeCamera('camera1', new Vector3(5, 10, -20), this.scene);
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas, false);

    this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);

    this.sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene);
    this.sphere.position.y = 1;

    const sphereMaterial = new StandardMaterial('sun_surface', this.scene);
    sphereMaterial.diffuseTexture = new Texture('assets/textures/sun.jpg', this.scene);
    this.sphere.material = sphereMaterial;

    this.assetsManager = new AssetsManager(this.scene);
    let meshTask = this.assetsManager.addMeshTask('calavera', '', 'assets/model/', 'scene.gltf');

    this.scene.registerAfterRender(() => {
      this.sphere.rotate (
        new Vector3(0, 1, 0),
        0.02,
        BABYLON.Space.LOCAL
      );
    });

    // this.showWorldAxis(8);
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

  /**
   * creates the world axes
   *
   * Source: https://doc.babylonjs.com/snippets/world_axes
   *
   * @param size number
   */
  public showWorldAxis(size: number): void {

    const makeTextPlane = (text: string, color: string, textSize: number) => {
      const dynamicTexture = new DynamicTexture('DynamixTexture', 50, this.scene, true);
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
      const plane = Mesh.CreatePlane('TextPlane', textSize, this.scene, true);
      const material = new StandardMaterial('TextPlaneMaterial', this.scene);
      material.backFaceCulling = false;
      material.specularColor = new BABYLON.Color3(0, 0, 0);
      material.diffuseTexture = dynamicTexture;
      plane.material = material;
      return plane;
    };

    const axisX = Mesh.CreateLines(
      'axisX',
      [
        Vector3.Zero(),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this.scene
    );

    axisX.color = new BABYLON.Color3(1, 0, 0);
    const xChar = makeTextPlane('X', 'red', size / 10);
    xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

    // const axisY
  }
}
