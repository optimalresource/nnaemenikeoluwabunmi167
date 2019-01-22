import { ImageService } from './../../../services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-add-patrol-member',
  templateUrl: './add-patrol-member.component.html',
  styleUrls: ['./add-patrol-member.component.css']
})
export class AddPatrolMemberComponent implements OnInit {
  patrolMemberForm;
  success;
  selectedFile = null;
  base64ToString;
  _positions;
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
    this.loadPositions();
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
        console.log(res);
        let temp: any = res;
        if (temp) {
          this._positions = temp.reponse.responseData;
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
    } else img = ''

    const data = {
      name: 'createPatrolMember',
      param: {
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
    this.patrolMemberForm = this.fb.group({
      staffId: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      otherName: this.fb.control('', Validators.required),
      surname: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      number: this.fb.control('', Validators.required),
      designation: this.fb.control('', Validators.required),
      position: this.fb.control('', Validators.required),
      branch: this.fb.control('', Validators.required),
      homeAddress: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required)
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
