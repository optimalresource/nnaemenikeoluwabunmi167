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
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit {
  searchTerm$ = new Subject<string>();

  _shifts;
  SearchBy = '';
  filterName = 'No Filter';
  keyword;
  notFound = false;
  p: number = 1;
  total: number = 10;
  _items: number = 10;
  dutyStatus = '';
  activateSearch = true;
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
    this._shifts = '';
    this._stopLoading = false;
    this.load();
  }

  adjustTableRows(adjustedValue) {
    this._items = adjustedValue;
    this._shifts = '';
    this.load();
  }

  filterBy(value) {
    if (value == 'Supervisor') { this.filterName = 'Supervisor', this.SearchBy = 'supervisor'; this.activateSearch = true;}
    if (value == 'Team') { this.filterName = 'Team', this.SearchBy = 'team'; this.activateSearch = true;}
    if (value == 'Police') { this.filterName = 'Police', this.SearchBy = 'police'; this.activateSearch = true;}
    if (value == 'Vehicle') { this.filterName = 'Vehicle', this.SearchBy = 'vehicle'; this.activateSearch = true;}
    if (value == 'Branch') { this.filterName = 'Branch', this.SearchBy = 'branch'; this.activateSearch = true;}
    if (value == 'Created By') { this.filterName = 'Created By', this.SearchBy = 'createdBy'; this.activateSearch = true;}
    if (value == 'On Duty') { this.filterName = 'On Duty', this.dutyStatus = 'current'; this.activateSearch = false; this.load()}
    if (value == 'Off Duty') { this.filterName = 'Off Duty', this.dutyStatus = 'past'; this.activateSearch = false; this.load()}
    if (value == 'No Filter') { this.filterName = 'No Filter', this.SearchBy = ''; this.activateSearch = true;}
  }

  load() {
    const data = {
      name: 'getAllShifts',
      param: {
        state: this.dutyStatus,
        limit: this._items,
        page: this.p
      }
    }
    this._shifts = '';
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
              this._shifts = res;
              if (this._shifts.reponse.responseData.length) {
                this.notFound = false;
                this.total = this._shifts.reponse.responseData[0].totalRows;
              }
              else console.log('No data yet in database', this._shifts);
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
        name: 'searchShifts',
        param: {
          keyword: term,
          search_class: this.SearchBy,
          limit: this._items,
          page: this.p
        }
      }
      this._shifts = '';
      this.dutyStatus = '' //To ensure shift table will be populated with all shifts later 
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
                this._shifts = res;
                if (this._shifts.reponse.responseData.length) {
                  this.notFound = false;
                  this.total = this._shifts.reponse.responseData[0].totalRows;
                }
                else console.log('No data yet in database', this._shifts);
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
      name: 'deleteShift',
      param: {
        id: _id
      }
    }
    if (confirm('Are you sure you want to delete this Shift?')) {
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
      this.popToast('warning', 'Action Cancelled!', 'You chose not to delete this Shift');
    }
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this._shifts = '';
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

