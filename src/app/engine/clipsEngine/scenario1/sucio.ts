import { Color3, GPUParticleSystem, Mesh, ParticleSystem, Scene, StandardMaterial, Texture, Vector3, Color4 } from 'babylonjs';

export class Sucio {

  public fountain: Mesh;

  public constructor(scene: Scene) {
    this.createSucio(scene);
  }

  public createSucio(scene: Scene): void {
    this.createHumoParticles(scene);
  }

  public createHumoParticles(scene: Scene): void {
    this.createMeshes(scene);
    this.createNewSystem(scene);
    this.createGUI(scene);
  }

  public createGUI(scene: Scene) {
    let advancedTexture;
    if(advancedTexture) {
      advancedTexture.dispose();
    }
    //advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

  }

  public createNewSystem(scene: Scene) {
    let particleSystem;
    let useGPUVersion = false;
    const fogTexture = new Texture(
      'https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png',
      scene
    );

    if (particleSystem) {
      particleSystem.dispose();
    }

    if (useGPUVersion && GPUParticleSystem.IsSupported) {
      particleSystem = new GPUParticleSystem(
        'particles',
        { capacity: 50000},
        scene);
      particleSystem.activeParticleCount = 15000;
      particleSystem.manualEmitCount = particleSystem.activeParticleCount;
      // Starting all from
      particleSystem.minEmitBox = new Vector3(-50, 2, -50);
      // To...
      particleSystem.maxEmitBox = new Vector3(50, 2, 50);

    } else {
      particleSystem = new ParticleSystem('particles', 2500, scene);
      particleSystem.manualEmitCount = particleSystem.getCapacity();
      // Starting all from
      particleSystem.minEmitBox = new Vector3(-25, 2, -25);
      // To...
      particleSystem.maxEmitBox = new Vector3(25, 2, 25);
    }

    particleSystem.particleTexture = fogTexture.clone();
    particleSystem.emitter = this.fountain;

    particleSystem.color1 = new Color4(0.8, 0.8, 0.8, 0.1);
    particleSystem.color2 = new Color4(.95, .95, .95, 0.15);
    particleSystem.colorDead = new Color4(0.9, 0.9, 0.9, 0.1);
    particleSystem.minSize = 3.5;
    particleSystem.maxSize = 5.0;
    particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
    particleSystem.emitRate = 50000;
    particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    particleSystem.gravity = new Vector3(0, 0, 0);
    particleSystem.direction1 = new Vector3(0, 0, 0);
    particleSystem.direction2 = new Vector3(0, 0, 0);
    particleSystem.minAngularSpeed = -2;
    particleSystem.maxAngularSpeed = 2;
    particleSystem.minEmitPower = .5;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.005;

    particleSystem.start();

  }

  public createMeshes(scene: Scene) {
    const fountain = Mesh.CreateBox('fountain', .01, scene);
    fountain.visibility = 0;

    const ground = Mesh.CreatePlane('ground', 50.0, scene);
    ground.position = new Vector3(0, 0, 0);
    ground.rotation = new Vector3(Math.PI / 2, 0, 0);

    // Se ha realizado asi porque
    // la linea comentada no funcionaba
    // ground.material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);
    const materialTemp = new StandardMaterial('groundMat', scene);
    materialTemp.backFaceCulling = false;
    materialTemp.diffuseColor = new Color3(0.3, 0.3, 1);
    ground.material = materialTemp;

    this.fountain = fountain;
  }

}
