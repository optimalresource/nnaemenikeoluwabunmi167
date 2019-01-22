import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-add-patrol-team',
  templateUrl: './add-patrol-team.component.html',
  styleUrls: ['./add-patrol-team.component.css']
})
export class AddPatrolTeamComponent implements OnInit {
  patrolTeamForm;
  success;
  _branches;
  _patrolMembers;
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
    public imageService: ImageService) {
    this.toasterService = toasterService;
    this.loadBranches();
    this.loadPatrolMembers();
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

  loadPatrolMembers() {
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
        if (temp) this._patrolMembers = temp.reponse.responseData;
        this.createForm();
      }, (err) => {
        this._stopLoading = true;
        this.popToast('error', 'Failed to Load Patrol Members', 'Oops! Something went wrong. Try again');
      });
  }

  loadBranches() {
    const data = {
      name: 'getAllBranches',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this.genericService.getAll(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        if (temp) this._branches = temp.reponse.responseData;
        this.createForm();
      }, (err) => {
        this._stopLoading = true;
        this.popToast('error', 'Failed to Load Branches', 'Oops! Something went wrong. Try again');
      });
  }

  submit() {
    const data = {
      name: 'createPatrolTeam',
      param: {
        teamName: this.patrolTeamForm.controls['teamName'].value,
        teamHead: this.patrolTeamForm.controls['teamHead'].value,
        policeOne: this.patrolTeamForm.controls['policeOne'].value,
        policeTwo: this.patrolTeamForm.controls['policeTwo'].value,
        branch: this.patrolTeamForm.controls['branch'].value
      }
    }
    console.log(data);
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
    this.patrolTeamForm = this.fb.group({
      teamName: this.fb.control('', Validators.required),
      teamHead: this.fb.control('', Validators.required),
      policeOne: this.fb.control('', Validators.required),
      policeTwo: this.fb.control('', Validators.required),
      branch: this.fb.control('', Validators.required)
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this._branches = null;
    this._patrolMembers = null;
    this._stopLoading = false;
    this.loadBranches();
    this.loadPatrolMembers();
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
