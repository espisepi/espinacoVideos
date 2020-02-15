// https://www.babylonjs-playground.com/#L76FB1#49

import { Scenario } from '../clipsEngine/scenario';
import { WaterMaterial } from 'babylonjs-materials';
import { StandardMaterial, Mesh, Vector2, Texture } from 'babylonjs';
import { Water } from './water';
import { Ground } from './ground';

export class OceanWaves {
  public scenario: Scenario;

  public water: Water;
  public ground: Ground;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.initializeObject();
  }

  private initializeObject() {
    this.createWater();
    this.createGround();
  }

  private createWater(): void {
    this.water = new Water(this.scenario);
  }

  private createGround(): void {
    this.ground = new Ground(this.scenario);

    // reflejar el ground en el agua
    this.addToWaterRenderList([this.ground.mesh]);
  }

  /* Metodos para reflejar el agua con los demas
    elementos de pantalla */
  public addToWaterRenderList(meshArray: Mesh[]): void {
      this.water.addToRenderList(meshArray);
  }


}
