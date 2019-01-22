import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';


@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  vehicleForm;
  success;
  vehicleFormData;
  _vehicleName = '';
  _vehicleMake = '';
  _vehicleModel = '';
  _vehiclePlateNumber = '';
  _vehicleYear = '';
  _vehicleColor = '';

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
    public auth: AuthService,
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
    this._stopLoading = false;

    const data = {
      name: 'updateVehicle',
      param: {
        id: this.route.snapshot.params['id'],
        name: this.vehicleForm.controls['vehicleName'].value,
        make: this.vehicleForm.controls['vehicleMake'].value,
        model: this.vehicleForm.controls['vehicleModel'].value,
        year: this.vehicleForm.controls['vehicleYear'].value,
        color: this.vehicleForm.controls['vehicleColor'].value,
        plateNumber: this.vehicleForm.controls['vehiclePlateNumber'].value,
      }
    }
    console.log(data);
    if (data) {
      this.genericService.update(data).subscribe(
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

  goBack() {
    this.location.back();
  }

  getDetails() {
    const data = {
      name: 'viewVehicle',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this._stopLoading = false;
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.vehicleFormData = temp.reponse.responseData;

        this._vehicleName = this.vehicleFormData.name;
        this._vehicleMake = this.vehicleFormData.make;
        this._vehicleModel = this.vehicleFormData.model;
        this._vehiclePlateNumber = this.vehicleFormData.plateNumber;
        this._vehicleYear = this.vehicleFormData.year;
        this._vehicleColor = this.vehicleFormData.color;
        console.log(this.vehicleFormData);
        this._stopLoading = true;
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.vehicleForm = this.fb.group({
      vehicleName: this.fb.control(this._vehicleName, Validators.required),
      vehicleMake: this.fb.control(this._vehicleMake, Validators.required),
      vehicleModel: this.fb.control(this._vehicleModel, Validators.required),
      vehiclePlateNumber: this.fb.control(this._vehiclePlateNumber, Validators.required),
      vehicleYear: this.fb.control(this._vehicleYear, Validators.required),
      vehicleColor: this.fb.control(this._vehicleColor, Validators.required),
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = true;

  reload() {
    this.vehicleFormData = '';
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
