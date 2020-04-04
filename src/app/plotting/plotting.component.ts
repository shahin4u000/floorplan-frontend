import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-plotting',
  templateUrl: './plotting.component.html',
  styleUrls: ['./plotting.component.scss']
})
export class PlottingComponent implements OnInit {
  @ViewChild('chart', { static: true })
  private chartContainer: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
