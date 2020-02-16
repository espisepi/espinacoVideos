import { RgbGlitchFX } from './rgbGlitchFXShaders';
import { SierraFX } from './sierraFX';

export class ShadersUtilities {
  private rgbGlitchFX: RgbGlitchFX;
  private sierraFX: SierraFX;

  public constructor() { }


  public getRgbGlitchFX(): RgbGlitchFX {
    if (this.rgbGlitchFX === undefined) {
      this.rgbGlitchFX = new RgbGlitchFX();
    }
    return this.rgbGlitchFX;
  }

  public getSierraFX(): SierraFX {
    if (this.sierraFX === undefined) {
      this.sierraFX = new SierraFX();
    }
    return this.sierraFX;
  }

}
