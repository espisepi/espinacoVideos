import { PostProcess, Texture, Vector2, Effect } from 'babylonjs';
import { ShadersUtilities } from '../../misObjetos/shaders/shadersUtilities';
import { Scenario } from './scenario';

export class PostEffects {
  public scenario: Scenario;
  public shadersUtilities: ShadersUtilities;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
    this.shadersUtilities = new ShadersUtilities();
    this.createSierraEffect();
  }

  public createSierraEffect(): void {
    const shader = this.shadersUtilities.getSierraFX();
    const postProcess = new PostProcess(
      shader.fragmentShaderName,
      shader.fragmentShaderName,
      ['screenSize', 'threshold'],
      null,
      1,
      this.scenario.camera
    );
    const textureSampler = new Texture('./assets/textures/grass.jpg', this.scenario.scene);
    postProcess.onApply = (effect) => {
      effect.setTexture('textureSampler', textureSampler);
      effect.setFloat2('screenSize', postProcess.width, postProcess.height);
      effect.setFloat('threshold', 0.30);
    };
  }

}
