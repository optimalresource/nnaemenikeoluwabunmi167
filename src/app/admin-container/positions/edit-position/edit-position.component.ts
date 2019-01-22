import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {
  positionForm;
  success;
  positionData;
  _position = '';
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
      name: 'updateSecurityPosition',
      param: {
        id: this.route.snapshot.params['id'],
        name: this.positionForm.controls['position'].value
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
      name: 'viewSecurityPosition',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.positionData = temp.reponse.responseData;
        this._position = this.positionData.name;
        console.log(this.positionData)
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.positionForm = this.fb.group({
      position: this.fb.control(this._position, Validators.required)
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this.positionData = '';
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
