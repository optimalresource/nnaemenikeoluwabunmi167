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

@Component({
  selector: 'app-reasign-task',
  templateUrl: './reasign-task.component.html',
  styleUrls: ['./reasign-task.component.css']
})
export class ReasignTaskComponent implements OnInit {
  taskForm;
  taskFormData;
  success;
  LGAs = [];
  notFound = false;
  private toasterService: ToasterService;
  dutyStatus = '';
  _shifts;
  _supervisors
  _shiftTimeBegin;
  _shiftTimeEnd;
  _supervisorsOnDuty;
  _supervisorsOffDuty;
  affectedStaff;

  // states = new States().types;
  // rships = new Relationship().types;

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
    private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.createForm();
    this.fetchShifts();
    this.fetchSupervisorsOffDuty();
    this.fetchSupervisorsOnDuty();
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

  // checkStateSelected(id) {
  //   this.LGAs = this.states[(id - 1)].lga;
  //   console.log('Found LGAs: ', this.LGAs)
  // }


  fetchSupervisorsOnDuty() {
    const data = {
      name: 'getPatrolSupervisors',
      param: {
        state: "current"
      }
    }
    this.genericService.getAll(data).subscribe(
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
            if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No Supervisor Data', temp.reponse.responseData); }
            else {
              this._supervisorsOnDuty = temp.reponse.responseData;
              this.createForm();
            }
          }
        } else { }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        // this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  fetchSupervisorsOffDuty() {
    const data = {
      name: 'getPatrolSupervisors',
      param: {
        state: "past"
      }
    }
    this.genericService.getAll(data).subscribe(
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
            if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No Supervisor Data', temp.reponse.responseData); }
            else {
              this._supervisorsOffDuty = temp.reponse.responseData;
              this.createForm();
            }
          }
        } else { }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        // this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  fetchShifts() {
    const data = {
      name: 'getAllShifts',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this.genericService.getAll(data).subscribe(
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
            if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No Shift Data', temp.reponse.responseData); }
            else {
              this._shifts = temp.reponse.responseData;
              this.createForm();
            }
          }
        } else { }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Patrol Team Data', 'Oops! Something went wrong. Try again');
      });
  }

  submit() {
    this._stopLoading = false;

    const data = {
      name: 'reassignTask',
      param: {
        supervisor: this.taskForm.controls['supervisor'].value,
      }
    }
    console.log(data);
    if (data) {
      this.genericService.save(data).subscribe(
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
              this.success = temp;
              if (this.success.reponse.code == 200) {
                this.popToast('success', 'Saved Successfully', this.success.reponse.responseData);
                this.createForm();
                this._stopLoading = true;
              }
              else { this.popToast('warning', 'Already Exist!', this.success.reponse.responseData); this._stopLoading = true; }
            }
          }
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Save', 'Oops! Something went wrong. Try again');
          this._stopLoading = true;
        }
      )
    }
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.taskForm = this.fb.group({
      supervisor: this.fb.control('', Validators.required),
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
