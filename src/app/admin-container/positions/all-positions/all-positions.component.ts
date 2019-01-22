import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';

@Component({
  selector: 'app-all-positions',
  templateUrl: './all-positions.component.html',
  styleUrls: ['./all-positions.component.css']
})
export class AllPositionsComponent implements OnInit {
  _positions;
  deleted;
  p: number = 1;
  total: number = 10;
  _items: number = 10;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public genericService: GenericService, public route: ActivatedRoute, toasterService: ToasterService, public router: Router, private location: Location) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.load();
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

  nextPage(page: number) {
    this.p = page;
    this._positions = '';
    this._stopLoading = false;
    this.load();
  }

  load() {
    const data = {
      name: 'getAllSecurityPositions',
      param: {
        limit: this._items,
        page: this.p
      }
    }
    this.genericService.getAll(data).subscribe(
      res => {
        console.log(res);
        this._positions = res;
        if (this._positions.reponse.responseData.length) {
          this.total = this._positions.reponse.responseData[0].totalRows;
        }
        else this.popToast('warning', 'No Data Added Yet', 'You can try adding some data first');
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.popToast('error', 'Failed to Retrieve Positions', 'Oops! Something went wrong. Try again');
      });
  }

  delete(_id) {
    const data = {
      name: 'deleteSecurityPosition',
      param: {
        id: _id
      }
    }
    if (confirm('Are you sure you want to delete this Position?')) {
      this.genericService.delete(data).subscribe(
        res => {
          this.deleted = res;
          if (this.deleted.reponse.code == 200) this.popToast('success', 'Deleted Successfully', this.deleted.reponse.responseData);
          this.load();
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Delete', 'Oops! Something went wrong. Try again');
        });
    } else {
      this.popToast('warning', 'Action Cancelled!', 'You chose not to delete the Position');
    }
  }

  goBack() {
    this.location.back();
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this._positions = '';
    this._stopLoading = false;
    this.load();
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
