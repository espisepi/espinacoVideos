import { RgbGlitchFX } from './rgbGlitchFX';
import { Effect } from 'babylonjs';


export class ShadersUtilities {
  private rgbGlitchFX: RgbGlitchFX;

  public constructor() { }

  public getRgbGlitchFX(): RgbGlitchFX {

    if (this.rgbGlitchFX === undefined) {
      this.rgbGlitchFX = new RgbGlitchFX();
    }
    return this.rgbGlitchFX;
  }
}
