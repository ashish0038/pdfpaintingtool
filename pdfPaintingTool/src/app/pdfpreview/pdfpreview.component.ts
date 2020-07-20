import { Component, OnInit } from '@angular/core';
import { Documents } from '../models/document.model';
import { PubSubService } from '../services/pub-sub.service';

@Component({
  selector: 'app-pdfpreview',
  templateUrl: './pdfpreview.component.html',
  styleUrls: ['./pdfpreview.component.scss']
})
export class PdfpreviewComponent implements OnInit {
  documentList: Array<Documents> = new Array<Documents>();

  constructor(private readonly pubSubService: PubSubService) { }

  ngOnInit() {
    this.pubSubService.getfileUploadSubject().subscribe(data => {
      this.documentList.forEach(element => {
        element.activeClass = '';
      });
      data.fileIndex = this.getLastIndexForFileCollection() + 1;
      data.activeClass = 'pdf-active';
      this.documentList.push(data);
    });
  }

  private getLastIndexForFileCollection() {
    if (this.documentList.length > 0)
      return this.documentList[this.documentList.length - 1].fileIndex
    else
      return 1;
  }
}
