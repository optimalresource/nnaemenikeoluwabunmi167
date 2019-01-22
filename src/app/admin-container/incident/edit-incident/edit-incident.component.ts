import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { States, Relationship } from '../../../models/enums';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {
  checked = true; // For Casualty CheckBox
  checked1 = true; // For OnBehalf CheckBox
  hasCasualty = 0;
  onBehalf = 1;
  LGAs = [];
  incidentForm;
  singleStaff;
  _incidentTypes = null;
  _casualtyLevels = null;
  _patrolMembers = null;

  data: any;
  states = new States().types;
  rships = new Relationship().types;

  success;
  staffData; // Populate Staff Profile Above
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  incidentData = null;
  _staffId = null;
  _incidentType = null;
  _patrolSupervisor = null;
  _casualtyExist = null;
  _casualtyLevel = null;
  _onBehalf = null;
  _callerPhone = null;
  _callerName = null;
  _state = null;
  _lga = null;
  _town = null;
  _address = null;
  _relationship = null;
  _remarks = null;
  _dateOfIncident = null;
  _timeOfIncident = null;

  constructor(
    public fb: FormBuilder,
    public genericService: GenericService,
    public router: Router,
    toasterService: ToasterService,
    private location: Location,
    private datePipe: DatePipe,
    public route: ActivatedRoute,
    public auth: AuthService) {
    this.toasterService = toasterService
  }

  ngOnInit() {
    this.getStaffDetails();
    this.getAllCasualityLevel();
    this.getIncidentTypes();
    this.getPatrolMembers();

    this.createForm();
    this.loadSingleIncident();

    console.log('states --', this.states)
  }

  checkBoxControl() {
    this.checked = !this.checked
    if (this.checked) this.hasCasualty = 1;
    else this.hasCasualty = 0;
  }
  checkBoxControl1() {
    this.checked1 = !this.checked1
    if (this.checked1) this.onBehalf = 1;
    else this.onBehalf = 0;
  }

  checkStateSelected(id) {
    this.LGAs = this.states[(id - 1)].lga;
    console.log('Found LGAs: ', this.LGAs)
  }

  convertIncidentTypesToID(type) {
    if (this._incidentTypes) {
      for (let i = 0; i < this._incidentTypes.length; i++) {
        if (this._incidentTypes[i].name == type) {
          return this._incidentTypes[i].id
        }
      }
    } else { this.loadSingleIncident() }
  }
  convertSupervisorToID(name) {
    if (this._patrolMembers) {
      for (let i = 0; i < this._patrolMembers.length; i++) {
        if (`${this._patrolMembers[i].firstName} ${this._patrolMembers[i].surname} ${this._patrolMembers[i].otherName}` == name) {
          console.log('matched')
          return this._patrolMembers[i].id
        }
      }
    } else { this.loadSingleIncident() }
  }

  convertLGAToID(state, lga) {
    if (this.states) {
      for (let i = 0; i < this.states.length; i++) {
        if (this.states[i].id == state) {
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
    } else { this.loadSingleIncident() }
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
              console.log(res);
              let temp: any = res;
              this.incidentData = temp.reponse.responseData[0];
              // Simple Check for OnBehalf and if Casualty Exist to check each box correctly
              let onBehalf, casualty = false;
              if (this.incidentData.onBehalf == 1) { this.checked1 = true; this.onBehalf = 1; }
              if (this.incidentData.onBehalf == 0) { this.checked1 = false; this.onBehalf = 0; }
              if (this.incidentData.casualtyExist == 1) { this.checked = true; this.hasCasualty = 1 }
              if (this.incidentData.casualtyExist == 0) { this.checked = false; this.hasCasualty = 0 }

              this._staffId = this.incidentData.staffId;
              this._incidentType = this.convertIncidentTypesToID(this.incidentData.incidentType);
              this._patrolSupervisor = this.convertSupervisorToID(this.incidentData.patrolSupervisor);
              this._casualtyExist = casualty;
              this._casualtyLevel = this.incidentData.casualtyLevel;
              this._onBehalf = true;
              this._callerPhone = this.incidentData.callerPhone;
              this._callerName = this.incidentData.callerName;
              this._state = this.incidentData.state;
              this._lga = this.convertLGAToID(this.incidentData.state, this.incidentData.lga);
              this._town = this.incidentData.town;
              this._address = this.incidentData.address;
              this._relationship = this.incidentData.relationship;
              this._remarks = this.incidentData.remarks;
              this._dateOfIncident = this.incidentData.dateOfIncident;
              this._timeOfIncident = this.incidentData.timeOfIncident;
              console.log('Data data ', this.incidentData);
              this.createForm();
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  submit() {
    let tempDate = this.datePipe.transform(this.incidentForm.controls['dateOfIncident'].value, 'yyyy-MM-dd');

    const data = {
      name: 'updateIncident',
      param: {
        id: this.route.snapshot.params['id'],
        staffId: this.staffData.staffId,
        incidentType: this.incidentForm.controls['incidentType'].value,
        patrolSupervisor: this.incidentForm.controls['patrolTeamHead'].value,
        casualtyExist: this.hasCasualty,
        casualtyLevel: this.incidentForm.controls['casualtyLevel'].value,
        onBehalf: this.onBehalf,
        callerPhone: this.incidentForm.controls['callerNumber'].value,
        callerName: this.incidentForm.controls['callerName'].value,
        state: this.incidentForm.controls['state'].value,
        lga: this.incidentForm.controls['lga'].value,
        town: this.incidentForm.controls['town'].value,
        address: this.incidentForm.controls['address'].value,
        relationship: this.incidentForm.controls['relationship'].value,
        remarks: this.incidentForm.controls['remarks'].value,
        dateOfIncident: tempDate,
        timeOfIncident: this.incidentForm.controls['timeOfIncident'].value
      }
    }
    console.log('Sending data ', data)
    if (data) {
      this.genericService.update(data).subscribe(
        res => {
          console.log(res);
          this.success = res;
          if (this.success) {
            if (this.success.error) {
              if (this.success.error.status == 413) this.popToast('error', 'Bad Data, Did Not Update', this.success.error.message);
            } else {
              if (this.success.reponse.code == 200) {
                this.popToast('success', 'Updated Successfully', this.success.reponse.responseData);
                this.loadSingleIncident();
              }
              else this.popToast('warning', 'Already Exist!', this.success.reponse.responseData);
            }
          } else {
            this.popToast('warning', 'Already up to date!', 'You did not change the initial data');
          }
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Update', 'Oops! Something went wrong. Try again');
        }
      )
    }
  }

  getIncidentTypes() {
    const data = {
      name: 'getAllIncidentTypes',
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
          if (temp.reponse.code == '404') {
            this.popToast('warning', 'No Incident Types to Load', 'Oops! Add Incident Type first');
          } else this._incidentTypes = temp.reponse.responseData;
        }
        this.createForm;
      }, (err) => {
        console.log(err);
        this.popToast('error', 'Failed to Display Incident Types', 'Oops! Something went wrong. Try again');
      });
  }

  getAllCasualityLevel() {
    const data = {
      name: 'getAllCasualtyLevel',
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
          if (temp.reponse.code == '404') {
            this.popToast('warning', 'No Casualty Level to Load', 'Oops! Add Casualty Level first');
          } else this._casualtyLevels = temp.reponse.responseData;
        }
        this.createForm;
      }, (err) => {
        console.log(err);
        this.popToast('error', 'Failed to Display Casualty Level', 'Oops! Something went wrong. Try again');
      });
  }

  getPatrolMembers() {
    const data = {
      name: 'getAllPatrolMembers',
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
          if (temp.reponse.code == '404') {
            this.popToast('warning', 'No Casualty Level to Load', 'Oops! Add Casualty Level first');
          } else this._patrolMembers = temp.reponse.responseData;
        }
        this.createForm();
      }, (err) => {
        this._stopLoading = true;
        this.popToast('error', 'Failed to Load Patrol Members', 'Oops! Something went wrong. Try again');
      });
  }

  changeDetection(e) {
    console.log(e.target.value);
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

  getStaffDetails() {
    const data = {
      name: 'viewStaff',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.staffData = temp.reponse.responseData;
        console.log(this.staffData)
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Staff Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.incidentForm = this.fb.group({
      incidentType: this.fb.control(this._incidentType, Validators.required),
      state: this.fb.control(this._state, Validators.required),
      lga: this.fb.control(this._lga, Validators.required),
      town: this.fb.control(this._town),
      address: this.fb.control(this._address, [Validators.required, Validators.minLength(3)]),

      casualty: this.fb.control(this._casualtyExist),
      casualtyLevel: this.fb.control(this._casualtyLevel),

      onBehalf: this.fb.control(this._onBehalf),
      relationship: this.fb.control(this._relationship),
      callerName: this.fb.control(this._callerName),
      callerNumber: this.fb.control(this._callerPhone),

      remarks: this.fb.control(this._remarks, Validators.required),

      dateOfIncident: this.fb.control(this._dateOfIncident, Validators.required),
      timeOfIncident: this.fb.control(this._timeOfIncident, Validators.required),

      patrolTeamHead: this.fb.control(this._patrolSupervisor, Validators.required),
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this.staffData = '';
    this._stopLoading = false;
    this.getStaffDetails();
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
