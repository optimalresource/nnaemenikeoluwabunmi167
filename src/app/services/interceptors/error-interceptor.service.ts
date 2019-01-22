import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    return next.handle(request).pipe(catchError(err => {
      if (err.error.status == 401) {
        // auto logout if 401 response returned from api
        this.auth.logout();
        location.reload(true);
      }
      if (err.error.status == 302) {
        // auto logout if 302 (Expire token) response returned from api
        this.auth.logout();
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }
    ))

  }
}