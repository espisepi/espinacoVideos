// https://www.babylonjs-playground.com/#L76FB1#49

import { Scenario } from '../clipsEngine/scenario';
import { WaterMaterial } from 'babylonjs-materials';
import { StandardMaterial, Mesh, Vector2, Texture } from 'babylonjs';

export class OceanWaves {
  public scenario: Scenario;

  public waterMesh: Mesh;
  public waterMaterial: WaterMaterial;
  public groundMesh: Mesh;
  public groundMaterial: StandardMaterial;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.initializeObject();
  }

  private initializeObject() {
    this.createWater();
    this.createGround();
  }

  private createWater(): void {

    // Create waterMaterial
    this.waterMaterial = new WaterMaterial(
      'waterMaterial',
      this.scenario.scene,
      new Vector2(512, 512));
    this.waterMaterial.bumpTexture = new Texture('//www.babylonjs.com/assets/waterbump.png', this.scenario.scene);
    this.waterMaterial.windForce = -10;
    this.waterMaterial.waveHeight = 0.5;
    this.waterMaterial.bumpHeight = 0.1;
    this.waterMaterial.waveLength = 0.1;
    this.waterMaterial.waveSpeed = 50.0;
    this.waterMaterial.colorBlendFactor = 0;
    this.waterMaterial.windDirection = new Vector2(1, 1);
    this.waterMaterial.colorBlendFactor = 0;

    // Create waterMesh
    this.waterMesh = Mesh.CreateGround('waterMesh', 512, 512, 32, this.scenario.scene, false);
    this.waterMesh.material = this.waterMaterial;
  }

  private createGround(): void {

    // Create groundMaterial
    this.groundMaterial = new StandardMaterial('groundMaterial', this.scenario.scene);
    const groundTexture = new Texture('//www.babylonjs.com/assets/sand.jpg', this.scenario.scene);
    groundTexture.vScale = groundTexture.uScale = 4.0;
    this.groundMaterial.diffuseTexture = groundTexture;

    // Create groundMesh
    this.groundMesh = Mesh.CreateGround('ground', 512, 512, 32, this.scenario.scene, false);
    this.groundMesh.position.y = -1;
    this.groundMesh.material = this.groundMaterial;

    // reflejar el ground en el agua
    this.waterMaterial.addToRenderList(this.groundMesh);
  }

  /* Metodos para reflejar el agua con los demas
    elementos de pantalla */
  public configureWaterMaterial(meshArray: Mesh[]): void {
      meshArray.forEach((mesh) => {
        this.waterMaterial.addToRenderList(mesh);
      });
  }


}
