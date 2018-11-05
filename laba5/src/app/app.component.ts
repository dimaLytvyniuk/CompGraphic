import { Component, OnInit, trigger } from '@angular/core';
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

  draw = null;
  firstFigure = null;
  secondFigure = null;
  figuresSize = 50;
  
  firstR = 130;
  secondR = 200;
  firstCenter = 400;
  secondCenter = 300;
  firstRadianValue = 0;
  secondRadianValue = 0;
  firstStepRadian = 0.1;
  secondStepRadian = -0.1;
  firstA = 3;
  firstB = -2;

  firstX = this.firstR * (this.firstA + 1) + this.firstCenter;
  firstY = this.firstCenter;
  secondX = this.secondCenter;
  secondY = this.secondCenter + this.secondR;

  firstDirection = 1;
  secondDirection = -1;


  constructor() {}
  
  ngOnInit() {
    this.draw =  SVG('drawing').size(1200, 1200);
    this.initFigures();
    this.animation();
  }

  initFigures() {
    var coordinates = "";

    for (let t = -Math.PI; t < Math.PI; t+= 0.2)
    {
      var x = this.figuresSize * Math.round(10000 * Math.pow(Math.sin(t), 3)) / 10000 + 25;
      var y = this.figuresSize * Math.round(10000 * Math.pow(Math.cos(t), 3)) / 10000 + 25;
      
      coordinates += `${x},${y} `  
    }

    this.firstFigure = this.draw.polyline(coordinates);
    this.secondFigure = this.draw.polyline(coordinates);
    
    this.firstFigure.stroke({ color: '#f06', width: 2, linecap: 'round' });
    this.firstFigure.fill('#37CFC2');

    this.secondFigure.stroke({ color: '#EDDD16', width: 2, linecap: 'round' });
    this.secondFigure.fill('#D916ED');
  }

  update() {
    console.log(this.draw);
    var oldFirstX = this.firstX;
    var oldFirstY = this.firstY;
    var oldSecondX = this.secondX;
    var oldSecondY = this.secondY;

    if ((oldFirstX > oldSecondX && oldFirstX < (oldSecondX + this.figuresSize) && 
        (oldFirstY > oldSecondY && oldFirstY < (oldSecondY + this.figuresSize)))) {
          this.firstStepRadian *= -1;
          this.secondStepRadian *= -1;
    }

    this.firstRadianValue += this.firstStepRadian;
    this.secondRadianValue += this.secondStepRadian;
    
    this.firstX = this.firstR * (this.firstA + Math.cos(this.firstRadianValue)) * Math.cos(this.firstRadianValue) + this.firstCenter;
    this.firstY = this.firstR * (this.firstB + Math.cos(this.firstRadianValue)) * Math.sin(this.firstRadianValue) + this.firstCenter;

    this.secondX = this.secondR * Math.sin(this.secondRadianValue) + this.secondCenter;
    this.secondY = this.secondR * Math.cos(this.secondRadianValue) + this.secondCenter;

    var lineA = this.draw.line(oldFirstX + this.figuresSize, oldFirstY + this.figuresSize , this.firstX + this.figuresSize, this.firstY + this.figuresSize).attr({ fill: '#f06' });
    lineA.stroke({ color: '#37CFC2', width: 2, linecap: 'round' });

    var lineB = this.draw.line(oldSecondX + this.figuresSize, oldSecondY + this.figuresSize, this.secondX + this.figuresSize, this.secondY + this.figuresSize).attr({ fill: '#f06' });
    lineB.stroke({ color: '#D916ED', width: 2, linecap: 'round' });

    lineA.attr('opacity',0).animate(400,'<').attr('opacity',1);
    lineB.attr('opacity',0).animate(400,'<').attr('opacity',1);
    
    this.firstFigure.animate(300).move(this.firstX, this.firstY);
    this.secondFigure.animate(300).move(this.secondX, this.secondY);
  }

  animation() {
      setInterval(this.update.bind(this), 300);
  }

}