import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload-service.service';
import { Documents } from '../models/document.model';
import { PubSubService } from '../services/pub-sub.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input('forSmallWindow') forSmallWindow : string;

  constructor(private readonly uploadService: UploadService,
    private readonly pubSubService: PubSubService) { }

  ngOnInit() {

  }

  fileChange(event) {
    let files: FileList = event.target.files;
    if (files.length === 0) {
      console.log("No file selected!");
      return false;
    }

    if (files.length > 1) {
      console.log("More than one file not allowed!");
      return false;
    }
    let file: File = files[0];
    this.uploadService.uploadFile(environment.pdfFileUpload, file).subscribe(
      data => {
        let fileData: Documents = new Documents();
          fileData.pdfFilePath = environment.baseUrl + '/files/import/' + data.fileName;
          fileData.imageFilePath = environment.baseUrl + '/files/import/' + data.imgfileName;
          fileData.imgHeight =  data.imgHeight;
          fileData.imgWidth =  data.imgWidth;
          this.pubSubService.publishfileUpload(fileData);
      },
      (err) => {
        console.log("Upload Error:", err);
      }, () => {
        console.log("Upload done");
      }
    )
  }
}
