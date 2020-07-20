import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Documents } from '../models/document.model';
import { PubSubService } from '../services/pub-sub.service';

@Component({
  selector: 'app-pdfnavigator',
  templateUrl: './pdfnavigator.component.html',
  styleUrls: ['./pdfnavigator.component.scss']
})
export class PdfnavigatorComponent implements OnInit {
  @Input('documentList') documentList: Array<Documents>;
  @Output() documentListChange:EventEmitter<Array<Documents>> = new EventEmitter<Array<Documents>>();


  constructor(private readonly pubSubService: PubSubService) { }

  ngOnInit() {
  }

  displayFile(item: Documents) {
    this.documentList.forEach(element => {
      element.activeClass = '';
    });
    this.pubSubService.publishfileView(item);
    if (item != null)
      item.activeClass = 'pdf-active';
  }

  removeDocument() {
    if (this.documentList.length > 0) {
      this.documentList.forEach((element, index) => {
        if (element.activeClass === 'pdf-active') {
          this.documentList.splice(index, 1);
          this.documentListChange.emit(this.documentList);
          if (this.documentList.length > 0)
            this.displayFile(this.documentList[0]);
          else
            this.displayFile(null);
          return;
        }
      });
    }
  }

}
