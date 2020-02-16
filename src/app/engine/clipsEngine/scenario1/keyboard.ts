import { Scenario } from './scenario';
import { ActionManager, ExecuteCodeAction } from 'babylonjs';
import { Calavera } from '../../misObjetos/calavera';

export class KeyboardInputs {
  public scenario: Scenario;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.createInputs();
  }

  public createInputs() {
    const inputMap ={};
    const scene = this.scenario.scene;
    const camera = this.scenario.camera;

    scene.actionManager = new ActionManager(scene);
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
    }));
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
    }));

    // Game/Render loop
    scene.onBeforeRenderObservable.add(() => {
        // tslint:disable-next-line: no-string-literal
        if (inputMap ['z'] ) {
          const calavera = new Calavera(scene, camera);
        }
    });
  }


}