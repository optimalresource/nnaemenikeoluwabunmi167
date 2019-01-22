import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';



@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css']
})
export class EditShiftComponent implements OnInit {
  shiftForm;
  success;
  shiftFormData;
  dutyStatus = '';
  _patrolTeams;
  _supervisors
  _shiftTimeBegin;
  _shiftTimeEnd;
  _patrolTeamID;
  _supervisorID;
  _supervisorsOnDuty;
  _supervisorsOffDuty;

  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public fb: FormBuilder,
    public genericService: GenericService,
    public router: Router,
    toasterService: ToasterService,
    private location: Location,
    public auth: AuthService,
    private datePipe: DatePipe,
    public route: ActivatedRoute) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.createForm();
    this.getDetails();
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

  submit() {
    this._stopLoading = false;

    const data = {
      name: 'updateShift',
      param: {
        id: this.route.snapshot.params['id'],
        teamId: this.shiftForm.controls['teamId'].value,
        supervisor: this.shiftForm.controls['supervisor'].value,
        shiftTimeBegin: this._shiftTimeBegin ? (this._shiftTimeBegin + ' ' + this.shiftForm.controls['startTime'].value) : (this.setGenericDateConverter(this.shiftForm.controls['expectedBeginTime'].value) + ' ' + this.shiftForm.controls['startTime'].value),
        shiftTimeEnd: this._shiftTimeEnd ? (this._shiftTimeEnd + ' ' + this.shiftForm.controls['endTime'].value) : (this.setGenericDateConverter(this.shiftForm.controls['expectedEndTime'].value) + ' ' + this.shiftForm.controls['endTime'].value),
      }
    }
    console.log(data);
    if (data) {
      this.genericService.update(data).subscribe(
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

  fetchPatrolteams() {
    const data = {
      name: 'getAllPatrolTeams',
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
            if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No Patrol Team Data', temp.reponse.responseData); }
            else {
              this._patrolTeams = temp.reponse.responseData;
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

  fetchSupervisorsOnDuty() {
    const data = {
      name: 'getPatrolSupervisorsOnDuty',
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
      name: 'getPatrolSupervisorsOffDuty',
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

  setGenericDateConverter(date) {
    let tempDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(tempDate);
    return tempDate;
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

  getDetails() {
    const data = {
      name: 'viewShift',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this._stopLoading = false;
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.shiftFormData = temp.reponse.responseData;

        this._patrolTeamID = this.shiftFormData.teamId;
        this._supervisorID = this.shiftFormData.supervisorId;
        this._shiftTimeBegin = this.shiftFormData.shiftTimeBegin;
        this._shiftTimeEnd = this.shiftFormData.shiftTimeEnd;

        console.log(this.shiftFormData);
        this._stopLoading = true;
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.shiftForm = this.fb.group({
      teamId: this.fb.control(this._patrolTeamID, Validators.required),
      supervisor: this.fb.control(this._supervisorID, Validators.required),
      shiftTimeBegin: this.fb.control(new Date(this._shiftTimeBegin), Validators.required),
      shiftTimeEnd: this.fb.control(new Date(this._shiftTimeEnd), Validators.required),
      startTime: this.fb.control(this.datePipe.transform(this._shiftTimeBegin, 'h:mm a'), Validators.required),
      endTime: this.fb.control(this.datePipe.transform(this._shiftTimeEnd, 'h:mm a'), Validators.required),
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = true;

  reload() {
    this.shiftFormData = '';
    this._stopLoading = false;
    this.getDetails();
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
