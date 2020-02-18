import { Scene, ParticleSystem, Texture, MeshBuilder, StandardMaterial, Color3, SphereParticleEmitter, Color4, Vector3, Mesh } from 'babylonjs';

export class ParticlesLearn {

  public scene: Scene;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.createSunParticles();
    //this.createGlassWubbleBall();
  }

  public createGlassWubbleBall(): void {
    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = Mesh.CreateSphere(
      'sphere1',
      32,
      23,
      this.scene
    );
    const fsphere = Mesh.CreateSphere(
      'sphere1',
      32,
      23,
      this.scene
    );
    fsphere.isVisible = false;

    const mat = new StandardMaterial(
      'mat',
      this.scene
    );
    // mat.backFaceCulling = false;
    // mat.alpha = 0.7;
    mat.diffuseColor = new Color3(
      0.4,
      0.5,
      0.7
    );
    mat.bumpTexture = new Texture(
      'http://www.synergy-development.fr/equalonyzer/images/grained_uv.png',
      this.scene
    );
    // mat.bumpTexture.uScale = 4;
    // mat.bumpTexture.vScale = 4;

  }

  public createSunParticles(): void {

    // Create surface particles
    const surfaceParticles = new ParticleSystem(
      'surfaceParticles',
      1600,
      this.scene
    );
    surfaceParticles.particleTexture = new Texture(
      'assets/textures/T_SunSurface.png',
      this.scene
    );

    // Create core sphere
    const coreSphere = MeshBuilder.CreateSphere(
      'coreSphere',
      { diameter: 2.01, segments: 64},
      this.scene
    );
    const  coreMat = new StandardMaterial(
      'coreMat',
      this.scene
    );
    coreMat.emissiveColor = new Color3(
      0.3773,
      0.0930,
      0.0266);
    coreSphere.material = coreMat;

    // Pre-warm
    surfaceParticles.preWarmStepOffset = 10;
    surfaceParticles.preWarmCycles = 100;

    // Initial rotation
    surfaceParticles.minInitialRotation = -2 * Math.PI;
    surfaceParticles.maxInitialRotation = 2 * Math.PI;

    // Where the sun particles come from
    const sunEmitter = new SphereParticleEmitter();
    sunEmitter.radius = 1;
    sunEmitter.radiusRange = 0; // emit only from shape surface

    // Assign particles to emitters
    surfaceParticles.emitter = coreSphere;
    surfaceParticles.particleEmitterType = sunEmitter;

    // Color gradient over time
    surfaceParticles.addColorGradient(
      0,
      new Color4(0.8509, 0.4784, 0.1019, 0.0)
    );
    surfaceParticles.addColorGradient(
      0.4,
      new Color4(0.6259, 0.3056, 0.0619, 0.5)
    );
    surfaceParticles.addColorGradient(
      0.5,
      new Color4(0.6039, 0.2887, 0.0579, 0.5)
    );
    surfaceParticles.addColorGradient(
      1.0,
      new Color4(0.3207, 0.0713, 0.0075, 0.0)
    );

    // Size of each particle (random between...
    surfaceParticles.minSize = 0.4;
    surfaceParticles.maxSize = 0.7;

    // Life time of each particle (random between...
    surfaceParticles.minLifeTime = 8.0;
    surfaceParticles.maxLifeTime = 8.0;

    // Emission rate
    surfaceParticles.emitRate = 200;

    // Blend mode: BLENDMODE_ONEONE, BLENDMODE_STANDARD, or BLENDMODE_ADD
    surfaceParticles.blendMode = ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    surfaceParticles.gravity = new Vector3(0, 0, 0);

    // Angular speed, in radians
    surfaceParticles.minAngularSpeed = -0.4;
    surfaceParticles.maxAngularSpeed = 0.4;

    // Speed
    surfaceParticles.minEmitPower = 0;
    surfaceParticles.maxEmitPower = 0;
    surfaceParticles.updateSpeed = 0.005;

    // No billboard
    surfaceParticles.isBillboardBased = false;

    // Start the particle system
    surfaceParticles.start();

    // particleSystem.stop();
    // particleSystem.reset();
    // particleSystem.targetStopDuration = 5;
    // particleSystem.disposeOnStop = true;

  }
}
