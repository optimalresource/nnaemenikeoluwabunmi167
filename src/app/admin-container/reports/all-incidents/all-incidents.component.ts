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
  selector: 'app-all-incidents',
  templateUrl: './all-incidents.component.html',
  styleUrls: ['./all-incidents.component.css']
})
export class AllIncidentsComponent implements OnInit {
  searchTerm$ = new Subject<string>();

  incidentControlForm;
  incidentControlFormSearch;
  SearchBy;
  SearchByTwo;
  SearchByThree;
  _incidents;
  notFound = false;
  p: number = 1;
  total: number = 10;
  _items: number = 10;
  private toasterService: ToasterService;
  _incidentTypes = null;
  _casualtyLevels = null;
  _patrolMembers = null;

  // Primary Filter Control variables
  _allIncidents = '';
  _incidentSearch = '';
  _openIncidents = '';
  _closedIncidents = '';
  _withCasuality = '';
  _casualityLevel = '';
  _thirdPartyCaller = '';
  _hasPatrolTeam = '';
  _incidentType = '';
  _dayOfIncident = '';
  _monthOfIncident = '';
  _yearOfIncident = '';
  _yearRange = '';
  _dateRange = '';
  _createBy = '';

  // Search Filter Control Variables
  _allIncidentsSearch = '';
  _incidentSearchSearch = '';
  _openIncidentsSearch = '';
  _closedIncidentsSearch = '';
  _withCasualitySearch = '';
  _casualityLevelSearch = '';
  _thirdPartyCallerSearch = '';
  _hasPatrolTeamSearch = '';
  _incidentTypeSearch = '';
  _dayOfIncidentSearch = '';
  _monthOfIncidentSearch = '';
  _yearOfIncidentSearch = '';
  _yearRangeSearch = '';
  _dateRangeSearch = '';
  _createBySearch = '';

  // Actual Params to be Sent for Primary Control
  _reportBy = '';
  _reportParam = '';
  _date_of_incident = '';
  _rangeFrom = '';
  _rangeTo = '';
  _state = '';

  // Actual Search Params to be Sent for Tetiary/Search Control
  _date_of_incident_search = '';
  _patrolSupervisor_search = '';
  _rangeFrom_search = '';
  _rangeTo_search = '';
  _firstParam_search = '';
  _secondParam_search = '';
  _casualtyLevel_search = '';
  _incidentType_search = '';
  _state_search = '';
  _createdBy_search = '';
  _keyword_search = '';

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
    this.SearchBy = 'All Incidents';
    this.SearchByTwo = 'Has Casualty';
    this.SearchByThree = 'None'
    this.createForm();
    this.createFormSearch();

    this.getAllCasualityLevel();
    this.getIncidentTypes();
    this.getPatrolMembers();

