import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})



export class AppComponent {
  fileToUpload: File = null;
  title = 'floor-plan';
  csvContent;



  upload(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;

    if (files && files.length) {

      const fileToRead = files[0];

      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        const result = fileReader.result;
        if (typeof result !== "string") {
          throw new Error("Unexpected result from FileReader");
      }
      this.csvContent = result.split('\n').map((data) => {
        return data.split(',')
      })

      console.log(this.csvContent)
    };

    fileReader.readAsText(fileToRead, "UTF-8");
  }

}
}
