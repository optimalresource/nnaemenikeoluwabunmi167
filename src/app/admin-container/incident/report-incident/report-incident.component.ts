import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { SearchService } from './../../../services/search.service';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.css']
})
export class ReportIncidentComponent implements OnInit {
  SearchBy;
  results: any;
  searchTerm$ = new Subject<string>();


  constructor(public searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results;
      });
  }

  ngOnInit() {
    this.SearchBy = 'Staff Name'
    this.filterBy(this.SearchBy)
  }

  filterBy(filterValue) {
    this.SearchBy = filterValue;
    this.searchService.setFilter(filterValue.replace(/\s/g, '').toLowerCase());
  }
}
