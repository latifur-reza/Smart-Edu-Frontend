import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private _router : Router) { }
  /*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
       // 'Authorization': `Bearer ${this.authService.token}`
      }
    });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            //  this.authService.signin();
            }
          }
        }));
  }*/

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const cloneReq = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return next.handle(cloneReq).pipe(
        tap(
          (event: HttpEvent<any>) => { },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                //localStorage.removeItem('token');
                this._router.navigateByUrl('/login');
              }
            }
          }));
    } else {
      return next.handle(request.clone());
    }
  }

}
