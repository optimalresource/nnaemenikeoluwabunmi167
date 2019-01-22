import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.css']
})
export class EditUserRoleComponent implements OnInit {
  userRoleForm;
  success;
  userData;
  roleName = '';
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    toasterService: ToasterService,
    private location: Location,
    public route: ActivatedRoute) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.createForm();
    this.getUserRoleDetails();
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
      name: 'updateUserRole',
      param: {
        id: this.route.snapshot.params['id'],
        name: this.userRoleForm.controls['userRoleName'].value
      }
    }
    if (data) {
      this.userService.updateUserRole(data).subscribe(
        res => {
          console.log(res);
          this.success = res;

          if (this.success) {
            if (this.success.reponse.code == 200) {
              this.popToast('success', 'Update Successfully', this.success.reponse.responseData);
              this.getUserRoleDetails();
              this.createForm();
            }
          } else {
            this.popToast('warning', 'Already up to date!', 'You did not change the initial name');
          }

        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Update', 'Oops! Something went wrong. Try again');
        }
      )
    }
  }

  goBack() {
    this.location.back();
  }

  getUserRoleDetails() {
    const data = {
      name: 'viewUserRole',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this.userService.getSingleUserRole(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.userData = temp.reponse.responseData;
        this.roleName = this.userData.name
        this.createForm();
      }, (err) => {
        console.log(err);
        this.popToast('error', 'Failed to Delete', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.userRoleForm = this.fb.group({
      userRoleName: this.fb.control(this.roleName, Validators.required)
    });
  }
  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this.userData = '';
    this._stopLoading = false;
    this.getUserRoleDetails();
  }

  expand() {
    this._toggleExpand = !this._toggleExpand;
    this._toggleExpandIcon = !this._toggleExpandIcon;
  }

  collapse() {
    this._toggleCollapse = !this._toggleCollapse;
    this._toggleCollapseIcon = !this._toggleCollapseIcon;
  }
}

