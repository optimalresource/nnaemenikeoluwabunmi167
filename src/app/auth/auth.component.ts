import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  _loginBtnMssg = 'Login'
  loginForm;
  loading;
  errMssg = '';
  BASE_URL = '/crms/mtn/';
  // BASE_URL = '/';

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  login() {
    this._loginBtnMssg = 'Requesting Access...'
    const userModel = {
      name: 'generateToken',
      param: {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value
      }
    };

    this.authService.authenticateUser(userModel).subscribe(
      res => {
        // Check if User Exists and If User is Admin
        if (res.reponse.responseData.token) {
          this.authService.storeUserData(res.reponse.responseData.token);
          // this.router.navigate(['/admin/dashboard']);
          this.errMssg = '';
          location.href = `${this.BASE_URL}admin/dashboard`;
        } else {
          this._loginBtnMssg = 'Login'
          this.errMssg = "You don't have the required authorization";
        }
      }, (err) => {
        console.log(err);
        this._loginBtnMssg = 'Login'
        this.errMssg = "Wrong username and password";
        this.router.navigate(['/login']);
      });
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }
}
