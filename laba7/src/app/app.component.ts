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
  groupX = null;
  groupY = null;
  groupXY = null;
  groupXYZ = null;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    var vertices = [
      0, 1, 0,  1, 0, 0, 	- 1, 0, 0,
      0, 0, 1,  0, - 1, 0,
    ];
  
    var indices = [
      0, 1, 2,  0, 1, 3,  0, 2, 3,
      1, 2, 4,  1, 3, 4,  2, 3, 4
    ];

    const geometry = new THREE.PolyhedronBufferGeometry( vertices, indices, 150);

    // ForX
    this.groupX = new THREE.Group();
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00,side:THREE.DoubleSide});
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true});
    const meshX = new THREE.Mesh(geometry, material);
    const lineX = new THREE.LineSegments(geometry, lineMaterial);
    this.groupX.add(meshX);
    this.groupX.add(lineX);


    this.groupX.position.set( -700, 0, 200 );

    // ForY
    this.groupY = new THREE.Group();
    const meshY = new THREE.Mesh(geometry, material);
    const lineY = new THREE.LineSegments(geometry, lineMaterial);
    this.groupY.add(meshY);
    this.groupY.add(lineY);
    this.groupY.position.set( -400, 0, -100 );

    // ForXY
    this.groupXY = new THREE.Group();
    const meshXY = new THREE.Mesh(geometry, material);
    const lineXY = new THREE.LineSegments(geometry, lineMaterial);
    this.groupXY.add(meshXY);
    this.groupXY.add(lineXY);
    this.groupXY.position.set( 50, 0, 100 );

    // // ForXYZ
    this.groupXYZ = new THREE.Group();
    const meshXYZ = new THREE.Mesh(geometry, material);
    const lineXYZ = new THREE.LineSegments(geometry, lineMaterial);
    this.groupXYZ.add(meshXYZ);
    this.groupXYZ.add(lineXYZ);
    this.groupXYZ.position.set( 600, 0, -100 );

    this.scene.add(this.groupX);
    this.scene.add(this.groupY);
    this.scene.add(this.groupXY);
    this.scene.add(this.groupXYZ);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.groupX.rotation.x += 0.015;
    this.groupY.rotation.y += 0.01;
    this.groupXY.rotation.x += 0.015;
    this.groupXY.rotation.y += 0.02;
    this.groupXYZ.rotation.x += 0.015;
    this.groupXYZ.rotation.y += 0.01;
    this.groupXYZ.rotation.z += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
