import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation, OnChanges } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "plotting",
  templateUrl: "./plotting.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./plotting.component.scss"]
})
export class PlottingComponent implements OnInit, OnChanges {
  @ViewChild("chart", { static: true })
  private chartContainer: ElementRef;
  @Input() data: Array<Object>;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor() { }

  ngOnInit() {
    this.data
    console.log("PlottingComponent -> ngOnInit -> this.data", this.data)
  }

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }
    this.floorPlan()
    //this.createChart();
  }

  onResize() {
    //this.createChart();
  }

  private floorPlan() {
    const element = this.chartContainer.nativeElement;
    const svg = d3
      .select(element)
      .append("svg")
      // Append a new SVG element to our container using the same width and height
      .attr("width",500)
      .attr("height",500)
      .style("color","red")

  }


}


