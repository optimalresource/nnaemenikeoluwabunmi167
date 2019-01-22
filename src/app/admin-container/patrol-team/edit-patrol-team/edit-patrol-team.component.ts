import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-edit-patrol-team',
  templateUrl: './edit-patrol-team.component.html',
  styleUrls: ['./edit-patrol-team.component.css']
})
export class EditPatrolTeamComponent implements OnInit {
  patrolTeamForm;
  success;
  patrolTeamData;
  _branches;
  _patrolMembers;
  _teamName = '';
  _teamHead = '';
  _policeOne = '';
  _policeTwo = '';
  _branch = '';
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
    this.loadBranches();
    this.loadPatrolMembers();
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
      name: 'updatePatrolTeam',
      param: {
        id: this.route.snapshot.params['id'],
        teamName: this.patrolTeamForm.controls['patrolTeam'].value,
        teamHead: this.patrolTeamForm.controls['teamHead'].value,
        policeOne: this.patrolTeamForm.controls['policeOne'].value,
        policeTwo: this.patrolTeamForm.controls['policeTwo'].value,
        branch: this.patrolTeamForm.controls['branch'].value
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
            this.popToast('warning', 'Already up to date!', 'You did not change the initial data');
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
      name: 'viewPatrolTeam',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.patrolTeamData = temp.reponse.responseData;
        this._teamName = this.patrolTeamData.teamName;
        this._teamHead = this.patrolTeamData.teamHead;
        this._policeOne = this.patrolTeamData.policeOne;
        this._policeTwo = this.patrolTeamData.policeTwo;
        this._branch = this.patrolTeamData.policeTwo;
        console.log(this.patrolTeamData)
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.patrolTeamForm = this.fb.group({
      teamName: this.fb.control(this._teamName, Validators.required),
      teamHead: this.fb.control(this._teamHead, Validators.required),
      policeOne: this.fb.control(this._policeOne, Validators.required),
      policeTwo: this.fb.control(this._policeTwo, Validators.required),
      branch: this.fb.control(this._branch, Validators.required)
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this.patrolTeamData = '';
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
