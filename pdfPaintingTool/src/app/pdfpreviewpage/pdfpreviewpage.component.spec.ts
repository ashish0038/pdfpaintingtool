import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfpreviewpageComponent } from './pdfpreviewpage.component';

describe('PdfpreviewpageComponent', () => {
  let component: PdfpreviewpageComponent;
  let fixture: ComponentFixture<PdfpreviewpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfpreviewpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfpreviewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
