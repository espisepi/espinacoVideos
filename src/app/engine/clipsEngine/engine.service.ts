import { Injectable, ElementRef, NgZone } from '@angular/core';
import {
  Engine
} from 'babylonjs';
import { Scenario } from './scenario1/scenario';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private scenario: Scenario;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) {}

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.engine = new Engine(this.canvas, true);
    this.scenario = new Scenario(this.engine);
  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scenario.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }



}