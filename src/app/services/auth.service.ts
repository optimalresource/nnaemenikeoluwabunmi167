import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;

  BASE_URL = 'https://moredrops.com/crms/mainbox/';

  constructor(private http: HttpClient, public router: Router) { }

  // POST: REGISTER USER
  registerUser(user): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, user)
      .pipe(
      map(res => { return res }),
      catchError(this.handleError)
      );
  }

  // POST: USER LOGIN
  authenticateUser(user): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, user)
      .pipe(
      map(res => {
        console.log('Successful: ', res)
        return res
      }),
      catchError(this.handleError)
      );
  }

  // GET: USER PROFILE
  getProfile() {
    return this.http.get(`${this.BASE_URL}`)
      .pipe(
      map(res => { return res }),
      catchError(this.handleError)
      );
  }

  // SET VALUES IN BROWSER LOCAL STORAGE
  storeUserData(token) {
    localStorage.setItem('token_id', token);
    this.authToken = token;
  }

  // GET VALUES FROM BROWSER LOCAL STORAGE
  loadToken() {
    const token = localStorage.getItem('token_id');
    this.authToken = token;
    return this.authToken;
  }

  loggedIn() {
    // return tokenNotExpired();
  }

  // CLEAR  BROWSER LOCAL STORAGE
  logout() {

    this.authToken = null;
    localStorage.clear();
    this.router.navigate(['/login']);

    const data = {
      name: 'logout',
      param: {}
    };
    return this.http.post(`${this.BASE_URL}`, data)
      .pipe(
      map(res => {
        return res
      }),
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
