import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-role-details',
  templateUrl: './user-role-details.component.html',
  styleUrls: ['./user-role-details.component.css']
})
export class UserRoleDetailsComponent implements OnInit {
  userData;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public userService: UserService, public route: ActivatedRoute, toasterService: ToasterService, private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
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
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
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
