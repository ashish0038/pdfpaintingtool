import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfnavigatorComponent } from './pdfnavigator.component';

describe('PdfnavigatorComponent', () => {
  let component: PdfnavigatorComponent;
  let fixture: ComponentFixture<PdfnavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfnavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfnavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
