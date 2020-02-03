import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  fileToUpload: File = null;
  title = 'floor-plan';
  csvContent: any;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  upload(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;

    if (files && files.length) {

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        let fileContent = (event.target as FileReader).result;
        console.log(fileContent)
      }

      fileReader.readAsText(fileToRead, "UTF-8");
    }

  }
}
