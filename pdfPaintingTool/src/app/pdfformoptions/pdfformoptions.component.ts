import { Component, OnInit, Input } from '@angular/core';
import { Documents } from '../models/document.model';
import { UploadService } from '../services/upload-service.service';
import { DataService } from '../services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pdfformoptions',
  templateUrl: './pdfformoptions.component.html',
  styleUrls: ['./pdfformoptions.component.scss']
})
export class PdfformoptionsComponent implements OnInit {
  @Input('documentList') documentList: Array<Documents>;
  outputFileName = '';
  reportHeaders:Array<string> = new Array<string>();
  reportFooters:Array<string> = new Array<string>();
  reportStamps:Array<string> = new Array<string>();

  constructor(private readonly uploadService: UploadService,
    private readonly dataService:DataService<any>) { }

  ngOnInit() {
    this.dataService.get(environment.headers).subscribe(data=>{
      data.files.unshift('Select Header');
      this.reportHeaders = data.files;
    },err=>{
      console.log(err);
    });

    this.dataService.get(environment.footers).subscribe(data=>{
      data.files.unshift('Select Footer');
      this.reportFooters = data.files;
    },err=>{
      console.log(err);
    });

    this.dataService.get(environment.stamps).subscribe(data=>{
      data.files.unshift('Select Stamp');
      this.reportStamps = data.files;
    },err=>{
      console.log(err);
    });
  }

  mergePdf() {
    const files = this.documentList.map(x => x.pdfFilePath.split('/')[x.pdfFilePath.split('/').length - 1]);
    this.uploadService.mergeFile(environment.mergePdfFile, files).
      subscribe(data => {
        let fileName = `ResultFile${Math.random()}.pdf`;
        this.outputFileName = environment.baseUrl + '/files/import/' + data.fileName;
        const downloadLink = document.createElement("a");
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute('target', '_blank');
        downloadLink.setAttribute("href", this.outputFileName);
        downloadLink.setAttribute("download", fileName);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }, error => {
        console.log(error);
      });
  }

  printFile() {
    const files = this.documentList.map(x => x.pdfFilePath.split('/')[x.pdfFilePath.split('/').length - 1]);
    this.uploadService.mergeFile(environment.mergePdfFile, files).
      subscribe(data => {
        var doc = window.open(environment.baseUrl + '/files/import/' + data.fileName);
        doc.print();
      }, error => {
        console.log(error);
      });

  }
}
