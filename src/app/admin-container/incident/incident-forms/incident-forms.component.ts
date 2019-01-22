import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { States, Relationship } from '../../../models/enums';

import { GenericService } from './../../../services/generic.service';


@Component({
  selector: 'app-incident-forms',
  templateUrl: './incident-forms.component.html',
  styleUrls: ['./incident-forms.component.css']
})
export class IncidentFormsComponent implements OnInit {
  checked = false; // For Casualty CheckBox
  checked1 = false; // For OnBehalf CheckBox
  hasCasualty = 0;
  onBehalf = 0;
  LGAs = [];
  incidentForm;
  singleStaff;
  _incidentTypes = null;
  _casualtyLevels = null;
  _patrolMembers = null;

  mytime: Date = new Date();
  data: any;
  states = new States().types;
  rships = new Relationship().types;

  success;
  staffData; // Populate Staff Profile Above
  private toasterService: ToasterService;

  // Caller Phone & Number is Passed to these variables
  _callerPhone = null;
  _callerName = null;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(
    public fb: FormBuilder,
    public genericService: GenericService,
    public router: Router,
    toasterService: ToasterService,
    private location: Location,
    private datePipe: DatePipe,
    public route: ActivatedRoute) {
    this.toasterService = toasterService
  }

  ngOnInit() {
    this.getDetails();
    this.getAllCasualityLevel();
    this.getIncidentTypes();
    this.getPatrolMembers();

    this.createForm();
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

  setCallerName(e) { this._callerName = e.target.value; }
  setCallerPhone(e) { this._callerPhone = e.target.value; }

  submit() {
    let tempDate = this.datePipe.transform(this.incidentForm.controls['dateOfIncident'].value, 'yyyy-MM-dd');
    let tempTime = this.datePipe.transform(this.incidentForm.controls['timeOfIncident'].value, 'h:mm a');

    const data = {
      name: 'createIncident',
      param: {
        staffId: this.staffData.staffId,
        incidentType: this.incidentForm.controls['incidentType'].value,
        patrolSupervisor: this.incidentForm.controls['patrolTeamHead'].value,
        casualtyExist: this.hasCasualty,
        casualtyLevel: this.incidentForm.controls['casualtyLevel'].value,
        onBehalf: this.onBehalf,
        callerPhone: this._callerPhone,
        callerName: this._callerName,
        state: this.incidentForm.controls['state'].value,
        lga: this.incidentForm.controls['lga'].value,
        town: this.incidentForm.controls['town'].value,
        address: this.incidentForm.controls['address'].value,
        relationship: this.incidentForm.controls['relationship'].value,
        remarks: this.incidentForm.controls['remarks'].value,
        dateOfIncident: tempDate,
        timeOfIncident: tempTime
      }
    }
    console.log(data)
    if (data) {
      this.genericService.save(data).subscribe(
        res => {
          console.log(res);
          this.success = res;
          if (this.success) {
            if (this.success.error) {
              if (this.success.error.status == 413) this.popToast('error', 'Bad Data, Did Not Save', this.success.error.message);
            } else {
              if (this.success.reponse.code == 200) {
                this.popToast('success', 'Saved Successfully', this.success.reponse.responseData);
                this.createForm();
              }
              else this.popToast('warning', 'Already Exist!', this.success.reponse.responseData);
            }
          }
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Save', 'Oops! Something went wrong. Try again');
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

  getDetails() {
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
      incidentType: this.fb.control('', Validators.required),
      state: this.fb.control('', Validators.required),
      lga: this.fb.control('', Validators.required),
      town: this.fb.control(''),
      address: this.fb.control('', [Validators.required, Validators.minLength(3)]),

      casualty: this.fb.control(false),
      casualtyLevel: this.fb.control('', Validators.required),

      onBehalf: this.fb.control(false),
      relationship: this.fb.control('', Validators.required),
      callerName: this.fb.control('', Validators.required),
      callerNumber: this.fb.control('', Validators.required),

      remarks: this.fb.control('', Validators.required),

      dateOfIncident: this.fb.control('', Validators.required),
      timeOfIncident: this.fb.control(this.mytime, Validators.required),

      patrolTeamHead: this.fb.control('', Validators.required),
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
