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
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskFormData
  success;
  LGAs = [];
  notFound = false;
  private toasterService: ToasterService;

  _shifts;
  _supervisors
  _shiftTimeBegin;
  _shiftTimeEnd;
  _supervisorsOnDuty;
  _supervisorsOffDuty;
  affectedStaff;

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
    public route: ActivatedRoute,
    private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getDetails();
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

  getDetails() {
    const data = {
      name: 'viewTask',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this._stopLoading = false;
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.taskFormData = temp.reponse.responseData;

        // this._patrolTeamID = this.taskFormData.teamId;
        // this._supervisorID = this.taskFormData.supervisorId;
        // this._shiftTimeBegin = 
        // this._shiftTimeEnd = 

        console.log(this.taskFormData);
        this._stopLoading = true;
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }


  goBack() {
    this.location.back();
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
