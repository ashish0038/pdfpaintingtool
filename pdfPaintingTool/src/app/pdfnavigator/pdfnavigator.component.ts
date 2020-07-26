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
  @Output() documentListChange: EventEmitter<Array<Documents>> = new EventEmitter<Array<Documents>>();
  imgRefreshParameter = (new Date()).getTime();
  activeClassName = 'pdf-active';


  constructor(private readonly pubSubService: PubSubService) { }

  ngOnInit() {
    this.pubSubService.getmarkProcessedSubject().subscribe(() => {
      this.imgRefreshParameter = (new Date()).getTime();
    });
  }

  displayFile(item: Documents) {
    this.documentList.forEach(element => {
      element.activeClass = '';
    });
    this.pubSubService.publishfileUpload(item);
    if (item != null)
      item.activeClass = this.activeClassName;
  }

  removeDocument() {
    if (this.documentList.length > 0) {
      this.documentList.forEach((element, index) => {
        if (element.activeClass === this.activeClassName) {
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

  changeLocationTab() {
    if (this.documentList.length > 0) {
      for (var i = 0; i <= this.documentList.length - 1; i++) {
        if (this.documentList[i].activeClass === this.activeClassName) {
          if (this.documentList.length - 1 >= (i + 1)) {
            var tempWidget = JSON.stringify(this.documentList[i]);
            var tempWidget1 = JSON.stringify(this.documentList[i + 1]);
            this.documentList[i + 1] = JSON.parse(tempWidget);
            this.documentList[i] = JSON.parse(tempWidget1);
            break;
          }
        }
      }
    }
  }

}
