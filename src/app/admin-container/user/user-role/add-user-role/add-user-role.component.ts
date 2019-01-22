import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { UserRole } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {
  userRoleForm;
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
      name: 'createUserRole',
      param: {
        name: this.userRoleForm.controls['userRoleName'].value
      }
    }
    if (data) {
      this.userService.saveUserRole(data).subscribe(
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

  goBack() {
    this.location.back();
  }

  createForm() {
    this.userRoleForm = this.fb.group({
      userRoleName: this.fb.control('', Validators.required)
    });
  }
}
