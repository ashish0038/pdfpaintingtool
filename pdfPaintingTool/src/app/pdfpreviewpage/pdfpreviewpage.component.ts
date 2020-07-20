import { Component, OnInit } from '@angular/core';
import { PubSubService } from '../services/pub-sub.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pdfpreviewpage',
  templateUrl: './pdfpreviewpage.component.html',
  styleUrls: ['./pdfpreviewpage.component.scss']
})
export class PdfpreviewpageComponent implements OnInit {
  pdfSrc = '';
  zoomParameter = 1;
  pdfHeaderSrc = '';
  pdfFooterSrc = '';
  pdfStampSrc = '';
  pdfStampPosition = '';
  pdfStampClass = '';

  constructor(private readonly pubSubService: PubSubService) { }

  ngOnInit() {
    this.pubSubService.getfileViewSubject().subscribe(data => {
      if (data != null)
        this.pdfSrc = data.pdfFilePath
      else
        this.pdfSrc = '';
    });
    this.pubSubService.getpdfOptionsSubject().subscribe(data => {
      this.resetParameters()
      if (data != null) {
        if (parseInt(data.pageZoomSize.replace('%', '')) > 0)
          this.zoomParameter = parseInt(data.pageZoomSize.replace('%', '')) / 100;

        if(data.pageHeader.indexOf('Select') === -1)
          this.pdfHeaderSrc = `${environment.baseUrl}/files/export/header/${data.pageHeader}`;
        
        if(data.pageFooter.indexOf('Select') === -1)
          this.pdfFooterSrc = `${environment.baseUrl}/files/export/footer/${data.pageFooter}`;
        
        if(data.pageStamp.indexOf('Select') === -1)
          this.pdfStampSrc = `${environment.baseUrl}/files/export/stamp/${data.pageStamp}`;
        
        if(data.stampPosition.indexOf('Select') === -1)
          this.pdfStampPosition = data.stampPosition;
       
          setTimeout(()=>{
            this.encapsulateControl();
          },300);
          
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
  }

  private encapsulateControl(){
    var fragment = document.createDocumentFragment();
    var pdfContainer = document.getElementsByClassName("ng2-pdf-viewer-container");
    if(!!pdfContainer){

      if(!!this.pdfHeaderSrc){
        fragment.appendChild(document.getElementById('pdfHeader'));
        pdfContainer[0].appendChild(fragment);
      }

      if(!!this.pdfFooterSrc){
        fragment.appendChild(document.getElementById('pdfFooter'));
        pdfContainer[0].appendChild(fragment);
      }

      if(!!this.pdfStampSrc){
        fragment.appendChild(document.getElementById('pdfStamp'));
        pdfContainer[0].appendChild(fragment);
      }

      if(this.pdfStampPosition === "25%"){
        this.pdfStampClass="page-25per";
      }
      else if(this.pdfStampPosition === "50%"){
        this.pdfStampClass="page-50per";
      }
      else if(this.pdfStampPosition === "75%"){
        this.pdfStampClass="page-75per";
      }
      else if(this.pdfStampPosition === "100%"){
        this.pdfStampClass="page-100per";
      }
    }
    
  }

}
