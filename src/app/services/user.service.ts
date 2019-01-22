import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { UserRole } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BASE_URL = 'https://moredrops.com/crms/mainbox/';
  BASE_URL = '/crms/mainbox/';

  constructor(private http: HttpClient) { }

  getAllUserRoles(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  getSingleUserRole(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  saveUserRole(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  updateUserRole(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  deleteUserRole(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  getAllUser(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  getSingleUser(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  saveUser(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  updateUser(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  deleteUser(data) {
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(map(res => { return res }),
      catchError(this.handleError)
      );
  }

  // HANDLE ALL ERRORS
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Server returned code ${error.status}, ` +
        `body was: ${error.error}`);
      if (error.status == 404) {
        return throwError('User Not Found!');
      }
      if (error.status == 409) {
        return throwError('You are already registered!');
      }
    }
    return throwError('Oops, unable to complete! please try again later.');
  }

}
