import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private http: HttpClient) { }

    uploadFile(url: string, file: File): Observable<any> {
        let formData = new FormData();
        formData.append('uploadedFile', file);
        let params = new HttpParams();
        const options = {
            params: params,
        };
        return this.http.post(url + "?random=" + Math.random(), formData, options)
    }

    mergeFile(url: string, files: Array<string>): Observable<any> {
        let formData = new FormData();
        files.forEach(item=>{
            formData.append('files', item);
        });
        let params = new HttpParams();
        const options = {
            params: params,
        };
        return this.http.post(url + "?random=" + Math.random(), formData, options)
    }
}