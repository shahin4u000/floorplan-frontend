import { PlotData } from './../plotting/plotting.component';
import { BokehService } from './../service/bokeh.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: "container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit, AfterViewInit {
  @ViewChild("plottingContainer", { static: false }) plottingContainer: ElementRef;
  fileToUpload: File = null;
  title = "floor-plan";
  fileName: string = "choose file";
  csvContent: any;
  width: any;
  response;
  isLoading: boolean = false;
  constructor(private bokehService: BokehService) {



  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.width =
      this.plottingContainer.nativeElement.offsetWidth;
  }

  upload(input: HTMLInputElement) {
    const files = input.files[0];
    if (files.type === "text/csv") {
      this.fileName = files.name;
      this.csvContent = files;
    } else {
      this.fileName = " unknow file type. csv only"
    }

  }

  createFloorPlan() {
    if (!this.csvContent) return

    this.isLoading = true
    let request = new FormData();
    request.append("data", this.csvContent);
    request.append("width", this.width);
    console.log("ContainerComponent -> createFloorPlan -> this.width", this.width)
    this.bokehService.getBokeh(request).subscribe((d) => {
      this.response = d;
      this.isLoading = false;
    })

  }

  p2c(r, degree) {
    let theta = (degree * Math.PI) / 180;
    return {
      x: r * Math.cos(theta),
      y: r * Math.sin(theta)
    };
  }
}


/*
    // fileToRead.type === "text/csv"
    if (true) {

      this.fileName = fileToRead.name;

      const fileReader = new FileReader();

      fileReader.onload = event => {
        const result = fileReader.result;
        if (typeof result !== "string") {
          throw new Error("Unexpected result from FileReader");
        }
        this.csvContent = result.split("\n").map(data => {
          let [a, b] = data.split(",");
          this.scanData.push(this.p2c(parseFloat(b), parseFloat(a)));
        });
      };

      fileReader.readAsText(fileToRead, "UTF-8");
    }  */