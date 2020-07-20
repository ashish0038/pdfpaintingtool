import { Component, OnInit } from '@angular/core';
import { PubSubService } from '../services/pub-sub.service';

@Component({
  selector: 'app-pdfpreviewpage',
  templateUrl: './pdfpreviewpage.component.html',
  styleUrls: ['./pdfpreviewpage.component.scss']
})
export class PdfpreviewpageComponent implements OnInit {
  pdfSrc = '';
  zoomParameter = 1;

  constructor(private readonly pubSubService: PubSubService) { }

  ngOnInit() {
    this.pubSubService.getfileViewSubject().subscribe(data => {
      if (data != null)
        this.pdfSrc = data.pdfFilePath
      else
        this.pdfSrc = '';
    });
  }

}
