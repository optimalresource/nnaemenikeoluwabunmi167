import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-edit-incident-type',
  templateUrl: './edit-incident-type.component.html',
  styleUrls: ['./edit-incident-type.component.css']
})
export class EditIncidentTypeComponent implements OnInit {
  incidentTypeForm;
  success;
  incidentTypeData;
  _incidentTypeName = '';
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
    public route: ActivatedRoute) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.createForm();
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

  submit() {
    const data = {
      name: 'updateIncidentType',
      param: {
        id: this.route.snapshot.params['id'],
        name: this.incidentTypeForm.controls['incidentTypeName'].value
      }
    }
    if (data) {
      this.genericService.update(data).subscribe(
        res => {
          console.log(res);
          this.success = res;
          if (this.success) {
            if (this.success.reponse.code == 200) {
              this.popToast('success', 'Update Successfully', this.success.reponse.responseData);
              this.getDetails();
              this.createForm();
            }
          } else {
            this.popToast('warning', 'Already up to date!', 'You did not change the initial name');
          }
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Update', 'Oops! Something went wrong. Try again');
        }
      )
    }
  }

  goBack() {
    this.location.back();
  }

  getDetails() {
    const data = {
      name: 'viewIncidentType',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.incidentTypeData = temp.reponse.responseData;
        this._incidentTypeName = this.incidentTypeData.name
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.incidentTypeForm = this.fb.group({
      incidentTypeName: this.fb.control(this._incidentTypeName, Validators.required)
    });
  }

// Extra Card Controls
_toggleExpand = false;
_toggleExpandIcon = true;
_toggleCollapse = true;
_toggleCollapseIcon = false;
_stopLoading = false;

reload() {
  this.incidentTypeData = '';
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
