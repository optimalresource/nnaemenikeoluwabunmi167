import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { UserRole } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  _roles: any = '';
  userForm;
  success;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public fb: FormBuilder, public userService: UserService, public router: Router, toasterService: ToasterService, private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.createForm();
    this.loadUserRoles();
  }

  popToast(_type, _title, _body) {
    var toast: Toast = {
      type: _type,
      title: _title,
      body: _body,
      showCloseButton: true
    };

    this.toasterService.pop(toast);
  }

  submit() {
    const data = {
      name: 'createNewUser',
      param: {
        username: this.userForm.controls['userName'].value,
        password: this.userForm.controls['password'].value,
        staff_id: this.userForm.controls['staffId'].value,
        roleId: this.userForm.controls['roleId'].value
      }
    }
    if (data) {
      this.userService.saveUser(data).subscribe(
        res => {
          console.log(res);
          this.success = res;
          if (this.success.reponse.code == 200) {
            this.popToast('success', 'Saved Successfully', this.success.reponse.responseData);
            this.createForm();
          }
          else this.popToast('warning', 'Already Exist!', this.success.reponse.responseData);
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Save', 'Oops! Something went wrong. Try again');
        }
      )
    }
  }

  loadUserRoles() {
    const data = {
      name: 'getAllUserRoles',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this.userService.getAllUserRoles(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res
        this._roles = temp.reponse.responseData;
      }, (err) => {
        console.log(err);
        this.popToast('error', 'Failed to User Roles', 'Oops! Something went wrong. Try again');
      });
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.userForm = this.fb.group({
      userName: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      staffId: this.fb.control('', Validators.required),
      roleId: this.fb.control('', Validators.required)
    });
  }
}
