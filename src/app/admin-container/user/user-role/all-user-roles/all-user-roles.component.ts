import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { UserRole } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-all-user-roles',
  templateUrl: './all-user-roles.component.html',
  styleUrls: ['./all-user-roles.component.css']
})
export class AllUserRolesComponent implements OnInit {
  _roles;
  deleted;
  p: number = 1;
  total: number = 10;
  _items: number = 10;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public userService: UserService, public route: ActivatedRoute, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
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

  nextPage(page: number) {
    this.p = page;
    this._roles = '';
    this._stopLoading = false;
    this.loadUserRoles();
  }

  loadUserRoles() {
    const data = {
      name: 'getAllUserRoles',
      param: {
        limit: this._items,
        page: this.p
      }
    }
    this.userService.getAllUserRoles(data).subscribe(
      res => {
        console.log(res);
        this._roles = res;
        if (this._roles.reponse.responseData.length) {
          this.total = this._roles.reponse.responseData[0].totalRows;
        }
        else console.log('No data yet in database', this._roles);
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to User Roles', 'Oops! Something went wrong. Try again');
      });
  }

  deleteRole(_id) {
    const data = {
      name: 'deleteUserRole',
      param: {
        id: _id
      }
    }
    if (confirm('Are you sure you want to delete this Role?')) {
      this.userService.deleteUserRole(data).subscribe(
        res => {
          this.deleted = res;
          if (this.deleted.reponse.code == 200) this.popToast('success', 'Deleted Successfully', this.deleted.reponse.responseData);
          this.loadUserRoles();
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Delete', 'Oops! Something went wrong. Try again');
        });
    } else {
      this.popToast('warning', 'Action Cancelled!', 'You chose not to delete the User Role');
    }

  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this._roles = '';
    this._stopLoading = false;
    this.loadUserRoles();
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
