import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { States, Relationship } from '../../../models/enums';
import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {
  success;
  incidentData;
  YESorNO;
  private toasterService: ToasterService;

  rships = new Relationship().types;
  states = new States().types;
  // Stores the Values retrieve no longer the IDs
  _rship;
  _state;

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

  getRShipValue(r) {
    for (let i = 0; i < this.rships.length; i++) {
      if (this.rships[i].id == r) return this.rships[i].rship;
    }
  }
  getStateValue(s) {
    for (let j = 0; j < this.states.length; j++) {
      if (this.states[j].id == s) return this.states[j].state;
    }
  }

  goBack() {
    this.location.back();
  }

  getDetails() {
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
          if (temp.reponse.code == 404) {
            this._stopLoading = true;
            this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
          } else {
            this.incidentData = temp.reponse.responseData[0];
            if (this.incidentData.casualtyExist == 1) this.YESorNO = 'Yes';
            if (this.incidentData.casualtyExist == 0) this.YESorNO = 'No';
            this._rship = this.getRShipValue(this.incidentData.relationship); //Swap the ID's for their actual value in model/enum
            this._state = this.getStateValue(this.incidentData.state); //Swap the ID's for their actual value in model/enum
          }
        }

      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Incident Data', 'Oops! Something went wrong. Try again');
      });
  }


  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this.incidentData = '';
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
