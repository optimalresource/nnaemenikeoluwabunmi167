import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-edit-patrol-member',
  templateUrl: './edit-patrol-member.component.html',
  styleUrls: ['./edit-patrol-member.component.css']
})
export class EditPatrolMemberComponent implements OnInit {
  success;
  patrolMemberData;
  _positions;
  _position = '';
  _staffId = '';
  _firstName = '';
  _otherName = '';
  _surname = '';
  _image = '';
  _email = '';
  _number = '';
  _designation = '';
  _branch = '';
  _homeAddress = '';
  _gender = '';
  patrolMemberForm;
  selectedFile = null;
  base64ToString;
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
    this.loadPositions();
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

  onFileSelected(event) {
    var pattern = /image-*/;
    this.selectedFile = event.target.files[0];

    if (!this.selectedFile.type.match(pattern)) {
      this.popToast('error', 'File is NOT an Image', 'Kindly choose an image in jpg/png format. This file will NOT be saved!');
      return;
    } else {
      this.popToast('success', 'Correct Image Fomat', 'This is a valid image format');
      console.log(this.selectedFile);

      let reader = new FileReader();
      this.readFile(this.selectedFile, reader);
    }
  }

  readFile(file, reader) {
    reader.onload = () => {
      // console.log('reader.result', reader.result);
      this.base64ToString = `${reader.result}`
      console.log('Hi ', this.base64ToString);
      return this.base64ToString;
    }
    reader.readAsDataURL(file);
  }

  // To Populate Position Select Input
  loadPositions() {
    const data = {
      name: 'getAllSecurityPositions',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this.genericService.getAll(data).subscribe(
      res => {
        let temp: any = res;
        if (temp) {
          this._positions = temp.reponse.responseData;
          console.log("positions ", this._positions);
        }
        this.createForm();
      }, (err) => {
        this.popToast('error', 'Failed to Load Positions', 'Oops! Something went wrong. Try again');
      });
  }

  submit() {
    let img;
    if (this.base64ToString) {
      img = this.base64ToString;
      console.log('We have an Image :)')
    } else img = this._image;

    const data = {
      name: 'updatePatrolMember',
      param: {
        id: this.route.snapshot.params['id'],
        staffId: this.patrolMemberForm.controls['staffId'].value,
        firstName: this.patrolMemberForm.controls['firstName'].value,
        otherName: this.patrolMemberForm.controls['otherName'].value,
        surname: this.patrolMemberForm.controls['surname'].value,
        image: img,
        email: this.patrolMemberForm.controls['email'].value,
        number: this.patrolMemberForm.controls['number'].value,
        designation: this.patrolMemberForm.controls['designation'].value,
        position: this.patrolMemberForm.controls['position'].value,
        branch: this.patrolMemberForm.controls['branch'].value,
        homeAddress: this.patrolMemberForm.controls['homeAddress'].value,
        gender: this.patrolMemberForm.controls['gender'].value,
      }
    }
    if (data) {
      console.log(data);
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
      name: 'viewPatrolMember',
      param: {
        id: this.route.snapshot.params['id']
      }
    }
    this.genericService.getOne(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        this.patrolMemberData = temp.reponse.responseData;
        this._position = this.patrolMemberData.position;
        this._staffId = this.patrolMemberData.staffId;
        this._firstName = this.patrolMemberData.firstName;
        this._otherName = this.patrolMemberData.otherName;
        this._surname = this.patrolMemberData.surname;
        this._email = this.patrolMemberData.email;
        this._image = this.patrolMemberData.image;
        this._number = this.patrolMemberData.number;
        this._designation = this.patrolMemberData.designation;
        this._branch = this.patrolMemberData.branch;
        this._homeAddress = this.patrolMemberData.homeAddress;
        this._gender = this.patrolMemberData.gender;
        console.log('patrolMemberData ', this.patrolMemberData);
        this.createForm();
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Patrol Member Data', 'Oops! Something went wrong. Try again');
      });
  }

  createForm() {
    this.patrolMemberForm = this.fb.group({
      staffId: this.fb.control(this._staffId, Validators.required),
      firstName: this.fb.control(this._firstName, Validators.required),
      otherName: this.fb.control(this._otherName, Validators.required),
      surname: this.fb.control(this._surname, Validators.required),
      image: this.fb.control(''),
      email: this.fb.control(this._email, Validators.required),
      number: this.fb.control(this._number, Validators.required),
      designation: this.fb.control(this._designation, Validators.required),
      position: this.fb.control('', Validators.required),
      branch: this.fb.control(this._branch, Validators.required),
      homeAddress: this.fb.control(this._homeAddress, Validators.required),
      gender: this.fb.control(this._gender, Validators.required)
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this.patrolMemberData = '';
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
