import { Component, OnInit } from '@angular/core';
import * as SVG from 'svg.js';
//import * as SVGE from 'svg.intersections.js';

declare let require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  firstLength = 300;
  secondLength = 320;
  sinalfa = 0.665;
  stepOrnament = 10;
  stepMour1 = 7;
  stepMour2 = 13;

  constructor() {}
  
  ngOnInit() {
    this.drawFirst();
    this.drawSecond();
    this.drawThird();
  }

  drawFirst() {
    var h = Math.round(this.firstLength * this.sinalfa);
    var xA = this.firstLength * this.firstLength - h * h;
    xA = Math.round(Math.sqrt(xA)); 
    var xB = this.secondLength;

    console.log(h);
    console.log(xA);
    console.log(xB);

    var draw = SVG('drawing').size(500, 300);
    var lineA = draw.line(0, h, xA, 0).attr({ fill: '#f06' });
    lineA.stroke({ color: '#f06', width: 2, linecap: 'round' });

    var lineB = draw.line(0, h, xB, h).attr({ fill: '#f06' });
    lineB.stroke({ color: '#f06', width: 2, linecap: 'round' });

    var lineC = draw.line(xB, h, xA, 0).attr({ fill: '#f06' });
    lineC.stroke({ color: '#f06', width: 2, linecap: 'round' });
  }

  drawSecond() {
    var intersections = require('svg-intersections');

    var hNotRound = this.firstLength * this.sinalfa;
    var h = Math.round(hNotRound);
    var xA = this.firstLength * this.firstLength - h * h;
    xA = Math.round(Math.sqrt(xA)); 
    var xB = this.secondLength;
  
    var draw = SVG('drawing2').size(500, 300);
    var lineA = draw.line(0, h, xA, 0).attr({ fill: '#f06' });
    lineA.stroke({ color: '#f06', width: 2, linecap: 'round' });
  
    var lineB = draw.line(0, h, xB, h).attr({ fill: '#f06' });
    lineB.stroke({ color: '#f06', width: 2, linecap: 'round' });
  
    var lineC = draw.line(xB, h, xA, 0).attr({ fill: '#f06' });
    lineC.stroke({ color: '#f06', width: 2, linecap: 'round' });
    
    // parallel A
    var intersectLineC = intersections.shape("line", { x1: xB, y1: h, x2: xA, y2: 0 });
    var step = this.stepOrnament;

    while(step < this.secondLength)
    {
      var lineParallelC = intersections.shape("line", { x1: step, y1: h, x2: (xA + step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineC, lineParallelC);
  
      var lineD = draw.line(step, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineD.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }

    // parallel C
    var intersectLineA = intersections.shape("line", { x1: 0, y1: h, x2: xA, y2: 0 });
    step = this.stepOrnament;

    while(step < this.secondLength)
    {
      var startX = this.secondLength - step;
      var lineParallelA = intersections.shape("line", { x1: startX, y1: h, x2: (xA - step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineA, lineParallelA);
  
      var lineE = draw.line(startX, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineE.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }
  }

  drawThird() {
    var intersections = require('svg-intersections');

    var hNotRound = this.firstLength * this.sinalfa;
    var h = Math.round(hNotRound);
    var xA = this.firstLength * this.firstLength - h * h;
    xA = Math.round(Math.sqrt(xA)); 
    var xB = this.secondLength;
  
    var draw = SVG('drawing3').size(500, 300);
    var lineA = draw.line(0, h, xA, 0).attr({ fill: '#f06' });
    lineA.stroke({ color: '#f06', width: 2, linecap: 'round' });
  
    var lineB = draw.line(0, h, xB, h).attr({ fill: '#f06' });
    lineB.stroke({ color: '#f06', width: 2, linecap: 'round' });
  
    var lineC = draw.line(xB, h, xA, 0).attr({ fill: '#f06' });
    lineC.stroke({ color: '#f06', width: 2, linecap: 'round' });
    
    // parallel A
    var intersectLineC = intersections.shape("line", { x1: xB, y1: h, x2: xA, y2: 0 });
    var step = this.stepOrnament;

    while(step < this.secondLength)
    {
      var lineParallelC = intersections.shape("line", { x1: step, y1: h, x2: (xA + step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineC, lineParallelC);
  
      var lineD = draw.line(step, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineD.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }

    // parallel C
    var intersectLineA = intersections.shape("line", { x1: 0, y1: h, x2: xA, y2: 0 });
    step = this.stepOrnament;

    while(step < this.secondLength)
    {
      var startX = this.secondLength - step;
      var lineParallelA = intersections.shape("line", { x1: startX, y1: h, x2: (xA - step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineA, lineParallelA);
  
      var lineE = draw.line(startX, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineE.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }

    // parallel A
    var intersectLineC = intersections.shape("line", { x1: xB, y1: h, x2: xA, y2: 0 });
    step = this.stepMour1;

    while(step < this.secondLength)
    {
      var lineParallelC = intersections.shape("line", { x1: step, y1: h, x2: (xA + step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineC, lineParallelC);
  
      var lineD = draw.line(step, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineD.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }

    // parallel C
    var intersectLineA = intersections.shape("line", { x1: 0, y1: h, x2: xA, y2: 0 });
    step = this.stepMour1;

    while(step < this.secondLength)
    {
      var startX = this.secondLength - step;
      var lineParallelA = intersections.shape("line", { x1: startX, y1: h, x2: (xA - step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineA, lineParallelA);
  
      var lineE = draw.line(startX, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineE.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }

    // parallel A
    var intersectLineC = intersections.shape("line", { x1: xB, y1: h, x2: xA, y2: 0 });
    step = this.stepMour2;

    while(step < this.secondLength)
    {
      var lineParallelC = intersections.shape("line", { x1: step, y1: h, x2: (xA + step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineC, lineParallelC);
  
      var lineD = draw.line(step, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineD.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }

    // parallel C
    var intersectLineA = intersections.shape("line", { x1: 0, y1: h, x2: xA, y2: 0 });
    step = this.stepMour2;

    while(step < this.secondLength)
    {
      var startX = this.secondLength - step;
      var lineParallelA = intersections.shape("line", { x1: startX, y1: h, x2: (xA - step), y2: 0 });

      var intersectsPoints = intersections.intersect(intersectLineA, lineParallelA);
  
      var lineE = draw.line(startX, h, intersectsPoints.points[0].x, intersectsPoints.points[0].y).attr({ fill: '#f06' });
      lineE.stroke({ color: '#f06', width: 1, linecap: 'round' });

      step += this.stepOrnament;
    }
  }
}