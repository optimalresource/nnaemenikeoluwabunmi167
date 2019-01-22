import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, tap, } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';
import { States, Relationship } from '../../../models/enums';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  staffSearchLoading;

  taskForm;
  success;
  LGAs = [];
  notFound = false;
  private toasterService: ToasterService;
  dutyStatus = '';
  _shifts;
  _shiftTimeBegin;
  _shiftTimeEnd;
  affectedStaff;


  mytime: Date = new Date();
  states = new States().types;
  rships = new Relationship().types;

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
    this.search(this.searchTerm$)
  }

  ngOnInit() {
    this.createForm();
    this.fetchShifts();
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

  checkStateSelected(id) {
    this.LGAs = this.states[(id - 1)].lga;
    console.log('Found LGAs: ', this.LGAs)
  }

  fetchShifts() {
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
              this.popToast('warning', 'No Supervisor Data', temp.reponse.responseData);
            }
            else {
              this._shifts = temp.reponse.responseData;
              this._stopLoading = true;
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

  // Updating Search Parameter
  search(terms: Observable<string>) {
    terms.pipe(debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(term => { this.loadStaffSearch(term) });
  }

  loadStaffSearch(term) {
    if (term != '') {
      const data = {
        name: 'searchStaff',
        param: {
          keyword: term,
          search_class: 'staffId',
          limit: 10,
          page: 1
        }
      }
      this.staffSearchLoading = true;

      this.genericService.getAll(data).subscribe(
        res => {
          console.log(res);
          let temp: any = res;
          if (temp) {
            if (temp.error) {
              if (temp.error.status == 302) {
                this.staffSearchLoading = false;
                this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
                // auto logout if 302 (Expire token) response returned from api
                this.auth.logout();
              }
            } else {
              if (temp.reponse.code == 404) {
                this.staffSearchLoading = false;
                this.notFound = true;
                this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
              } else {
                if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No data yet in database', temp.reponse.responseData); }
                else { this.affectedStaff = temp.reponse.responseData; this.notFound = false; }
                this.staffSearchLoading = false;
              }
            }
          }
        }, (err) => {
          console.log(err);
          this._stopLoading = true;
          this.notFound = false;
          this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
        });
    } else { }
  }


  submit() {
    this._stopLoading = false;

    const data = {
      name: 'createTask',
      param: {
        shiftId: this.taskForm.controls['shift'].value,
        staffConcerned: this.taskForm.controls['staffConcerned'].value,
        taskDescription: this.taskForm.controls['taskDescription'].value,
        locState: this.taskForm.controls['locState'].value,
        lga: this.taskForm.controls['lga'].value,
        address: this.taskForm.controls['address'].value,
        expectedBeginTime: this._shiftTimeBegin + ' ' + this.datePipe.transform(this.taskForm.controls['startTime'].value, 'h:mm a'),
        expectedEndTime: this._shiftTimeEnd + ' ' + this.datePipe.transform(this.taskForm.controls['endTime'].value, 'h:mm a'),
      }
    }
    console.log('form data: ', data);
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
              } if (temp.error.status == 414) {
                this._stopLoading = true;
                this.popToast('error', 'Bad data structure', temp.error.message);
              }
              this._stopLoading = true;
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

  setexpectedEndTime(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this._shiftTimeBegin = tempDate
  }

  setexpectedBeginTime(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this._shiftTimeEnd = tempDate
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.taskForm = this.fb.group({
      shift: this.fb.control('', Validators.required),
      staffConcerned: this.fb.control('', Validators.required),
      taskDescription: this.fb.control('', Validators.required),
      locState: this.fb.control('', Validators.required),
      lga: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required),
      expectedBeginTime: this.fb.control(this.mytime, Validators.required),
      expectedEndTime: this.fb.control(this.mytime, Validators.required),
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
