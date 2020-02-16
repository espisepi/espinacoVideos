import { Scenario } from './scenario';
import { Calavera } from '../../misObjetos/calavera';

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

    const calavera = new Calavera(this.scenario.scene, this.scenario.camera);
  }

}
