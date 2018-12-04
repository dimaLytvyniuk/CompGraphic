import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  
  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  meshX = null;
  meshY = null;
  meshXY = null;
  meshXYZ = null;

  constructor() {
    this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;

        const geometry = new THREE.CylinderBufferGeometry(150, 70, 150, 3)
        
        // ForX
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.meshX = new THREE.Mesh(geometry, material);
        this.meshX.position.set( -700, 0, 200 );
        // ForY
        this.meshY = new THREE.Mesh(geometry, material);
        this.meshY.position.set( -250, 0, 200 );

        // ForXY
        this.meshXY = new THREE.Mesh(geometry, material);
        this.meshXY.position.set( 100, 0, 200 );

        // ForXYZ
        this.meshXYZ = new THREE.Mesh(geometry, material);
        this.meshXYZ.position.set( 500, 0, 200 );

        this.scene.add(this.meshX);
        this.scene.add(this.meshY);
        this.scene.add(this.meshXY);
        this.scene.add(this.meshXYZ);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.meshX.rotation.x += 0.015;
    this.meshY.rotation.y += 0.01;
    this.meshXY.rotation.x += 0.015;
    this.meshXY.rotation.y += 0.01;
    this.meshXYZ.rotation.x += 0.015;
    this.meshXYZ.rotation.y += 0.01;
    this.meshXYZ.rotation.z += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
