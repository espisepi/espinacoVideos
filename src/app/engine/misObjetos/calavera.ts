// https://www.babylonjs-playground.com/#TZJ0HQ#19

import {
  Scene,
  ArcRotateCamera,
  SceneLoader,
  PostProcess,
  Effect,
  Texture,
  Vector2,
  Camera
} from 'babylonjs';

export class Calavera {
  public rgbGlitchFX =
  `varying vec2 vUV;
uniform sampler2D textureSampler;
uniform vec2 screenSize;

uniform sampler2D noiseRef0;
uniform sampler2D noiseRef1;

uniform float time;

#define AMPLITUDE 0.05
#define SPEED 10.0

vec4 rgbShift( in vec2 p , in vec4 shift) {
    shift *= 2.0*shift.w - 1.0;
    vec2 rs = vec2(shift.x,-shift.y);
    vec2 gs = vec2(shift.y,-shift.z);
    vec2 bs = vec2(shift.z,-shift.x);    
    float r = texture2D(textureSampler, p+rs, 0.0).x;
    float g = texture2D(textureSampler, p+gs, 0.0).y;
    float b = texture2D(textureSampler, p+bs, 0.0).z;
    return vec4(r,g,b,1.0);
}
vec4 noise( in vec2 p ) {
    return texture2D(noiseRef0, p, 0.0);
}

vec4 vec4pow( in vec4 v, in float p ) {
    return vec4(pow(v.x,p),pow(v.y,p),pow(v.z,p),v.w); 
}
void main(void){
    vec2 p = vUV;
    vec4 c = vec4(0.0,0.0,0.0,1.0);
    vec4 shift = vec4pow(noise(vec2(SPEED*time,2.0*SPEED*time/25.0 )),8.0)
        		*vec4(AMPLITUDE,AMPLITUDE,AMPLITUDE,1.0);
    c += rgbShift(p, shift);
   gl_FragColor = c;
}
`;

  public constructor(scene: Scene, camera: Camera){
    Effect.ShadersStore['rgbGlitchEffectFragmentShader'] = this.rgbGlitchFX;
    this.inicializarCalavera(scene, camera);
  }

  public inicializarCalavera(scene: Scene, camera: Camera): void {
    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    SceneLoader.ImportMesh('', 'assets/scenes/', 'skull.babylon', scene, (newMeshes) => {
      // Set the target of the camera to the first imported mesh
      // camera.target = newMeshes[0];
    });

    // introducimos la animacion
    let time = 0;
    const rate = 0.01;
    // Move the light with the camera
    scene.registerBeforeRender(() => {
        //light.position = camera.position;
         time += scene.getAnimationRatio() * rate;
    });

    this.aplicarEfecto(scene, camera, time);

  }

  public aplicarEfecto(scene: Scene, camera: Camera, time: number): void {
    const postEffect = new PostProcess('rgbGlitchEffect', 'rgbGlitchEffect', ['time', 'screenSize'], ['noiseRef0', 'noiseRef1'], 1, camera);
    var noiseTexture0 = new Texture('./assets/textures/grass.jpg', scene);
    var noiseTexture1 = new Texture('./assets/textures/ground.jpg', scene);

    postEffect.onApply = (effect) => {
        effect.setVector2('screenSize', new Vector2(postEffect.width, postEffect.height));
        effect.setFloat('time', time); //this is the problematic line
        effect.setTexture('noiseRef0', noiseTexture0);
        effect.setTexture('noiseRef1', noiseTexture1);
    };
  }

}
