import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Documents } from '../models/document.model';
import { PDFOptions } from '../models/pdf.options.model';

@Injectable({
    providedIn: 'root'
})
export class PubSubService {
    private fileUploadSubject: Subject<Documents> = new Subject<Documents>();
    private fileViewSubject: Subject<Documents> = new Subject<Documents>();
    private pdfOptionsSubject: Subject<PDFOptions> = new Subject<PDFOptions>();
    private savePDFSubject: Subject<void> = new Subject<void>();
    private markProcessed: Subject<Documents> = new Subject<Documents>();

    getmarkProcessedSubject(): Observable<Documents> {
        return this.markProcessed.asObservable();
    }

    publishmarkProcessed(data:Documents) {
        this.markProcessed.next(data);
    }

    getfileUploadSubject(): Observable<Documents> {
        return this.fileUploadSubject.asObservable();
    }

    publishfileUpload(data: Documents) {
        this.fileUploadSubject.next(data);
    }

    getpdfOptionsSubject(): Observable<PDFOptions> {
        return this.pdfOptionsSubject.asObservable();
    }

    publishpdfOptions(data: PDFOptions) {
        this.pdfOptionsSubject.next(data);
    }

    getsavePdfSubject(): Observable<void> {
        return this.savePDFSubject.asObservable();
    }

    publishsavePdf() {
        this.savePDFSubject.next();
    }
}