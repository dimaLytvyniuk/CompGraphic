import { Component, OnInit } from '@angular/core';
import * as vis from 'vis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  step = 0.25;
  axisMax = 10;
  axisMin = -10;

  constructor() {}

  ngOnInit() {
    // Create and populate a data table.
    let data = new vis.DataSet();

    let counter = 0;

    for (let x = this.axisMin; x < this.axisMax; x += this.step) {
        for (let y = this.axisMin; y < this.axisMax; y += this.step) {
            var z = Math.sin(x) * Math.cos(y);
            data.add({id:counter++,x:x,y:y,z:z,style:z});
        }
    }

    // specify options
    var options = {
        width:  '500px',
        height: '552px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
    };

    // Instantiate our graph object.
    var container = document.getElementById('visualization');
    var graph3d = new vis.Graph3d(container, data, options);
  }
}
