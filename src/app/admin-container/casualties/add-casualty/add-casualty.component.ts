import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-add-casualty',
  templateUrl: './add-casualty.component.html',
  styleUrls: ['./add-casualty.component.css']
})
export class AddCasualtyComponent implements OnInit {
  casualtyLevelForm;
  success;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public fb: FormBuilder, public genericService: GenericService, public router: Router, toasterService: ToasterService, private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
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

  submit() {
    const data = {
      name: 'createCasualtyLevel',
      param: {
        level: this.casualtyLevelForm.controls['casualtyLevel'].value
      }
    }
    if (data) {
      this.genericService.save(data).subscribe(
        res => {
          console.log(res);
          this.success = res;
          if (this.success.reponse.code == 200) {
            this.popToast('success', 'Saved Successfully', this.success.reponse.responseData);
            this.createForm();
          }
          else this.popToast('warning', 'Already Exist!', this.success.reponse.responseData);
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Save', 'Oops! Something went wrong. Try again');
        }
      )
    }
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.casualtyLevelForm = this.fb.group({
      casualtyLevel: this.fb.control('', Validators.required)
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;

  expand() {
    this._toggleExpand = !this._toggleExpand;
    this._toggleExpandIcon = !this._toggleExpandIcon;
  }

  collapse() {
    this._toggleCollapse = !this._toggleCollapse;
    this._toggleCollapseIcon = !this._toggleCollapseIcon;
  }
}
