import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfformoptionsComponent } from './pdfformoptions.component';

describe('PdfformoptionsComponent', () => {
  let component: PdfformoptionsComponent;
  let fixture: ComponentFixture<PdfformoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfformoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfformoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
