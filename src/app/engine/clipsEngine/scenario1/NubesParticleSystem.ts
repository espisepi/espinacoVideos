import { Color3, GPUParticleSystem, Mesh, ParticleSystem, Scene, StandardMaterial, Texture, Vector3, Color4 } from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export class NubesParticleSystem {

  public fountain: Mesh;
  public particleSystem: any;
  public bottomPanel: GUI.StackPanel;
  public useGPUVersion: boolean;
  public leftPanel: GUI.StackPanel;
  public scene: Scene;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.createSucio();
  }

  public createSucio(): void {
    this.createHumoParticles();
  }

  public createHumoParticles(): void {
    const scene = this.scene;
    this.createMeshes(scene);
    this.createNewSystem(scene);
    this.createGUI(scene);

    if (this.particleSystem.activeParticleCount) {
      this.addHeader('particles count: ' + this.particleSystem.activeParticleCount, this.bottomPanel);
    } else {
      this.addHeader('particles count: ' + this.particleSystem.getCapacity(), this.bottomPanel);
    }

    if (GPUParticleSystem.IsSupported) {
      this.addCheckBox(
        'Use GPU particles',
        this.useGPUVersion,
        (value) => {
          this.useGPUVersion = value;
          this.createNewSystem(this.scene);
          this.createGUI(this.scene);
        },
        this.leftPanel
      );
    } else {
      this.addHeader('Browser does not support WebGL2', this.leftPanel);
      this.addHeader('Using CPU particles instead...', this.leftPanel);
    }
  }

  public addCheckBox(text: string, initial: boolean, onCheck: (value: any) => void, panel: GUI.StackPanel): void {
    const checkbox = new GUI.Checkbox();
    checkbox.width = '20px';
    checkbox.height = '20px';
    checkbox.color = 'green';
    checkbox.isChecked = initial;
    checkbox.onIsCheckedChangedObservable.add(function(value) {
        onCheck(value);
    });

    const header = GUI.Control.AddHeader(
      checkbox,
      text,
      '180px',
      {
        isHorizontal: true,
        controlFirst: true
      }
    );
    header.height = '30px';
    header.color = 'white';
    header.outlineWidth = '4px';
    header.outlineColor = 'black';
    header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    panel.addControl(header);
  }

  public addHeader(text: string, panel: GUI.StackPanel) {
    const header = new GUI.TextBlock();
    header.text = text;
    header.height = '30px';
    header.color = 'white';
    header.outlineWidth = 4; // son 4px?
    header.outlineColor = 'black';
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

    panel.addControl(header);
  }

  public createGUI(scene: Scene) {
    let advancedTexture;
    if (advancedTexture) {
      advancedTexture.dispose();
    }
    advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

    const bottomPanel = new GUI.StackPanel();
    bottomPanel.height = '100px';
    bottomPanel.paddingBottom = '20px';
    bottomPanel.isVertical = true;
    bottomPanel.horizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    bottomPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    bottomPanel.fontSize = 16;
    advancedTexture.addControl(bottomPanel);
    
    this.bottomPanel = bottomPanel;

    const leftPanel = new GUI.StackPanel();
    leftPanel.width = '300px';
    leftPanel.isVertical = true;
    leftPanel.paddingLeft = '20px';
    leftPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    leftPanel.fontSize = 16;
    advancedTexture.addControl(leftPanel);
    this.leftPanel = leftPanel;
  }

  public createNewSystem(scene: Scene) {
    let particleSystem;
    this.useGPUVersion = false;
    const fogTexture = new Texture(
      'https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png',
      scene
    );

    if (particleSystem) {
      particleSystem.dispose();
    }

    if (this.useGPUVersion && GPUParticleSystem.IsSupported) {
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

    this.particleSystem = particleSystem;
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
