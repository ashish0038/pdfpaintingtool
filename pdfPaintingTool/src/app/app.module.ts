import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PdfpreviewComponent } from './pdfpreview/pdfpreview.component';
import { PdfpreviewpageComponent } from './pdfpreviewpage/pdfpreviewpage.component';
import { PdfformoptionsComponent } from './pdfformoptions/pdfformoptions.component';
import { PdfnavigatorComponent } from './pdfnavigator/pdfnavigator.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PdfpreviewComponent,
    PdfpreviewpageComponent,
    PdfformoptionsComponent,
    PdfnavigatorComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
