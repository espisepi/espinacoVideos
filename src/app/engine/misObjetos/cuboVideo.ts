// https://www.babylonjs-playground.com/#1OH09K#131

import {
  Scene,
  ArcRotateCamera,
  SceneLoader,
  PostProcess,
  Effect,
  Texture,
  Vector2,
  Camera,
  Mesh,
  ShaderMaterial,
  VideoTexture,
  CubeMapToSphericalPolynomialTools,
  MeshBuilder,
  StandardMaterial
} from 'babylonjs';

export class CuboVideo {
  public mesh: Mesh;
  public material: ShaderMaterial;
  public customVertexShader: string;
  public customFragmentShader: string;

  public constructor(scene: Scene, camera: ArcRotateCamera) {
    this.initializeObject(scene, camera);
  }

  private initializeObject(scene: Scene, camera: Camera) {
    this.createShaders();
    this.createShaderMaterial(scene);
    this.createMesh(scene);
  }

  private createMesh(scene: Scene): void {
    this.mesh = MeshBuilder.CreateBox('box', {}, scene);
    this.mesh.material = this.material;
    // Codigo sucio
    let cubo2 = MeshBuilder.CreateBox('box', {}, scene);
    cubo2.material = this.material;
    cubo2.position.x = 4;
    
    let cubo3 = MeshBuilder.CreateCylinder('cilinder', {}, scene);
    cubo3.material = this.material;
    cubo3.position.x = 1;

    //let cubo4 = MeshBuilder.


    // Fin codigo sucio
    let playing = true;
    document.onkeydown = (event) => {
      if (event.shiftKey) {
        if (playing) {
          cubo2.setEnabled(true);
        } else {
          cubo2.setEnabled(false);
        }
        playing = !playing;
      }
    }

  }

  private createShaderMaterial(scene: Scene): void {
    this.material = new ShaderMaterial('shader', scene, {
      vertex: 'custom',
      fragment: 'custom',
    },
    {
      attributes: ['position', 'normal', 'uv'],
      uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection']
    });

    const textureVideo = new VideoTexture('video', 'assets/textures/charliGarcia.mp4', scene, false);
    this.material.setTexture('textureSampler', textureVideo);
    // this.material.backFaceCulling = false;
    // Creamos distintos materials, lo guardamos como variables globales, con el mismo textureVideo
  }

  private createShaders(): void {

    this.customVertexShader = "\r\n"+   
		"precision highp float;\r\n"+

    	"// Attributes\r\n"+
    	"attribute vec3 position;\r\n"+
    	"attribute vec2 uv;\r\n"+

    	"// Uniforms\r\n"+
    	"uniform mat4 worldViewProjection;\r\n"+

    	"// Varying\r\n"+
    	"varying vec2 vUV;\r\n"+

    	"void main(void) {\r\n"+
    	"    gl_Position = worldViewProjection * vec4(position, 1.0);\r\n"+

    	"    vUV = uv;\r\n"+
      "}\r\n";
      
      this.customFragmentShader = "\r\n"+
      "precision highp float;\r\n"+
 
       "varying vec2 vUV;\r\n"+
 
       "uniform sampler2D textureSampler;\r\n"+
 
       "void main(void) {\r\n"+
       "    gl_FragColor = texture2D(textureSampler, vUV);\r\n"+
       "}\r\n";

       Effect.ShadersStore['customVertexShader'] = this.customVertexShader;
       Effect.ShadersStore['customFragmentShader'] = this.customFragmentShader;
  }

}