import { Component, OnInit } from '@angular/core';
import * as vis from 'vis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  step = 0.02;
  constA = 2;
  constB = 3;
  constR = 4;
  constN = 2;

  constructor() {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.drawFirst();
    this.drawSecond();
    this.drawThird();
  }

  drawFirst() {
    var points = this.createPoints(this.constA, this.constB, this.constR, this.step, this.constN);
    var series = [
      {
        "values": points,
        "marker":{
           "visible":false
        },
        "line-color":"#6666FF"
      }
    ];

    var myConfig = {
      "type":"line",
      "series": series
    };

    zingchart.render({ 
      id : 'myChart', 
      data : myConfig, 
      height: 800, 
      width: "80%"
    });
  }

  drawSecond() {
    var points = this.createPoints(this.constA, this.constB, this.constR, this.step, this.constN);
    var series = [
      {
        "values": points,
        "marker":{
           "visible":false
        },
        "line-color":"#6666FF"
      }
    ];
    
    var seriesWithOrnament = this.createPointsForOrnament(series, 2);

    var myConfig = {
      "type":"line",
      "series": seriesWithOrnament
    };

    zingchart.render({ 
      id : 'myChart2', 
      data : myConfig, 
      height: 800, 
      width: "80%"
    });
  }

  drawThird() {
    var points = this.createPoints(this.constA, this.constB, this.constR, this.step, this.constN);
    var series = [
      {
        "values": points,
        "marker":{
           "visible":false
        },
        "line-color":"#6666FF"
      }
    ];
    
    var seriesWithOrnament = this.createPointsForOrnament(series, 2);
    seriesWithOrnament = this.createPointsForOrnament(seriesWithOrnament, 3);
    seriesWithOrnament = this.createPointsForOrnament(seriesWithOrnament, 4);
    seriesWithOrnament = this.createPointsForOrnament(seriesWithOrnament, 5);
    seriesWithOrnament = this.createPointsForOrnament(seriesWithOrnament, 6);

    var myConfig = {
      "type":"line",
      "series": seriesWithOrnament
    };

    zingchart.render({ 
      id : 'myChart3', 
      data : myConfig, 
      height: 800, 
      width: "80%"
    });
  }

  createPoints(A: number, B: number, R: number, circleStep: number, N: number) {
    var points = [];

    for (let t = 0; t < N * Math.PI; t+= circleStep)
    {
      var x = A * R * Math.pow(Math.sin(t), 3);
      var y = B * R * Math.pow(Math.cos(t), 3);

      points.push([x, y]);
    }

    return points;
  }

  createPointsForOrnament(series: Array<object>, stepForCircle: number) {
    var graphPoints = series[0]["values"];
    var len = graphPoints.length;
    var quaterLen = Math.floor(len / 4);

    console.log(quaterLen);
    console.log();

    for (let t = 0; t < quaterLen; t += stepForCircle) {
      series.push(
        {
          "values": [
            [graphPoints[t][0], graphPoints[t][1]],
            [graphPoints[quaterLen + (quaterLen-t)][0], graphPoints[quaterLen + (quaterLen - t)][1]]
          ],
          "marker":{
            "visible":false
          },
          "line-color":"#6666FF"
        }
      );
    }

    for (let t = 2 * quaterLen; t < 3 * quaterLen; t += stepForCircle) {
      
      series.push(
        {
          "values": [
            [graphPoints[t][0], graphPoints[t][1]],
            [graphPoints[3 * quaterLen + (3 * quaterLen-t)][0], graphPoints[3 * quaterLen + (3 * quaterLen - t)][1]]
          ],
          "marker":{
            "visible":false
          },
          "line-color":"#6666FF"
        }
      );
    }

    for (let t = 1; t < quaterLen; t += stepForCircle) {
      series.push(
        {
          "values": [
            [graphPoints[t][0], graphPoints[t][1]],
            [graphPoints[3 * quaterLen + (quaterLen - t)][0], graphPoints[3 * quaterLen + (quaterLen - t)][1]]
          ],
          "marker":{
            "visible":false
          },
          "line-color":"#6666FF"
        }
      );
    }

    for (let t = quaterLen - 1; t < 2 * quaterLen; t += stepForCircle) {
      
      series.push(
        {
          "values": [
            [graphPoints[t][0], graphPoints[t][1]],
            [graphPoints[2 * quaterLen + (2* quaterLen - t)][0], graphPoints[2 * quaterLen + (2 * quaterLen - t)][1]]
          ],
          "marker":{
            "visible":false
          },
          "line-color":"#6666FF"
        }
      );
    }

    console.log(graphPoints);

    return series;
  }

}
