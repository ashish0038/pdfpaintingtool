import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  constructor(private readonly httpClient: HttpClient) { }

  get(url: string): Observable<T> {
    return this.httpClient.get<T>(`${url}`);
  }

  post(url: string, item: T): Observable<T> {
    return this.httpClient.post<T>(`${url}`, item);
  }

  put(url: string, item: T): Observable<T> {
    return this.httpClient.put<T>(`${url}`, item);
  }

  delete(url: string): Observable<any> {
    return this.httpClient.delete(`${url}`);
  }
}
