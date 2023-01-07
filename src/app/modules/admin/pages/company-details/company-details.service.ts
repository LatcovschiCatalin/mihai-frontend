import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {
  constructor(private http: HttpClient) {
  }

  get(paramsObj?: any): Observable<any> {
    const params = new HttpParams({fromObject: paramsObj});
    return this.http.get(`/api/company-details`, {params});
  }

  getById(id): Observable<any> {
    return this.http.get(`/api/company-details/${id}`);
  }

  post(item, options?): Observable<any> {
    return this.http.post(
      '/api/company-details',
      item,
      options
    );
  }

  put(item, id, options?): Observable<any> {
    return this.http.put(
      `/api/company-details/${id}`,
      item,
      options
    );
  }

  deleteById(id): Observable<any> {
    return this.http.delete<any>(
      `/api/company-details/${id}`
    );
  }
}
