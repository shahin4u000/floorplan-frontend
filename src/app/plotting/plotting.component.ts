import { Component, OnInit, ElementRef, ViewChild, Input } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-plotting",
  templateUrl: "./plotting.component.html",
  styleUrls: ["./plotting.component.scss"]
})
export class PlottingComponent implements OnInit {
  @ViewChild("chart", { static: true })
  private chartContainer: ElementRef;
  @Input() data: Array<Object>;

  constructor() {}

  ngOnInit() {
    this.data
    console.log("PlottingComponent -> ngOnInit -> this.data", this.data)
  }
}
