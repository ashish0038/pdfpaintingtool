import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PubSubService } from '../services/pub-sub.service';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import { UploadService } from '../services/upload-service.service';
import { Documents } from '../models/document.model';

@Component({
  selector: 'app-pdfpreviewpage',
  templateUrl: './pdfpreviewpage.component.html',
  styleUrls: ['./pdfpreviewpage.component.scss']
})
export class PdfpreviewpageComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfViewer', { static: false }) pdfViewer: ElementRef;
  document: Documents = new Documents();
  zoomParameter = 1;
  pdfHeaderSrc = '';
  pdfFooterSrc = '';
  pdfStampSrc = '';
  pdfStampPosition = '';
  pdfStampClass = '';
  imgClass = 'img-100per';
  imgRefreshParameter = (new Date()).getTime();

  headerActualHeight = 0;
  footerActualHeight = 0;
  stampActualHeight = 0;

  constructor(private readonly uploadService: UploadService,
    private readonly pubSubService: PubSubService) { }

  ngAfterViewInit() {
    this.pubSubService.getsavePdfSubject().subscribe(() => {
      if (this.document != null) {
        html2canvas(this.pdfViewer.nativeElement,
          { allowTaint: true, useCORS: true }).then((canvas) => {
            canvas.toBlob((blob) => {
              this.uploadService.saveUpdateFile(environment.saveImage,
                blob, this.document.imageFilePath.split('/')[this.document.imageFilePath.split('/').length - 1]).subscribe(
                  data => {
                    this.document.processed = true;
                    this.pubSubService.publishmarkProcessed(this.document);
                    this.resetParameters();
                    this.imgRefreshParameter = (new Date()).getTime();
                    alert("Image upload Sucessfully...")
                  },
                  (err) => {
                    console.log("Upload Error:", err);
                  }, () => {
                    console.log("Upload done");
                  }
                )
            }, 'image/jpg');
          });
      }
    });
  }

  ngOnInit() {
    this.pubSubService.getfileUploadSubject().subscribe(data => {
      if (data != null)
        this.document = data;
      else
        this.document = null;
    });
    this.pubSubService.getpdfOptionsSubject().subscribe(data => {
      this.resetParameters()
      if (data != null) {
        if (parseInt(data.pageZoomSize.replace('%', '')) > 0)
          this.zoomParameter = parseInt(data.pageZoomSize.replace('%', '')) / 100;

        if (data.pageHeader.indexOf('Select') === -1)
          this.pdfHeaderSrc = `${environment.baseUrl}/files/export/header/${data.pageHeader}`;

        if (data.pageFooter.indexOf('Select') === -1)
          this.pdfFooterSrc = `${environment.baseUrl}/files/export/footer/${data.pageFooter}`;

        if (data.pageStamp.indexOf('Select') === -1)
          this.pdfStampSrc = `${environment.baseUrl}/files/export/stamp/${data.pageStamp}`;

        if (data.stampPosition.indexOf('Select') === -1)
          this.pdfStampPosition = data.stampPosition;

        setTimeout(() => {
          this.encapsulateControl();
        }, 300);

      }

    });
  }

  private resetParameters() {
    this.zoomParameter = 1;
    this.pdfHeaderSrc = '';
    this.pdfFooterSrc = '';
    this.pdfStampSrc = '';
    this.pdfStampPosition = '';
    this.pdfStampClass = '';
    this.imgClass = 'img-100per';
  }

  private encapsulateControl() {
    var fragment = document.createDocumentFragment();
    var pdfContainer = document.getElementById("imageCapture");
    if (!!pdfContainer) {

      if (!!this.pdfHeaderSrc) {
        fragment.appendChild(document.getElementById('pdfHeader'));
        pdfContainer.appendChild(fragment);
      }

      if (!!this.pdfFooterSrc) {
        fragment.appendChild(document.getElementById('pdfFooter'));
        pdfContainer.appendChild(fragment);
      }

      if (!!this.pdfStampSrc) {
        fragment.appendChild(document.getElementById('pdfStamp'));
        pdfContainer.appendChild(fragment);
      }

      if (this.pdfStampPosition === "25%") {
        this.pdfStampClass = "page-25per";
      }
      else if (this.pdfStampPosition === "50%") {
        this.pdfStampClass = "page-50per";
      }
      else if (this.pdfStampPosition === "75%") {
        this.pdfStampClass = "page-75per";
      }
      else if (this.pdfStampPosition === "100%") {
        this.pdfStampClass = "page-100per";
      }

      if (this.zoomParameter === 1) {
        this.imgClass = "img-100per";
      }
      else if (this.zoomParameter === 0.25) {
        this.imgClass = "img-25per";
      }
      else if (this.zoomParameter === 0.50) {
        this.imgClass = "img-50per";
      }
      else if (this.zoomParameter === 0.75) {
        this.imgClass = "img-75per";
      }
    }
  }
}