    // Push Filter Name to Visualize Global Store
    this.vsData.changeFilterNames(this.SearchBy)
  }

  // Toggling Views of Controls for Filtering Data in the Main Table
  filterBy(filterValue) {
    this.SearchBy = filterValue;
    // this.searchService.setFilter(filterValue.replace(/\s/g, '').toLowerCase());
    if (this.SearchBy == 'All Incidents') { this.resetToDefault(); this.load() }
    if (this.SearchBy == 'Incident Search') { this.resetToDefault(); this._incidentSearch = '1'; this.setSecondary_firstParam_search('casualtyExist'); }
    if (this.SearchBy == 'Open Incidents') { this.resetToDefault(); this.loadIncidentsGeneric1('getAllOpenIncidents'); }
    if (this.SearchBy == 'Closed Incidents') { this.resetToDefault(); this.loadIncidentsGeneric1('getAllClosedIncidents') }
    if (this.SearchBy == 'With Casuality') { this.resetToDefault(); this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('casualtyExist'); this.loadIncidentsGeneric2(); }
    if (this.SearchBy == 'Casuality Level') { this.resetToDefault(); this._casualityLevel = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('incidentType'); }
    if (this.SearchBy == '3rd Party Caller') { this.resetToDefault(); this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('onBehalf'); this.loadIncidentsGeneric2(); }
    if (this.SearchBy == 'Has Patrol Team') { this.resetToDefault(); this._hasPatrolTeam = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('patrol_team'); }
    if (this.SearchBy == 'Incident Type') { this.resetToDefault(); this._incidentType = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('incidentType'); }
    if (this.SearchBy == 'Day of Incident') { this.resetToDefault(); this._dayOfIncident = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('day'); }
    if (this.SearchBy == 'Month of Incident') { this.resetToDefault(); this._dayOfIncident = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('month'); }
    if (this.SearchBy == 'Year of Incident') { this.resetToDefault(); this._dayOfIncident = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('year'); }
    if (this.SearchBy == 'Year Range') { this.resetToDefault(); this._dateRange = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('year_range'); }
    if (this.SearchBy == 'Date Range') { this.resetToDefault(); this._dateRange = '1'; this.resetToDefaultPrimaryParams(); this.setPrimary_reportBy('date_range'); }
    if (this.SearchBy == 'Create By') { this.resetToDefault(); this._createBy = '1'; }

    // Push Filter Name to Visualize Global Store
    this.vsData.changeFilterNames(this.SearchBy);
  }

  filterByTwo(filterValueTwo) {
    this.SearchByTwo = filterValueTwo;

    if ((this.SearchByTwo == 'Particular Day') || (this.SearchByTwo == 'Particular Month') || (this.SearchByTwo == 'Particular Year') || (this.SearchByTwo == 'Year Range') || (this.SearchByTwo == 'Date Range')) console.log(this.SearchByTwo)

    if (this.SearchByTwo == 'Has Casualty') { this.resetToDefaultSearch(); this.resetToDefaultSearchParams(); this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('casualtyExist') }
    if (this.SearchByTwo == 'Casualty Level') { this.resetToDefaultSearch(); this._casualityLevelSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('casualtyLevel') }
    if (this.SearchByTwo == 'Incident Type') { this.resetToDefaultSearch(); this._incidentTypeSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('incidentType') }
    if (this.SearchByTwo == 'Patrol Supervisor') { this.resetToDefaultSearch(); this._hasPatrolTeamSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('patrolSupervisor') }
    if (this.SearchByTwo == 'Particular Day') { this.resetToDefaultSearch(); this._dayOfIncidentSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('day') }
    if (this.SearchByTwo == 'Particular Month') { this.resetToDefaultSearch(); this._monthOfIncidentSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('month') }
    if (this.SearchByTwo == 'Particular Year') { this.resetToDefaultSearch(); this._yearOfIncidentSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('year') }
    if (this.SearchByTwo == 'Year Range') { this.resetToDefaultSearch(); this._yearRangeSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('year_range') }
    if (this.SearchByTwo == 'Date Range') { this.resetToDefaultSearch(); this._dateRangeSearch = '1'; this.resetToDefaultSearchParams(); this.setSecondary_firstParam_search('date_range') }

    // Push Filter Name to Visualize Global Store
    this.vsData.changeFilterNames(`${this.SearchBy}, ${this.SearchByTwo} and ${this.SearchByThree}`);
  }

  filterByThree(filterValueThree) {
    this.SearchByThree = filterValueThree;

    if (this.SearchByThree == 'None') { this.partial_resetToDefaultSearch(); this.setSecondary_secondParam_search(''); }
    if (this.SearchByThree == 'Has Casualty') { this.partial_resetToDefaultSearch(); this.setSecondary_secondParam_search('casualtyExist') }
    if (this.SearchByThree == '3rd Party Caller') { this.partial_resetToDefaultSearch(); this.setSecondary_secondParam_search('onBehalf') }
    if (this.SearchByThree == 'Patrol Supervisor') { this.partial_resetToDefaultSearch(); this._hasPatrolTeamSearch = '2'; this.setSecondary_secondParam_search('patrolSupervisor'); }
    if (this.SearchByThree == 'Incident Type') { this.partial_resetToDefaultSearch(); this._incidentTypeSearch = '2'; this.setSecondary_secondParam_search('incidentType'); }
    if (this.SearchByThree == 'Casualty Level') { this.partial_resetToDefaultSearch(); this._casualityLevelSearch = '2'; this.setSecondary_secondParam_search('incidentType'); }
    // if (this.SearchByThree == 'Created By') { this.partial_resetToDefaultSearch(); }
    if (this.SearchByThree == 'Particular Day') { this.partial_resetToDefaultSearch(); this._dayOfIncidentSearch = '2'; this.setSecondary_secondParam_search('day'); }
    if (this.SearchByThree == 'Particular Month') { this.partial_resetToDefaultSearch(); this._monthOfIncidentSearch = '2'; this.setSecondary_secondParam_search('month'); }
    if (this.SearchByThree == 'Particular Year') { this.partial_resetToDefaultSearch(); this._yearOfIncidentSearch = '2'; this.setSecondary_secondParam_search('year'); }
    if (this.SearchByThree == 'Year Range') { this.partial_resetToDefaultSearch(); this._yearRangeSearch = '2'; this.setSecondary_secondParam_search('year_range'); }
    if (this.SearchByThree == 'Date Range') { this.partial_resetToDefaultSearch(); this._dateRangeSearch = '2'; this.setSecondary_secondParam_search('date_range'); }

    // Push Filter Name to Visualize Global Store
    this.vsData.changeFilterNames(`${this.SearchBy}, ${this.SearchByTwo} and ${this.SearchByThree}`);
  }

  getIncidentTypes() {
    const data = {
      name: 'getAllIncidentTypes',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this.genericService.getAll(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        if (temp) this._incidentTypes = temp;
        this.createForm;
      }, (err) => {
        console.log(err);
        // this.popToast('error', 'Failed to Display Incident Types', 'Oops! Something went wrong. Try again');
      });
  }

  getAllCasualityLevel() {
    const data = {
      name: 'getAllCasualtyLevel',
      param: {
        limit: 70000,
        page: 1
      }
    }
    this.genericService.getAll(data).subscribe(
      res => {
        console.log(res);
        let temp: any = res;
        if (temp) this._casualtyLevels = temp;
        this.createForm;
      }, (err) => {
        console.log(err);
        // this.popToast('error', 'Failed to Display Casualty Level', 'Oops! Something went wrong. Try again');
      });
  }

  getPatrolMembers() {
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
        if (temp) this._patrolMembers = temp;
        this.createForm();
      }, (err) => {
        this._stopLoading = true;
        this.popToast('error', 'Failed to Load Patrol Members', 'Oops! Something went wrong. Try again');
      });
  }

  // Functions to be called to set the values of the Data to be Posted
  setPrimary_reportBy(value) { this._reportBy = value }
  setPrimary_reportParam(value) { this._reportParam = value }
  setPrimary_date_of_incident(value) { this._date_of_incident = value }
  setPrimary_rangeFrom(value) { this._rangeFrom = value }
  setPrimary_rangeTo(value) { this._rangeTo = value }
  setPrimary_state(value) { this._state = value }

  // Set Report Param from Select in template
  setGenericReportParam(e) {
    console.log(e.target.value)
    this.setPrimary_reportParam(e.target.value)
    this.loadIncidentsGeneric2();
  }

  // Set Date Param from Select in template
  setGenericDateOfIncident(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this.setPrimary_date_of_incident(tempDate);
    this.loadIncidentsGeneric2();
  }

  // Set Lower Range Param from Select in template
  setGenericRangeFrom(e) {
    // Quickly assign default values to avoid errors
    if (!this._rangeFrom) this._rangeFrom = '2018-01-12';
    if (!this._rangeTo) this._rangeTo = '2018-12-12';

    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this.setPrimary_rangeFrom(tempDate);
    this.loadIncidentsGeneric2();
  }

  // Set Higer Range Param from Select in template
  setGenericRangeTo(e) {
    // Quickly assign default values to avoid errors
    if (!this._rangeFrom) this._rangeFrom = '2018-01-12';
    if (!this._rangeTo) this._rangeTo = '2018-12-12';

    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this.setPrimary_rangeTo(tempDate);
    this.loadIncidentsGeneric2();
  }

  // Resetting all Filter values to Empty String. This hids all secondary filters
  resetToDefault() {
    this._allIncidents = '';
    this._incidentSearch = '';
    this._openIncidents = '';
    this._closedIncidents = '';
    this._withCasuality = '';
    this._casualityLevel = '';
    this._thirdPartyCaller = '';
    this._hasPatrolTeam = '';
    this._incidentType = '';
    this._dayOfIncident = '';
    this._monthOfIncident = '';
    this._yearOfIncident = '';
    this._yearRange = '';
    this._dateRange = '';
    this._createBy = '';
  }

  // Resetting Actual values to be sent
  resetToDefaultPrimaryParams() {
    this._reportBy = '';
    this._reportParam = '';
    this._date_of_incident = '';
    this._rangeFrom = '';
    this._rangeTo = '';
    this._state = '';
  }

  // Functions to be called to set the values of the Data to be Posted
  setSecondary_firstParam_search(value) { this._firstParam_search = value }
  setSecondary_secondParam_search(value) { this._secondParam_search = value }
  setSecondary_date_of_incident_search(value) { this._date_of_incident_search = value }
  setSecondary_patrolSupervisor_search(value) { this._patrolSupervisor_search = value }
  setSecondary_rangeFrom_search(value) { this._rangeFrom_search = value }
  setSecondary_rangeTo_search(value) { this._rangeTo_search = value }
  setSecondary_casualtyLevel_search(value) { this._casualtyLevel_search = value }
  setSecondary_incidentType_search(value) { this._incidentType_search = value }
  setSecondary_state_search(value) { this._state_search = value }
  setSecondary_createdBy_search(value) { this._createdBy_search = value }

  // Set First Param Search from Select in template
  setGenericFirstParamSearch(e) {
    console.log(e.target.value)
    this.setSecondary_firstParam_search(e.target.value)
    // this.loadGenericSearch();
  }
  // Set Second Param Search
  setGenericDOISearch(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this.setSecondary_date_of_incident_search(tempDate)
    // this.loadGenericSearch();
  }
  // Set Second Param Search
  setGenericSecondParamSearch(e) {
    console.log(e.target.value)
    this.setSecondary_secondParam_search(e.target.value)
    // this.loadGenericSearch();
  }
  // Set Patrol Supervisor Search
  setGenericPatrolSupervisorSearch(e) {
    console.log(e.target.value)
    this.setSecondary_patrolSupervisor_search(e.target.value)
    // this.loadGenericSearch();
  }
  // Set Range From Search
  setGenericRangeFromSearch(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this.setSecondary_rangeFrom_search(tempDate)
    // this.loadGenericSearch();
  }
  // Set Range To Search
  setGenericRangeToSearch(e) {
    let tempDate = this.datePipe.transform(e.target.value, 'yyyy-MM-dd');
    console.log(tempDate);
    this.setSecondary_rangeTo_search(tempDate)
    // this.loadGenericSearch();
  }
  // Set Casualty Level Search
  setGenericCasualtyLevelSearch(e) {
    console.log(e.target.value)
    this.setSecondary_casualtyLevel_search(e.target.value)
    // this.loadGenericSearch();
  }
  // Set Incident Type Search
  setGenericIncidentTypeSearch(e) {
    console.log(e.target.value)
    this.setSecondary_incidentType_search(e.target.value)
    // this.loadGenericSearch();
  }
  // Set State Search
  setGenericSateSearch(e) {
    console.log(e.target.value)
    this.setSecondary_state_search(e.target.value)
    // this.loadGenericSearch();
  }
  // Set Created By Search
  setGenericCreatedBySearch(e) {
    console.log(e.target.value)
    this.setSecondary_createdBy_search(e.target.value)
    // this.loadGenericSearch();
  }

  // Resetting all Search Filter values to Empty String. This hids all tetiary filters
  resetToDefaultSearch() {
    this._allIncidentsSearch = '';
    this._incidentSearchSearch = '';
    this._openIncidentsSearch = '';
    this._closedIncidentsSearch = '';
    this._withCasualitySearch = '';
    this._casualityLevelSearch = '';
    this._thirdPartyCallerSearch = '';
    this._hasPatrolTeamSearch = '';
    this._incidentTypeSearch = '';
    this._dayOfIncidentSearch = '';
    this._monthOfIncidentSearch = '';
    this._yearOfIncidentSearch = '';
    this._yearRangeSearch = '';
    this._dateRangeSearch = '';
    this._createBySearch = '';

    // Also Reset Filter Three Values
    this.SearchByThree = 'None';
    this.filterByThree('None');
  }
  // Resetting Actual values to be sent
  resetToDefaultSearchParams() {
    this._date_of_incident_search = '';
    this._patrolSupervisor_search = '';
    this._rangeFrom_search = '';
    this._rangeTo_search = '';
    this._firstParam_search = '';
    this._secondParam_search = '';
    this._casualtyLevel_search = '';
    this._incidentType_search = '';
    this._state_search = '';
    this._createdBy_search = '';
  }

  // Resetting Filters only when set by tetiary/third search select
  partial_resetToDefaultSearch() {
    if (this._incidentTypeSearch == '2') this._incidentTypeSearch = '';
    if (this._casualityLevelSearch == '2') this._casualityLevelSearch = '';
    if (this._dayOfIncidentSearch == '2') this._dayOfIncidentSearch = '';
    if (this._monthOfIncidentSearch == '2') this._monthOfIncidentSearch = '';
    if (this._yearOfIncidentSearch == '2') this._yearOfIncidentSearch = '';
    if (this._yearRangeSearch == '2') this._yearRangeSearch = '';
    if (this._dateRangeSearch == '2') this._dateRangeSearch = '';
    if (this._hasPatrolTeamSearch == '2') this._hasPatrolTeamSearch = '';
  }

  adjustTableRows(adjustedValue) {
    this._items = adjustedValue;
    this._incidents = '';
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
    this._incidents = '';
    this._stopLoading = false;
    this.load();
  }

  load() {
    const data = {
      name: 'getAllIncidents',
      param: {
        limit: this._items,
        page: this.p
      }
    }
    this._incidents = '';
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
              this._incidents = res;
              if (this._incidents.reponse.responseData.length) {
                this.notFound = false;
                this.total = this._incidents.reponse.responseData[0].totalRows;

                // Push Table Data to VisualizeData Store
                this.vsData.changeTableData(this._incidents);
                this.vsData.changeFilterValues(data.param);
                this.vsData.changeNumberOfItems(this._incidents.reponse.responseData.length);
                this.vsData.changeItemTotal(this.total);
              }
              else console.log('No data yet in database', this._incidents);
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

  loadIncidentsGeneric1(key) {
    const data = {
      name: key,
      param: {
        limit: this._items,
        page: this.p
      }
    }
    this._incidents = '';
    this._stopLoading = false;

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
              this._incidents = res;
              if (this._incidents.reponse.responseData.length) {
                this.notFound = false;
                this.total = this._incidents.reponse.responseData[0].totalRows;
                // Push Table Data to VisualizeData Store
                this.vsData.changeTableData(this._incidents);
                // Push Table Value to VisualizeData Global Store
                this.vsData.changeFilterValues(data.param);
              }
              else console.log('No data yet in database', this._incidents);
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

  loadIncidentsGeneric2() {
    const data = {
      name: 'getAllIncidentReports',
      param: {
        reportBy: this._reportBy,
        reportParam: this._reportParam,
        date_of_incident: this._date_of_incident,
        rangeFrom: this._rangeFrom,
        rangeTo: this._rangeTo,
        state: this._state,
        limit: this._items,
        page: this.p
      }
    }
    this._incidents = '';
    this._stopLoading = false;

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
              this._incidents = res;
              if (this._incidents.reponse.responseData.length) {
                this.notFound = false;
                this.total = this._incidents.reponse.responseData[0].totalRows;
                // Push Table Data to VisualizeData Global Store
                this.vsData.changeTableData(this._incidents);
                // Push Table Value to VisualizeData Global Store
                this.vsData.changeFilterValues(data.param);
              }
              else console.log('No data yet in database', this._incidents);
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
        name: 'searchIncident',
        param: {
          date_of_incident: this._date_of_incident_search,
          patrolSupervisor: this._patrolSupervisor_search,
          rangeFrom: this._rangeFrom_search,
          rangeTo: this._rangeTo_search,
          firstParam: this._firstParam_search,
          secondParam: this._secondParam_search,
          casualtyLevel: this._casualtyLevel_search,
          incidentType: this._incidentType_search,
          state: this._state_search,
          limit: this._items,
          page: this.p,
          createdBy: this._createdBy_search,
          keyword: term
        }
      }
      this._incidents = '';
      this._stopLoading = false;
      // Assigning Search 'FirstParam' to casualtyExist for Safety
      if (data.param.firstParam == '') this.setSecondary_firstParam_search('casualtyExist');

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
                this._incidents = res;
                if (this._incidents.reponse.responseData.length) {
                  this.notFound = false;
                  this.total = this._incidents.reponse.responseData[0].totalRows;
                  // Push Table Data to VisualizeData Global Store
                  this.vsData.changeTableData(this._incidents);
                  // Push Table Value to VisualizeData Global Store
                  this.vsData.changeFilterValues(data.param);
                }
                else console.log('No data yet in database', this._incidents);
              }
            }
          }
        }, (err) => {
          console.log(err);
          this._stopLoading = true;
          this.notFound = false;
          this.popToast('error', 'Failed to Retrieve Incidents', 'Oops! Something went wrong. Try again');
        });
    } else this.popToast('warning', 'Keyword is Required!', 'A keyword is requires for a successful search.');
  }

  createForm() {
    this.incidentControlForm = this.fb.group({
      casualtyLevel: this.fb.control(''),
      incidentType: this.fb.control(''),
      patrolTeamSupervisor: this.fb.control(''),
      dayOfIncident: this.fb.control(''),
      lowerRange: this.fb.control(''),
      higherRange: this.fb.control('')
    });
  }
  createFormSearch() {
    this.incidentControlFormSearch = this.fb.group({
      casualtyLevelSearch: this.fb.control(''),
      incidentTypeSearch: this.fb.control(''),
      dayOfIncidentSearch: this.fb.control(''),
      lowerRangeSearch: this.fb.control(''),
      higherRangeSearch: this.fb.control(''),
      patrolSupervisorSearch: this.fb.control('')
    });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    this._incidents = '';
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
