import { Scenario } from './scenario';

// lo suyo es que esto sea una interface y no una implementacion
export class ClipObjects {

  public scenario: Scenario;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.createClipObjects();
  }

  public createClipObjects(): void {
    /*
    Aqui es donde instanciaremos todos los objetos que
    se utilizaran en nuestra escena, Ejemplo:
    import { OceanWaves } from '../misObjetos/oceanWaves';
    const oceanWaves = new OceanWaves(this.scenario);
    */

  }

}
