import { Camera, Scene, Animation } from 'babylonjs';
import { Scenario } from './scenario';

export class AnimationUtility {
  public frameRate: number;
  public scenario: Scenario;

  public constructor(scenario: Scenario) {
    this.frameRate = 20;
    this.scenario = scenario;
    this.createAnimation();
  }

  public createAnimation(): void {
    this.cameraToSweepRound();
  }

  public cameraToSweepRound(): void {
    const rotate = new Animation(
      'rotate',
      'rotation.y',
      this.frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const rotate_keys = [];

    rotate_keys.push({
        frame: 0,
        value: 0
    });

    rotate_keys.push({
        frame: 9 * this.frameRate,
        value: 0
    });

    rotate_keys.push({
        frame: 14 * this.frameRate,
        value: Math. PI
    });

    rotate.setKeys(rotate_keys);

    this.scenario.scene.beginDirectAnimation(this.scenario.scene.getMeshByName('box1'), [rotate], 0, 25 * this.frameRate, false);
  }


}