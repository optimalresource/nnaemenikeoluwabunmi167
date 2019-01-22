import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent implements OnInit {
  shiftForm;
  success;
  private toasterService: ToasterService;
  dutyStatus = '';
  _patrolTeams;
  _supervisors
  _shiftTimeBegin;
  _shiftTimeEnd;
  _supervisorsOnDuty;
  _supervisorsOffDuty;

  mytime: Date = new Date();

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
    this.fetchPatrolteams();
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


  fetchSupervisorsOnDuty() {
    const data = {
      name: 'getPatrolSupervisorsOnDuty',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this._stopLoading = false;
    this.genericService.getAll(data).subscribe(
      res => {
        console.log('On Duty: ', res);
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
              this.popToast('warning', 'No Supervisor On Duty', temp.reponse.responseData);
            }
            else {
              this._supervisorsOnDuty = temp.reponse.responseData;
              this._stopLoading = true;
              this.createForm();
            }
          }
        } else { }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Supervisor On Duty', 'Oops! Something went wrong. Try again');
      });
  }

  fetchSupervisorsOffDuty() {
    const data = {
      name: 'getPatrolSupervisorsOffDuty',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this._stopLoading = false;
    this.genericService.getAll(data).subscribe(
      res => {
        console.log('Off Duty: ', res);
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
              this.popToast('warning', 'No Supervisor Off Duty', temp.reponse.responseData);
            }
            else {
              this._supervisorsOffDuty = temp.reponse.responseData;
              this._stopLoading = true;
              this.createForm();
            }
          }
        } else { }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Supervisor Off Duty', 'Oops! Something went wrong. Try again');
      });
  }
  fetchPatrolteams() {
    const data = {
      name: 'getAllPatrolTeams',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this._stopLoading = false;
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
            if (typeof temp.reponse.responseData == 'string') {
              this._stopLoading = true;
              this.popToast('warning', 'No Patrol Team Data', temp.reponse.responseData);
            }
            else {
              this._patrolTeams = temp.reponse.responseData;
              this._stopLoading = true;
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
      name: 'createShift',
      param: {
        teamId: this.shiftForm.controls['teamId'].value,
        supervisor: this.shiftForm.controls['supervisor'].value,
        shiftTimeBegin: this._shiftTimeBegin + ' ' + this.datePipe.transform(this.shiftForm.controls['startTime'].value, 'h:mm a'),
        shiftTimeEnd: this._shiftTimeEnd + ' ' + this.datePipe.transform(this.shiftForm.controls['endTime'].value, 'h:mm a'),
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

  setShiftTimeEnd(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this._shiftTimeBegin = tempDate
  }

  setShiftTimeBegin(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this._shiftTimeEnd = tempDate
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.shiftForm = this.fb.group({
      teamId: this.fb.control('', Validators.required),
      supervisor: this.fb.control('', Validators.required),
      shiftTimeBegin: this.fb.control(this.mytime, Validators.required),
      shiftTimeEnd: this.fb.control(this.mytime, Validators.required),
      startTime: this.fb.control(this.mytime, Validators.required),
      endTime: this.fb.control(this.mytime, Validators.required),
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
