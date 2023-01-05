import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomFileUploadService {

  constructor(private http: HttpClient) {
  }

  public getFile(paramsObj?: any): Observable<any> {
    const params = new HttpParams({fromObject: paramsObj});
    return this.http.get(`/api/upload`, {params});
  }

  public deleteFile(paramsObj?: any): Observable<any> {
    const params = new HttpParams({fromObject: paramsObj});
    return this.http.delete(`/api/upload`, {params});
  }

  public uploadFile(file: File, src): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`/api/upload/${src}`, formData);
  }
}
