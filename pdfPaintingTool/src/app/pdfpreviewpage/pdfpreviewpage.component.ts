import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfpreviewpage',
  templateUrl: './pdfpreviewpage.component.html',
  styleUrls: ['./pdfpreviewpage.component.scss']
})
export class PdfpreviewpageComponent implements OnInit {
  pdfSrc = "/assets/source-pdf/test.pdf";

  constructor() { }

  ngOnInit() {
  }

}
