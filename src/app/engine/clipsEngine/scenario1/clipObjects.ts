import { Scenario } from './scenario';
import { Calavera } from '../../misObjetos/calavera';
import { CuboVideo } from '../../misObjetos/cuboVideo';
import { Scene, Camera } from 'babylonjs';

// lo suyo es que esto sea una interface y no una implementacion
export class ClipObjects {

  public constructor(scene: Scene, camera: Camera) {
    this.createClipObjects(scene, camera);
  }

  public createClipObjects(scene: Scene, camera: Camera): void {
    /*
    Aqui es donde instanciaremos todos los objetos que
    se utilizaran en nuestra escena, Ejemplo:
    import { OceanWaves } from '../misObjetos/oceanWaves';
    const oceanWaves = new OceanWaves(this.scenario);
    */

    const calavera = new Calavera(scene, camera);
    // const cuboVideo = new CuboVideo(scene, camera);
  }

}
