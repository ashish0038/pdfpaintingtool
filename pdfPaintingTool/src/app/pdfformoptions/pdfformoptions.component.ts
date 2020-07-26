import { Component, OnInit, Input } from '@angular/core';
import { Documents } from '../models/document.model';
import { UploadService } from '../services/upload-service.service';
import { DataService } from '../services/data.service';
import { environment } from 'src/environments/environment';
import { PDFOptions } from '../models/pdf.options.model';
import { PubSubService } from '../services/pub-sub.service';

@Component({
  selector: 'app-pdfformoptions',
  templateUrl: './pdfformoptions.component.html',
  styleUrls: ['./pdfformoptions.component.scss']
})
export class PdfformoptionsComponent implements OnInit {
  @Input('documentList') documentList: Array<Documents>;
  outputFileName = '';
  reportHeaders: Array<string> = new Array<string>();
  reportFooters: Array<string> = new Array<string>();
  reportStamps: Array<string> = new Array<string>();
  disableOptions = true;

  constPageZoomSize = 'Select Page Resize';
  constPageHeader = 'Select Header';
  constPageFooter = 'Select Footer';
  constPageStamp = 'Select Stamp';
  constStampPosition = 'Select Stamp Position';

  pdfOptions: PDFOptions = new PDFOptions(this.constPageZoomSize, this.constPageHeader,
    this.constPageFooter, this.constPageStamp, this.constStampPosition);


  constructor(private readonly uploadService: UploadService,
    private readonly dataService: DataService<any>,
    private readonly pubSubService: PubSubService) { }

  ngOnInit() {
    this.pubSubService.getfileUploadSubject().subscribe(data => {
      if(!data.processed){
        this.disableOptions = false;
      }
    });

    this.dataService.get(environment.headers).subscribe(data => {
      data.files.unshift(this.constPageHeader);
      this.reportHeaders = data.files;
    }, err => {
      console.log(err);
    });

    this.dataService.get(environment.footers).subscribe(data => {
      data.files.unshift(this.constPageFooter);
      this.reportFooters = data.files;
    }, err => {
      console.log(err);
    });

    this.dataService.get(environment.stamps).subscribe(data => {
      data.files.unshift(this.constPageStamp);
      this.reportStamps = data.files;
    }, err => {
      console.log(err);
    });

    this.pubSubService.getmarkProcessedSubject().subscribe(data => {
      if (!!data) {
        this.documentList.forEach(x => {
          if (x.pdfFilePath === data.pdfFilePath) {
            x.processed = true;
          }
          this.pdfOptions.pageZoomSize = this.constPageZoomSize;
          this.pdfOptions.pageHeader = this.constPageHeader;
          this.pdfOptions.pageFooter = this.constPageFooter;
          this.pdfOptions.pageStamp = this.constPageStamp;
          this.pdfOptions.stampPosition = this.constStampPosition;
          this.disableOptions = true;
        });
      }
    }, err => {
      console.log(err);
    });
  }

  mergePdf() {
    const pdffiles = this.documentList.map(x => x.pdfFilePath.split('/')[x.pdfFilePath.split('/').length - 1]);
    const jpgfiles = this.documentList.map(x => x.imageFilePath.split('/')[x.pdfFilePath.split('/').length - 1]);
    this.uploadService.mergeFile(environment.mergePdfFile, jpgfiles).
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

  brodCastPdfOptions(newValue, refElement) {
    this.pdfOptions[refElement] = newValue;
    this.pubSubService.publishpdfOptions(this.pdfOptions);
  }

  savePdf() {
    this.pubSubService.publishsavePdf();
  }
}
