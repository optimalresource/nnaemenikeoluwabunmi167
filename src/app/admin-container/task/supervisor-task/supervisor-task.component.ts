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
  selector: 'app-supervisor-task',
  templateUrl: './supervisor-task.component.html',
  styleUrls: ['./supervisor-task.component.css']
})
export class SupervisorTaskComponent implements OnInit {
  notFound = false;
  p: number = 1;
  total: number = 10;
  _items: number = 10;

  taskForm;
  success;
  LGAs = [];
  supervisorData;
  private toasterService: ToasterService;
  dutyStatus = '';

  _tasksIncident;
  _taskEscort;
  _shifts;
  _supervisors;

  _id;
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
    public route: ActivatedRoute,
    private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.createForm();
    // this.fetchSupervisorsOffDuty();
    // this.fetchSupervisorsOnDuty();
    this.fetchAllSupervisors();
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
    this._tasksIncident = '';
    this._stopLoading = false;
    this.loadSupervisorIncidentTasks();
  }

  adjustTableRows(adjustedValue) {
    this._items = adjustedValue;
    this._tasksIncident = '';
    this.loadSupervisorIncidentTasks();
  }

  changeSupervisor(e) {
    console.log(e.target.value)
    let id = e.target.value
    if (id) {
      this._id = id;
      this.getSingleSupervisor();
      this.loadSupervisorIncidentTasks();
      this.loadSupervisorEscortTasks();
    } else {
      this.popToast('warning', 'No ID Found!', 'Oops! Can not get Tasks without an ID');
    }
  }

  // Alternative way of loading supervisor
  setCurrentSupervisor() {
    if (this._supervisors && this._id) {
      for (let i = 0; i < this._supervisors.legnth; i++)
        if (this._supervisors[i].id == this._id) {
          this.supervisorData = this._supervisors[i]
        }
      console.log('supervisorData ', this.supervisorData)
    }
  }

  getSingleSupervisor() {
    const data = {
      name: 'viewPatrolMember',
      param: {
        id: this._id
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
              this.supervisorData = temp.reponse.responseData;
              this._stopLoading = true;
            }
          }
        } else { }
        console.log(this.supervisorData)
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Patrol Member Data', 'Oops! Something went wrong. Try again');
      });
  }

  // fetchSupervisorsOnDuty() {
  //   const data = {
  //     name: 'getPatrolSupervisorsOnDuty',
  //     param: {
  //       limit: 70000,
  //       page: 1
  //     }
  //   }
  //   this._stopLoading = false;
  //   this.genericService.getAll(data).subscribe(
  //     res => {
  //       console.log('On Duty: ', res);
  //       let temp: any = res;
  //       if (temp) {
  //         if (temp.error) {
  //           if (temp.error.status == 302) {
  //             this._stopLoading = true;
  //             this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
  //             // auto logout if 302 (Expire token) response returned from api
  //             this.auth.logout();
  //           }
  //         } else {
  //           if (typeof temp.reponse.responseData == 'string') {
  //             this._stopLoading = true;
  //             this.popToast('warning', 'No Supervisor On Duty', temp.reponse.responseData);
  //           }
  //           else {
  //             this._supervisorsOnDuty = temp.reponse.responseData;
  //             this._stopLoading = true;
  //             this.createForm();
  //           }
  //         }
  //       } else { }
  //     }, (err) => {
  //       console.log(err);
  //       this._stopLoading = true;
  //       this.popToast('error', 'Failed to Retrieve Supervisor On Duty', 'Oops! Something went wrong. Try again');
  //     });
  // }

  // fetchSupervisorsOffDuty() {
  //   const data = {
  //     name: 'getPatrolSupervisorsOffDuty',
  //     param: {
  //       limit: 70000,
  //       page: 1
  //     }
  //   }
  //   this._stopLoading = false;
  //   this.genericService.getAll(data).subscribe(
  //     res => {
  //       console.log('Off Duty: ', res);
  //       let temp: any = res;
  //       if (temp) {
  //         if (temp.error) {
  //           if (temp.error.status == 302) {
  //             this._stopLoading = true;
  //             this.popToast('error', 'Token Expired', temp.error.message + '. Log in again');
  //             // auto logout if 302 (Expire token) response returned from api
  //             this.auth.logout();
  //           }
  //         } else {
  //           if (typeof temp.reponse.responseData == 'string') {
  //             this._stopLoading = true;
  //             this.popToast('warning', 'No Supervisor Off Duty', temp.reponse.responseData);
  //           }
  //           else {
  //             this._supervisorsOffDuty = temp.reponse.responseData;
  //             this._stopLoading = true;
  //             this.createForm();
  //           }
  //         }
  //       } else { }
  //     }, (err) => {
  //       console.log(err);
  //       this._stopLoading = true;
  //       this.popToast('error', 'Failed to Retrieve Supervisor Off Duty', 'Oops! Something went wrong. Try again');
  //     });
  // }

  fetchAllSupervisors() {
    const data = {
      name: 'getAllPatrolSupervisorStats',
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
              this._supervisors = temp.reponse.responseData;
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

  goBack() {
    this.location.back();
  }

  loadSupervisorIncidentTasks() {
    if (this._id) {
      const data = {
        name: 'viewSupervisorIncidents',
        param: {
          id: this._id,
          limit: this._items,
          page: this.p
        }
      }
      this._tasksIncident = '';
      this._stopLoading = false;
      console.log('Data to be posted: ', data)

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
              if (temp.reponse.code == 404) {
                this._stopLoading = true;
                this.notFound = true;
                this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
              } else {
                if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No data yet in database', temp.reponse.responseData); this._stopLoading = true; }
                else {
                  // if (temp.reponse.responseData.legnth) {
                  this._tasksIncident = temp;
                  console.log('task array', this._tasksIncident)
                  this.notFound = false;
                  this.total = this._tasksIncident.reponse.responseData[0].totalRows;
                  this._stopLoading = true;
                  // }
                }
                this._stopLoading = true;
              }
            }
          }
        }, (err) => {
          console.log(err);
          this._stopLoading = true;
          this.notFound = false;
          this.popToast('error', 'Failed to Retrieve Incident Tasks', 'Oops! Something went wrong. Try again');
        });
    }
  }

  loadSupervisorEscortTasks() {
    if (this._id) {
      const data = {
        name: 'viewSupervisorEscorts',
        param: {
          id: this._id,
          limit: this._items,
          page: this.p
        }
      }
      this._taskEscort = '';
      this._stopLoading = false;
      console.log('Data to be posted: ', data)

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
              if (temp.reponse.code == 404) {
                this._stopLoading = true;
                this.notFound = true;
                this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
              } else {
                if (typeof temp.reponse.responseData == 'string') { this.popToast('warning', 'No data yet in database', temp.reponse.responseData); this._stopLoading = true; }
                else {
                  this._taskEscort = temp;
                  console.log('task array', this._taskEscort)
                  this.notFound = false;
                  this.total = this._taskEscort.reponse.responseData[0].totalRows;
                  this._stopLoading = true;
                }
                this._stopLoading = true;
              }
            }
          }
        }, (err) => {
          console.log(err);
          this._stopLoading = true;
          this.notFound = false;
          this.popToast('error', 'Failed to Retrieve Escort Tasks', 'Oops! Something went wrong. Try again');
        });
    }
  }

  delete(_id) {
    const data = {
      name: 'deleteTask',
      param: {
        id: _id
      }
    }
    if (confirm('Are you sure you want to delete this task?')) {
      if (_id) {
        this.genericService.delete(data).subscribe(
          res => {
            let temp: any = res;
            if (temp.reponse.code == 200) this.popToast('success', 'Deleted Successfully', temp.reponse.responseData);
            this.loadSupervisorEscortTasks();
            this.loadSupervisorIncidentTasks();
          }, (err) => {
            console.log(err);
            this.popToast('error', 'Failed to Delete', 'Oops! Something went wrong. Try again');
          });
      } else this.popToast('error', 'No ID Found', 'Oops! Something went wrong. Try again');
    } else {
      this.popToast('warning', 'Action Cancelled!', 'You chose not to delete this task');
    }
  }

  submit() {

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
