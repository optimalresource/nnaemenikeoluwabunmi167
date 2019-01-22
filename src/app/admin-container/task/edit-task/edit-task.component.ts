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
import { States, Relationship } from '../../../models/enums';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  staffSearchLoading;

  taskForm;
  taskFormData
  success;
  LGAs = [];
  notFound = false;
  private toasterService: ToasterService;
  dutyStatus = '';
  _shifts;
  _supervisors
  _shiftTimeBegin
  _shiftTimeEnd
  affectedStaff;

  _shift: string;
  _staffConcerned: string;
  _taskDescription: string;
  _locState;
  _lga: string;
  _address: string;
  _expectedBeginTime: string;
  _expectedEndTime: string;

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
    public route: ActivatedRoute,
    private location: Location) {
    this.toasterService = toasterService;
    this.search(this.searchTerm$)
  }

  ngOnInit() {
    this.createForm();
    this.getDetails();
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
      name: 'getAllShifts',
      param: {
        state: '',
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

  convertStateToID(state) {
    if (this.states) {
      for (let i = 0; i < this.states.length; i++) {
        if (this.states[i].state == state) {
          console.log('Hi', this.states[i].id)
          return this.states[i].id;
        };
      }
    } else {
      return '';
    }
  }

  convertLGAToID(state, lga) {
    if (this.states) {
      for (let i = 0; i < this.states.length; i++) {
        if (this.states[i].state == state) {
          // Pulling respective LGAs from enum
          this.checkStateSelected(this.states[i].id);
          this.createForm();
          if (this.states[i].lga) {
            for (let j = 0; j < this.states[i].lga.length; j++) {
              if (this.states[i].lga[j] == lga) {
                return this.states[i].lga[j]
              }
            }
          }
        }
      }
    } else {
      // this.getDetails();
      return '';
    }
  }
  convertIdBackToState(id) {
    if (this.states) {
      for (let i = 0; i < this.states.length; i++) {
        if (this.states[i].id == id) {
          return this.states[i].state;
        }
      }
    } else { return ''; }
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
        // console.log('View Task', res.reponse.responseData.expectedBeginTime);
        let temp: any = res;
        this.taskFormData = temp.reponse.responseData;
        console.log('View Task', this.taskFormData.expectedBeginTime);

        this._shift = this.taskFormData.shiftId;
        this._staffConcerned = this.taskFormData.staffConcerned;
        this._taskDescription = this.taskFormData.taskDescription;
        this._locState = this.convertStateToID(this.taskFormData.locState);
        this._lga = this.convertLGAToID(this.taskFormData.locState, this.taskFormData.lga);
        this._address = this.taskFormData.address;
        this._expectedBeginTime = this.taskFormData.expectedBeginTime;
        this._expectedEndTime = this.taskFormData.expectedEndTime;

        console.log(this.taskFormData);
        this._stopLoading = true;
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  submit() {
    this._stopLoading = false;
    console.log(this._shiftTimeBegin ? this._shiftTimeBegin : this.setGenericDateConverter(this.taskForm.controls['expectedBeginTime'].value));
    console.log(this._shiftTimeEnd ? this._shiftTimeEnd : this.setGenericDateConverter(this.taskForm.controls['expectedEndTime'].value))
    const data = {
      name: 'updateTask',
      param: {
        id: this.route.snapshot.params['id'],
        shiftId: this.taskForm.controls['shift'].value,
        staffConcerned: this.taskForm.controls['staffConcerned'].value,
        taskDescription: this.taskForm.controls['taskDescription'].value,
        locState: this.convertIdBackToState(this.taskForm.controls['locState'].value),
        lga: this.taskForm.controls['lga'].value,
        address: this.taskForm.controls['address'].value,
        expectedBeginTime: this._shiftTimeBegin ? (this._shiftTimeBegin + ' ' + this.taskForm.controls['startTime'].value) : (this.setGenericDateConverter(this.taskForm.controls['expectedBeginTime'].value) + ' ' + this.taskForm.controls['startTime'].value),
        expectedEndTime: this._shiftTimeEnd ? (this._shiftTimeEnd + ' ' + this.taskForm.controls['endTime'].value) : (this.setGenericDateConverter(this.taskForm.controls['expectedEndTime'].value) + ' ' + this.taskForm.controls['endTime'].value),
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
              } this._stopLoading = true;
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
          this.popToast('error', 'Failed to Update', 'Oops! Something went wrong. Try again');
          this._stopLoading = true;
        }
      )
    }
  }

  setGenericDateConverter(date) {
    let tempDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(tempDate);
    return tempDate;
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
      shift: this.fb.control(this._shift, Validators.required),
      staffConcerned: this.fb.control(this._staffConcerned, Validators.required),
      taskDescription: this.fb.control(this._taskDescription, Validators.required),
      locState: this.fb.control(this._locState, Validators.required),
      lga: this.fb.control(this._lga, Validators.required),
      address: this.fb.control(this._address, Validators.required),
      expectedBeginTime: this.fb.control(new Date(this._expectedBeginTime), Validators.required),
      expectedEndTime: this.fb.control(new Date(this._expectedEndTime), Validators.required),
      startTime: this.fb.control(this.datePipe.transform(this._expectedBeginTime, 'h:mm a'), Validators.required),
      endTime: this.fb.control(this.datePipe.transform(this._expectedEndTime, 'h:mm a'), Validators.required),
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
