import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EngineService } from './engine.service';
// import { LoadGltfModelService } from './loaders/load-gltf-model.service';
// import { CubeParticlesService } from './particles/cube-particles.service';
import { GizmoManipulatorService } from './interactions&Events/gizmo-manipulator.service';
import { Photo360Service } from './textures/photo360.service';
@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: Photo360Service) { }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }
}
