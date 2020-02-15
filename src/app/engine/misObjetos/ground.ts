import { Material, Mesh, Texture, StandardMaterial } from 'babylonjs';
import { Scenario } from '../clipsEngine/scenario';

export class Ground {
  public scenario: Scenario;
  public mesh: Mesh;
  public material: StandardMaterial;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.initializeObject();
  }

  private initializeObject(): void {
    // Create groundMaterial
    this.material = new StandardMaterial('groundMaterial', this.scenario.scene);
    const groundTexture = new Texture('//www.babylonjs.com/assets/sand.jpg', this.scenario.scene);
    groundTexture.vScale = groundTexture.uScale = 4.0;
    this.material.diffuseTexture = groundTexture;

    // Create groundMesh
    this.mesh = Mesh.CreateGround('ground', 512, 512, 32, this.scenario.scene, false);
    this.mesh.position.y = -1;
    this.mesh.material = this.material;

  }


}
