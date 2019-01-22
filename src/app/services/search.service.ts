import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, tap, } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private filterBy;

  // baseUrl: string = 'assets/data/staff.json';

  // BASE_URL = 'https://moredrops.com/crms/mainbox/';
  BASE_URL = '/crms/mainbox/';
  queryUrl: string;
  p: number = 1;
  _items: number = 5;

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  pageChanger(id: number) {
    this.p = id;
  }

  getPageAndItems() {
    let data = {
      p: this.p,
      _items: this._items
    }
    return data;
  }

  searchEntries(term) {
    console.log('new search term: ', term);
    let data: any = {
      name: "searchStaff",
      param: {
        keyword: term,
        search_class: this.queryUrl,
        limit: this._items,
        page: this.p
      }
    }

    console.log("structure used: ", data);
    return this.http
      .post(this.BASE_URL, data)
      .pipe(map(res => {
        console.log('search result', res);
        return res;
      }));
  }

  setFilter(filterValue: string) {
    console.log(filterValue);
    if (filterValue == 'staffname') this.queryUrl = `staffName`;
    if (filterValue == 'staffid') this.queryUrl = `staffId`;
    if (filterValue == 'nofilter') this.queryUrl = ``;
  }
}


