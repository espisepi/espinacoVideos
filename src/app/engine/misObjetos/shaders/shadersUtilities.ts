import { RgbGlitchFX } from './rgbGlitchFX';
import { Effect } from 'babylonjs';


export class ShadersUtilities {
  private rgbGlitchFX: RgbGlitchFX;

  public constructor() { }

  public getRgbGlitchFX(): RgbGlitchFX {

    if (this.rgbGlitchFX === undefined) {
      this.rgbGlitchFX = new RgbGlitchFX();
      this.addShaderToShadersStore('rgbGlitchEffectFragmentShader', this.rgbGlitchFX.fragmentShader);
    }
    return this.rgbGlitchFX;
  }

  public addShaderToShadersStore(name: string, shader: string): void {
    Effect.ShadersStore[name] = shader;
  }
}
