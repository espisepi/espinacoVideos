import { Scenario } from '../clipsEngine/scenario';
import { Mesh, Vector2, Texture } from 'babylonjs';
import { WaterMaterial } from 'babylonjs-materials';


export class Water {
  public scenario: Scenario;
  public mesh: Mesh;
  public material: WaterMaterial;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.initializeObject();
  }

  private initializeObject(): void {
    // Create waterMaterial
    this.material = new WaterMaterial(
      'waterMaterial',
      this.scenario.scene,
      new Vector2(512, 512));
    this.material.bumpTexture = new Texture('//www.babylonjs.com/assets/waterbump.png', this.scenario.scene);
    this.material.windForce = -10;
    this.material.waveHeight = 0.5;
    this.material.bumpHeight = 0.1;
    this.material.waveLength = 0.1;
    this.material.waveSpeed = 50.0;
    this.material.colorBlendFactor = 0;
    this.material.windDirection = new Vector2(1, 1);
    this.material.colorBlendFactor = 0;

    this.mesh = Mesh.CreateGround('waterMesh', 512, 512, 32, this.scenario.scene, false);
    this.mesh.material = this.material;
  }

  /* Metodos para reflejar el agua con los demas
    elementos de pantalla */
    public addToRenderList(meshArray: Mesh[]): void {
      meshArray.forEach((mesh) => {
        this.material.addToRenderList(mesh);
      });
  }
}
