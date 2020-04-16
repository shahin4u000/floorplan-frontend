import { PlotData } from './../plotting/plotting.component';
import { BokehService } from './../service/bokeh.service';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: "container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  fileToUpload: File = null;
  title = "floor-plan";
  fileName: string = "choose file";
  csvContent: any;
  x: number[] = [];
  y: number[] = [];
  scanData: any = [];
  response;
  constructor(private bokehService: BokehService) {

  }

  ngOnInit() {
  }

  upload(input: HTMLInputElement) {
    const files = input.files;

    const fileToRead = files[0];
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
    } else {
      this.fileName = " unknow file type. csv only"
    }
  }

  createFloorPlan() {
    this.bokehService.getBokeh({ "hi": "hello" }).subscribe((d)=>{
      this.response = d;
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
