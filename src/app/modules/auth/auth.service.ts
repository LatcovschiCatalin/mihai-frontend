import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {AUTH_LOCAL_TOKEN_KEY} from "./auth.constants";


@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  login(email: string, password: string) {
    // TODO use algorithm to encrypt upload
    return this.http.post<{ auth: boolean; token: string }>('/api/auth/login', {email, password}).subscribe(res => {
      localStorage.setItem(AUTH_LOCAL_TOKEN_KEY, res.token);
      this.router.navigateByUrl('/admin');
    })
  }


  logout() {
    localStorage.removeItem(AUTH_LOCAL_TOKEN_KEY);
    this.router.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem(AUTH_LOCAL_TOKEN_KEY);
  }

  isAuthenticated() {
    const jwtSession = localStorage.getItem(AUTH_LOCAL_TOKEN_KEY);

    if (jwtSession) {
      return of(this.getExpiration(jwtSession) > moment().unix());
    } else {
      return of(false);
    }
  }

  getExpiration(token: string): number {
    const parsedJwt = this.parseJwt(token);

    if (parsedJwt) {
      return parsedJwt.exp;
    }

    return moment().unix();
  }

  parseJwt(token: string) {
    let base64Url = token?.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64)?.split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
