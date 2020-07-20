import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Documents } from '../models/document.model';

@Injectable({
    providedIn: 'root'
})
export class PubSubService {
    private fileUploadSubject: Subject<Documents> = new Subject<Documents>();
    private fileViewSubject: Subject<Documents> = new Subject<Documents>();

    getfileUploadSubject(): Observable<Documents> {
        return this.fileUploadSubject.asObservable();
    }

    publishfileUpload(data: Documents) {
        this.fileUploadSubject.next(data);
    }

    getfileViewSubject(): Observable<Documents> {
        return this.fileViewSubject.asObservable();
    }

    publishfileView(data: Documents) {
        this.fileViewSubject.next(data);
    }
}