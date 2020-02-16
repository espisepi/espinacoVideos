import { Effect } from 'babylonjs';

export class SierraFX {
  public fragmentShader: string;
  public fragmentShaderName: string;
  public vertexShader: string;
  public vertexShaderName: string;

  public constructor() {
    this.createVertexShader();
    this.createFragmentShader();
    this.addShaderToShadersStore();
  }
  private createVertexShader() {
    // Este efecto no tiene vertex shader
  }

  private createFragmentShader(): void {
    this.fragmentShaderName = 'sierraEffect';
    this.fragmentShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    // Samplers
    varying vec2 vUV;
    uniform sampler2D textureSampler;

    // Parameters
    uniform vec2 screenSize;
    uniform float threshold;

    void main(void)
    {
      vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);
      vec4 baseColor = texture2D(textureSampler, vUV);


      if (baseColor.r < threshold) {
        gl_FragColor = baseColor;
      } else {
        gl_FragColor = vec4(0);
      }
  }`;
  }


  public addShaderToShadersStore(): void {
    Effect.ShadersStore['sierraEffectFragmentShader'] = this.fragmentShader;
  }
}