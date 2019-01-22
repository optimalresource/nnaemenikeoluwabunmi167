import { VisualizeDataService } from './../../../services/visualize-data.service';
import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, tap, } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

import { GenericService } from './../../../services/generic.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent implements OnInit {
  searchTerm$ = new Subject<string>();

  _vehicles;
  SearchBy = 'model';
  filterName = 'Model';
  keyword;
  notFound = false;
  p: number = 1;
  total: number = 10;
  _items: number = 10;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public fb: FormBuilder, public genericService: GenericService, public auth: AuthService, public route: ActivatedRoute, toasterService: ToasterService, public router: Router, private datePipe: DatePipe, private vsData: VisualizeDataService) {
    this.toasterService = toasterService;
    this.search(this.searchTerm$)
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
    this._vehicles = '';
    this._stopLoading = false;
    this.load();
  }

  adjustTableRows(adjustedValue) {
    this._items = adjustedValue;
    this._vehicles = '';
    this.load();
  }

  filterBy(value) {
    if (value == 'Model') { this.filterName = 'Model', this.SearchBy = 'model'; }
    if (value == 'Make') { this.filterName = 'Make', this.SearchBy = 'make'; }
    if (value == 'Year') { this.filterName = 'Year', this.SearchBy = 'year'; }
    if (value == 'Plate Number') { this.filterName = 'Plate Number', this.SearchBy = 'plateNumber'; }
    if (value == 'Plate No.') { this.filterName = 'Plate No.', this.SearchBy = 'plateNumber'; }
    if (value == 'Color') { this.filterName = 'Color', this.SearchBy = 'color'; }
    if (value == 'Created By') { this.filterName = 'Created By', this.SearchBy = 'createdBy'; }

  }

  load() {
    const data = {
      name: 'getAllVehicles',
      param: {
        limit: this._items,
        page: this.p
      }
    }
    this._vehicles = '';
    this._stopLoading = false;
    console.log('Data to be posted: ', data)

    this.genericService.getAll(data).subscribe(
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
            if (temp.reponse.code == 404) {
              this._stopLoading = true;
              this.notFound = true;
              this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
            } else {
              this._vehicles = res;
              if (this._vehicles.reponse.responseData.length) {
                this.notFound = false;
                this.total = this._vehicles.reponse.responseData[0].totalRows;
              }
              else console.log('No data yet in database', this._vehicles);
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.notFound = false;
        this.popToast('error', 'Failed to Retrieve Incidents', 'Oops! Something went wrong. Try again');
      });
  }


  // Updating Search Parameter
  search(terms: Observable<string>) {
    terms.pipe(debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(term => { this.loadGenericSearch(term) });
  }

  loadGenericSearch(term) {
    if (term != '') {
      const data = {
        name: 'searchVehicle',
        param: {
          keyword: term,
          search_class: this.SearchBy,
          limit: this._items,
          page: this.p
        }
      }
      this._vehicles = '';
      this._stopLoading = false;
      this.keyword = term;

      this.genericService.getAll(data).subscribe(
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
              if (temp.reponse.code == 404) {
                this._stopLoading = true;
                this.notFound = true;
                this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
              } else {
                this._vehicles = res;
                if (this._vehicles.reponse.responseData.length) {
                  this.notFound = false;
                  this.total = this._vehicles.reponse.responseData[0].totalRows;
                }
                else console.log('No data yet in database', this._vehicles);
              }
            }
          }
        }, (err) => {
          console.log(err);
          this._stopLoading = true;
          this.notFound = false;
          this.popToast('error', 'Failed to Retrieve Incidents', 'Oops! Something went wrong. Try again');
        });
    } else { this.load(); this.keyword = ''; }
  }

  delete(_id) {
    const data = {
      name: 'deleteVehicle',
      param: {
        id: _id
      }
    }
    if (confirm('Are you sure you want to delete this Vehicle?')) {
      if (_id) {
        this.genericService.delete(data).subscribe(
          res => {
            let temp: any = res;
            if (temp.reponse.code == 200) this.popToast('success', 'Deleted Successfully', temp.reponse.responseData);
            this.load();
          }, (err) => {
            console.log(err);
            this.popToast('error', 'Failed to Delete', 'Oops! Something went wrong. Try again');
          });
      } else this.popToast('error', 'No ID Found', 'Oops! Something went wrong. Try again');
    } else {
      this.popToast('warning', 'Action Cancelled!', 'You chose not to delete this Vehicle');
    }
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this._vehicles = '';
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

