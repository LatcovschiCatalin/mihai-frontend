import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class SnackBarInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res: any) => {
        if (res?.status && request?.method !== 'GET') {
          this._snackBar.open('Success!', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'success'
          })
        }
      }),
      catchError((err: any) => {
        let message = err?.error?.code === 429 ? 'Too many requests. Try later!' : err?.error?.message;
        let code = err?.error?.code !== 429 ? err?.error?.code : '';
        this._snackBar.open(message, code, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'error'
        })

        return of(err);
      })
    );
  }
}
