import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-incident-status',
  templateUrl: './incident-status.component.html',
  styleUrls: ['./incident-status.component.css']
})
export class IncidentStatusComponent implements OnInit {
  _status;
  updateForm;
  incidentData;

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
    private datePipe: DatePipe,
    public auth: AuthService,
    public route: ActivatedRoute) {
    this.toasterService = toasterService
  }

  ngOnInit() {
    this.loadSingleIncident();
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

  goBack() {
    this.location.back();
  }

  checkIncidentStatusOnly(status) {
    if (status == 'Open') this._status = 'Open'
    if (status == 'resolved') this._status = 'Closed'
    if (status == 'reopened') this._status = 'Reopened'
  }

  changeIncidentStatus(status) {
    if (status == 'Open') {
      // Set Select Data Correctly
      this._status = 'Open'
    }

    if (status == 'resolved') {

      // Mark as Resolve
      const data = {
        name: 'markIncidentResolved',
        param: {
          id: 1
        }
      }
      if (data) {
        if (confirm('Are you sure you want to Close this Incident?')) {
          this.genericService.save(data).subscribe(
            res => {
              console.log(res);
              let temp: any = res;
              if (temp) {
                if (temp.error) {
                  if (temp.error.status == 302) {
                    this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
                    // auto logout if 302 (Expire token) response returned from api
                    this.auth.logout();
                  }
                } else {
                  if (temp.reponse.code == 200) {
                    // Set Select Data Correctly
                    this._status = 'Closed';
                    this.popToast('success', 'Incident Closed Successfully', temp.reponse.responseData);
                    this.createForm();
                  }
                }
              }
            }, (err) => {
              console.log(err);
              this.popToast('error', 'Failed to Close Incident', 'Oops! Something went wrong. Try again');
            }
          )
        } else this.popToast('warning', 'Action Cancelled!', 'You chose not to Close this Incident');
      }
    }
    if (status == 'reopened') {
      // Reopen Incidnt
      const data = {
        name: 'markIncidentReopened',
        param: {
          id: 1
        }
      }
      if (data) {
        if (confirm('Are you sure you want to Reopen this Incident?')) {
          this.genericService.save(data).subscribe(
            res => {
              console.log(res);
              let temp: any = res;
              if (temp) {
                if (temp.error) {
                  if (temp.error.status == 302) {
                    this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
                    // auto logout if 302 (Expire token) response returned from api
                    this.auth.logout();
                  }
                } else {
                  if (temp.reponse.code == 200) {
                    // Set Select Data Correctly
                    this._status = 'Reopened';

                    this.popToast('success', 'Incident Reopend Successfully', temp.reponse.responseData);
                    this.createForm();
                  }
                }
              }
            }, (err) => {
              console.log(err);
              this.popToast('error', 'Failed to Reopen Incident', 'Oops! Something went wrong. Try again');
            }
          )
        } else this.popToast('warning', 'Action Cancelled!', 'You chose not to Reopen this Incident');
      }
    }
  }

  loadSingleIncident() {
    const data = {
      name: 'viewIncident',
      param: {
        id: this.route.snapshot.params['id']
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
            if (temp.reponse.code == 404) {
              this._stopLoading = true;
              this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
            } else {
              this.incidentData = temp.reponse.responseData[0];
              console.log(this.incidentData.status)
              this.checkIncidentStatusOnly(this.incidentData.status);
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Incident Data', 'Oops! Something went wrong. Try again');
      });
  }


  submit() {
    const data = {
      name: 'addIncidentUpdate',
      param: {
        id: this.route.snapshot.params['id'],
        remark: this.updateForm.controls['remarks'].value
      }
    }
    console.log('Sending data ', data)
    if (data) {
      this.genericService.update(data).subscribe(
        res => {
          console.log(res);
          let temp: any = res;
          if (temp) {
            if (temp.error) {
              if (temp.error.status == 413) this.popToast('error', 'Bad Data, Did Not Add Update', temp.error.message);
            } else {
              if (temp.reponse.code == 200) {
                this.popToast('success', 'Updated Successfully', temp.reponse.responseData);
                this.loadSingleIncident();
              }
              else this.popToast('warning', 'Already Exist!', temp.reponse.responseData);
            }
          } else {
            this.popToast('warning', 'Did not update!', 'There was a slight issue adding this update');
          }
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Add Update', 'Oops! Something went wrong. Try again');
        }
      )
    }
  }


  createForm() {
    this.updateForm = this.fb.group({
      remarks: this.fb.control('', Validators.required),
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  expand() {
    this._toggleExpand = !this._toggleExpand;
    this._toggleExpandIcon = !this._toggleExpandIcon;
  }

  collapse() {
    this._toggleCollapse = !this._toggleCollapse;
    this._toggleCollapseIcon = !this._toggleCollapseIcon;
  }
}
