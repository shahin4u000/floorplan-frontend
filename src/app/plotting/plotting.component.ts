import { Component, OnInit, ElementRef, Input, ViewEncapsulation, OnChanges, ViewChildren, ViewChild, AfterViewInit } from "@angular/core";
import * as d3 from "d3";
import { Observable } from 'rxjs';

export interface PlotData {
  container: string;
  script: string;
}


@Component({
  selector: "plotting",
  templateUrl: "./plotting.component.html",
  styleUrls: ["./plotting.component.scss"]
})
export class PlottingComponent implements OnInit, AfterViewInit {
  is3D = false;
  private bokehDocumentId: string = null;
  private bokehDocumentObject: any = null;
  private findBokehDocumentInterval: any = null;
  private _plotData: any;
  @ViewChild('node', { static: true }) node: ElementRef<HTMLDivElement>
  @Input()
  set PlotData(plotData) {
    this._plotData = plotData;

    this.update(this._plotData);
  }

  constructor() { }

  ngAfterViewInit() {
    console.log("hi")
  }


  ngOnInit() {

  }
  update(plotData: PlotData) {
    if (!plotData) {
      this.clearPlot();
      return;
    }
    this.is3D = false;
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    // scriptElement.innerHTML = this.getContentOfScriptTag(plotData.script);

    const cleanedInnerHTML = plotData.script.replace("<script type=\"text/javascript\">", "").replace("</script>", "")
    scriptElement.innerHTML = this.getContentOfScriptTag(cleanedInnerHTML);

    const element = this.node.nativeElement;
    console.log("PlottingComponent -> update -> element", element)
    element.innerHTML = plotData.container;
    const bokehDiv = element.getElementsByClassName('bk-root').item(0);
    this.bokehDocumentId = bokehDiv.getAttribute('data-root-id');

    element.appendChild(scriptElement);
    clearInterval(this.findBokehDocumentInterval);
    this.bokehDocumentObject = null;
    this.findBokehDocumentInterval = setInterval(this.findBokehDocumentObject, 100);

  }

  private findBokehDocumentObject = () => {
    let doc = null;
    const bokeh = window['Bokeh'];
    bokeh.documents.forEach((document: any) => {
      if (!document['_roots']) {
        return false;
      }
      const roots = document['_roots'];

      if (!roots[0]) {
        return false;
      }
      const row = roots[0];

      if (row['attributes']['id'] !== this.bokehDocumentId) {
        return false;
      }

      doc = document;
      return true;
    });
    if (!doc) {
      return;
    }

    this.bokehDocumentObject = doc;
    //this.documentInitialized.emit(true);
    clearInterval(this.findBokehDocumentInterval);
    //this.findRangeModels();
    //this.detectIs3D();
    //this.findAjaxDataSources();
  };
  private clearPlot() {
    const element = this.node.nativeElement;
    element.innerHTML = '';
  }
  private getContentOfScriptTag(script: string) {
    let result = script.replace('<script type="text/javascript">', '');
    result = result.replace('</script>', '');
    return result;
  }
}


