import { GenericService } from './../../../services/generic.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from './../../../services/search.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  SearchBy;
  results: any = '';
  searchTerm$ = new Subject<string>();

  deleted;
  p: number = 1;
  total: number = 5;
  _items: number = 5;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });


  constructor(public searchService: SearchService, public route: ActivatedRoute, toasterService: ToasterService, public router: Router, public genericService: GenericService) {
    this.search(this.searchTerm$)
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.SearchBy = 'Staff Name'
    this.filterBy(this.SearchBy);
    // Initializing Page Number and Items per Page
    this.p = this.searchService.getPageAndItems().p
    this._items = this.searchService.getPageAndItems()._items;
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

  filterBy(filterValue) {
    this.SearchBy = filterValue;
    this.searchService.setFilter(filterValue.replace(/\s/g, '').toLowerCase());
  }

  nextPage(page: number) {
    // this.p = page;
    this.searchService.pageChanger(page);
    // Re-Initializing Page Number and Items per Page
    this.p = this.searchService.getPageAndItems().p
    this._items = this.searchService.getPageAndItems()._items;
    console.log(this.p);
  }

  search(searchTerm) {
    console.log('searchTerm: ', searchTerm)
    // console.log('searchTerm: ', searchTerm.observers[0].destination.destination.key)
    if (searchTerm != '') {
      this.searchService.search(searchTerm)
        .subscribe(results => {
          this._stopLoading = false;
          this._noSuchStaff = false;
          console.log('results: ', results);
          if (results) {
            let temp: any = results;
            if (temp.reponse) {
              if (temp.reponse.responseData == 'No staff record is found in the database') {
                this.popToast('warning', 'This Staff does not exist', 'Having troubles finding a staff?');
                this.results = null;
                this._stopLoading = true;
                this._noSuchStaff = true;
              } else {
                this.results = temp;
                console.log('made it: ', this.results);
                console.log('made it2: ', this.results.reponse.responseData[0].totalRows);
                this.total = this.results.reponse.responseData[0].totalRows;
                // this.total = 2;
                this._stopLoading = true;
                this._noSuchStaff = false;
              }
            }
            if (temp.error) {
              console.log('Got Error!!! ', temp.error);
              this._stopLoading = true;
              this._noSuchStaff = false;
              this.results = '';
              if (temp.error.message == 'keyword parameter is required') this.popToast('warning', 'A Search Keyword is required', 'Having troubles finding a staff?');
              else this.popToast('error', 'Failed to Retrieve Staff', 'Oops! Something went wrong. Try again');
            }
          }

        }, (err) => {
          this._stopLoading = true;
          this._noSuchStaff = false;
          this.popToast('error', 'Failed to Retrieve Staff', 'Oops! Something went wrong. Try again');
        });
    }
  }

  delete(_id) {
    const data = {
      name: '',
      param: {
        id: _id
      }
    }
    if (confirm('Are you sure you want to delete this Staff?')) {
      this.genericService.delete(data).subscribe(
        res => {
          this.deleted = res;
          if (this.deleted.reponse.code == 200) this.popToast('success', 'Deleted Successfully', this.deleted.reponse.responseData);
          // this.load();
        }, (err) => {
          console.log(err);
          this.popToast('error', 'Failed to Delete', 'Oops! Something went wrong. Try again');
        });
    } else {
      this.popToast('warning', 'Action Cancelled!', 'You chose not to delete the Staff');
    }
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = true;
  _noSuchStaff = false;

  expand() {
    this._toggleExpand = !this._toggleExpand;
    this._toggleExpandIcon = !this._toggleExpandIcon;
  }

  collapse() {
    this._toggleCollapse = !this._toggleCollapse;
    this._toggleCollapseIcon = !this._toggleCollapseIcon;
  }
}

