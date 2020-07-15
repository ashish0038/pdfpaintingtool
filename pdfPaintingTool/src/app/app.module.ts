import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PdfpreviewComponent } from './pdfpreview/pdfpreview.component';
import { PdfpreviewpageComponent } from './pdfpreviewpage/pdfpreviewpage.component';
import { PdfformoptionsComponent } from './pdfformoptions/pdfformoptions.component';
import { PdfnavigatorComponent } from './pdfnavigator/pdfnavigator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PdfpreviewComponent,
    PdfpreviewpageComponent,
    PdfformoptionsComponent,
    PdfnavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
