import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, tap, } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';
import { VisualizeDataService } from 'src/app/services/visualize-data.service';

@Component({
  selector: 'app-staff-incident-history',
  templateUrl: './staff-incident-history.component.html',
  styleUrls: ['./staff-incident-history.component.css']
})
export class StaffIncidentHistoryComponent implements OnInit {

  notFound = false;
  p: number = 1;
  total: number = 10;
  _items: number = 10;

  taskForm;
  success;
  LGAs = [];
  staffData;
  staffEscortData;
  staffIncidentData;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public fb: FormBuilder,
    public genericService: GenericService,
    public router: Router,
    toasterService: ToasterService,
    public auth: AuthService,
    private datePipe: DatePipe,
    public vs: VisualizeDataService,
    public route: ActivatedRoute,
    private location: Location) {
    this.toasterService = toasterService;
    this.vs.currentStaffInfo.subscribe(data => this.staffData = data);
  }

  ngOnInit() {
    if (this.staffData) {
      console.log("HHHHHHHH", this.staffData);
      this.staffEscortList();
      this.staffIncidentList();
    } else {
      // Navigating away.
    }
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
    this.staffEscortData = '';
    this.staffIncidentData = '';
    this._stopLoading = false;
    this.staffEscortList();
    this.staffIncidentList();
  }

  adjustTableRows(adjustedValue) {
    this._items = adjustedValue;
    this.staffEscortData = '';
    this.staffIncidentData = '';
    this.staffEscortList();
    this.staffIncidentList();
  }

  staffEscortList() {
    const data = {
      name: 'viewStaffEscorts',
      param: {
        limit: 70000,
        page: 1,
        staffId: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        if (temp) {
          if (temp.error) {
            if (temp.error.status == 302) {
              this._stopLoading = true;
              this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
              // auto logout if 302 (Expire token) response returned from api
              this.auth.logout();
            }
          } else {
            if (typeof temp.reponse.responseData == 'string') {
              this._stopLoading = true;
              // this.popToast('warning', 'No Supervisor On Duty', temp.reponse.responseData);
            }
            else {
              this.staffEscortData = temp.reponse.responseData;
              this._stopLoading = true;
            }
          }
        } else { }
        console.log(this.staffEscortData)
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Patrol Member Data', 'Oops! Something went wrong. Try again');
      });
  }

  staffIncidentList() {
    const data = {
      name: 'viewStaffIncidents',
      param: {
        limit: 70000,
        page: 1,
        staffId: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        if (temp) {
          if (temp.error) {
            if (temp.error.status == 302) {
              this._stopLoading = true;
              this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
              // auto logout if 302 (Expire token) response returned from api
              this.auth.logout();
            }
          } else {
            if (typeof temp.reponse.responseData == 'string') {
              this._stopLoading = true;
              // this.popToast('warning', 'No Supervisor On Duty', temp.reponse.responseData);
            }
            else {
              this.staffEscortData = temp.reponse.responseData;
              this._stopLoading = true;
            }
          }
        } else { }
        console.log(this.staffEscortData)
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Patrol Member Data', 'Oops! Something went wrong. Try again');
      });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = true;

  reload() {
    this._stopLoading = false;
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
