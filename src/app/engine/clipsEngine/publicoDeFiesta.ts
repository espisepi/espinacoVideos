import { Scenario } from './scenario';

// lo suyo es que esto sea una interface y no una implementacion
export class PublicoDeFiesta {

  public scenario: Scenario;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.crearAlPublico();
  }

  public crearAlPublico(): void {
    /*
    Aqui es donde instanciaremos todos los objetos que
    se utilizaran en nuestra escena, Ejemplo:
    import { OceanWaves } from '../publicoFiestero/oceanWaves';
    const oceanWaves = new OceanWaves(this.scenario);
    */


  }

}
