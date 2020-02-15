import { PostProcess, Texture, Vector2 } from 'babylonjs';
import { Scenario } from '../../clipsEngine/scenario';

export class PostEffectUtilities {
  public scenario: Scenario;

  public constructor(scenario: Scenario) {
    this.scenario = scenario;
  }

  public aplicarEfecto(): void {

    const postEffect = new PostProcess('rgbGlitchEffect', 'rgbGlitchEffect', ['time', 'screenSize'], ['noiseRef0', 'noiseRef1'], 1, this.scenario.camera);
    var noiseTexture0 = new Texture('./assets/textures/grass.jpg', this.scenario.scene);
    var noiseTexture1 = new Texture('./assets/textures/ground.jpg', this.scenario.scene);

    postEffect.onApply = (effect) => {
        effect.setVector2('screenSize', new Vector2(postEffect.width, postEffect.height));
        effect.setFloat('time', 0); //this is the problematic line
        effect.setTexture('noiseRef0', noiseTexture0);
        effect.setTexture('noiseRef1', noiseTexture1);
    };
  }
}
