import { AuthService } from './../../services/auth.service';
import { DatePipe } from '@angular/common';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from './../../services/generic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  _casualtyLvlTotal;
  _patrolTeamTotal;
  _reportIncidentTotal = 0;
  _mgsTotal;
  _resolvedIncidentTotal;
  _incidentTypesTotal;
  _openIncidentTotal;

  _incidents;
  _incidents1;
  _vStaffID

  notFound = false;
  p: number = 1;
  total: number = 10;
  _items: number = 10;

  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  view: any[];
  public multi = [];
  public single = [];
  staffTableData;

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Incident Types'
  showXAxisLabel = true;
  xAxisLabel = 'Staff';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '427fed', 'f8e272', 'cc0000', '885418', '666666', '762ca7', 'f84e8b', '2e62a8', '4b8598']
  };

  // line, area
  autoScale = true;

  //pie
  showLabels = true;
  explodeSlices = false;
  doughnut = true;

  constructor(public genericService: GenericService,
    public route: ActivatedRoute,
    toasterService: ToasterService,
    public router: Router,
    private datePipe: DatePipe,
    public auth: AuthService, ) {

    this.view = [360 / 1.4, 340];
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getAllCasualityLevels();
    this.getAllIncidentsThisYear();
    this.getAllPatrolTeams();

    this.loadAllIncidents();
    this.loadAllResolvedIncidents();
    this.loadAllOpenIncidents();
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

  onResize(event) {
    // this.view = [event.target.innerWidth / 1.4, 400];
    this.view = [360 / 1.4, 340];
  }

  popupIncidentName(name, occur) {
    this.popToast('success', `Incident Name: ${name}`, `Occurance: ${occur}`);
  }

  getAllCasualityLevels() {
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
        if (temp) this._casualtyLvlTotal = temp.reponse.responseData[0].totalRows;
      }, (err) => {
        console.log(err);
        // this.popToast('error', 'Failed to Display Casualty Level', 'Oops! Something went wrong. Try again');
      });
  }

  getAllPatrolTeams() {
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
        if (temp) this._patrolTeamTotal = temp.reponse.responseData[0].totalRows;
      }, (err) => {
        this._stopLoading = true;
        // this.popToast('error', 'Failed to Load Patrol Teams', 'Oops! Something went wrong. Try again');
      });
  }


  morphingDataStructureMulti() {
    if (this._incidents.reponse) {

      // Get Unique Search Key Names and Return Array
      var flags = [], output: any = [], l = this._incidents.reponse.responseData.length, i;

      // Transforming Data based on Selected Axis Name
      if (this.xAxisLabel == "Staff") {
        for (i = 0; i < l; i++) {
          if (flags[this._incidents.reponse.responseData[i].staffId]) continue;
          flags[this._incidents.reponse.responseData[i].staffId] = true;
          output.push(this._incidents.reponse.responseData[i].staffId);
        }
      }
      console.log(output);

      // Get Unique Incident Type Names and Return Array
      var flags1 = [], output1: any = [], l = this._incidents.reponse.responseData.length, i;
      for (i = 0; i < l; i++) {
        if (flags1[this._incidents.reponse.responseData[i].incidentType]) continue;
        flags1[this._incidents.reponse.responseData[i].incidentType] = true;
        output1.push(this._incidents.reponse.responseData[i].incidentType);
      }
      console.log(output1);

      var finalOutput: any = [];
      var incidentTypes: any = [];
      var count: any = [];
      // Assign All Incident to their respective Search Keys
      output.forEach((op, i) => {
        var len = this._incidents.reponse.responseData.length, k;
        for (k = 0; k < len; k++) {
          let checkThis;

          if (this.xAxisLabel == "Staff") { checkThis = this._incidents.reponse.responseData[k].staffId == op }

          if (checkThis) {
            output1.forEach((op1, j) => {
              var temp: any = this._incidents.reponse.responseData.reduce((acc, cur) => cur.incidentType === op1 ? ++acc : acc, 0);
              count.push(temp)
              if (this._incidents.reponse.responseData[k].incidentType == op1) {
                incidentTypes[j] = { "name": op, "series": [{ "name": op1, "value": count[j] }] }
              }
            });
          }
        }
      });
      console.log(incidentTypes);

      // Merge All Object With the Same Search Keys
      incidentTypes.forEach((item) => {
        var existing = finalOutput.filter((v, i) => {

          return v.name == item.name;
        });
        console.log(existing);
        if (existing.length) {
          var existingIndex = finalOutput.indexOf(existing[0]);
          console.log(existingIndex);
          finalOutput[existingIndex].series = finalOutput[existingIndex].series.concat(item.series);
        } else {
          if (typeof item.series == 'string')
            item.series = [item.series];
          finalOutput.push(item);
        }
      });

      console.log("finalOutput", finalOutput);
      // Pass Result to SINGLE graph data source
      this.staffTableData = finalOutput;
      // this.multi = this.staffTableData;
      this.setSingleData('AD-6878');
    }
  }

  setSingleData(staffID) {
    if (this._vStaffID == staffID) {
      this.popToast('warning', 'Already Being Visualized ', 'Staff Data is already being visualized on canvas');
    } else {
      if (this.staffTableData) {
        for (let i = 0; i < this.staffTableData.length; i++) {
          console.log(staffID);
          if (this.staffTableData[i].name == staffID) {
            // this.multi = this.staffTableData[i];
            this.single = this.staffTableData[i].series;
            this._vStaffID = staffID
            console.log(this.single);
          }
        }
      }
    }
  }

  getAllIncidentsThisYear() {
    let date: Date = new Date();
    let tempDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Huh', tempDate);

    const data = {
      name: 'getAllIncidentReports',
      param: {
        reportBy: "year",
        reportParam: "",
        date_of_incident: tempDate,
        rangeFrom: "",
        rangeTo: "",
        state: "",
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
                // Change the data structure to display in chart
                this.morphingDataStructureMulti();
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

  loadAllIncidents() {
    const data = {
      name: 'getAllIncidents',
      param: {
        limit: 70000,
        page: 1
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
              // this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
            } else {
              let temp: any = res;
              if (temp.reponse.responseData.length) {
                this.notFound = false;
                this._reportIncidentTotal = temp.reponse.responseData[0].totalRows;
              }
              else console.log('No data yet in database', temp);
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.notFound = false;
        // this.popToast('error', 'Failed to Retrieve Incidents', 'Oops! Something went wrong. Try again');
      });
  }

  loadAllResolvedIncidents() {
    const data = {
      name: 'getAllClosedIncidents',
      param: {
        limit: 70000,
        page: 1
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
              // this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
            } else {
              let temp: any = res;
              if (temp.reponse.responseData.length) {
                this.notFound = false;
                this._resolvedIncidentTotal = temp.reponse.responseData[0].totalRows;
              }
              else console.log('No data yet in database', temp);
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.notFound = false;
        // this.popToast('error', 'Failed to Retrieve Close Incidents', 'Oops! Something went wrong. Try again');
      });
  }

  loadAllOpenIncidents() {
    const data = {
      name: 'getAllOpenIncidents',
      param: {
        limit: 70000,
        page: 1
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
              // this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
            } else {
              let temp: any = res;
              if (temp.reponse.responseData.length) {
                this.notFound = false;
                this._openIncidentTotal = temp.reponse.responseData[0].totalRows;
              }
              else console.log('No data yet in database', temp);
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.notFound = false;
        // this.popToast('error', 'Failed to Retrieve Open Incidents', 'Oops! Something went wrong. Try again');
      });
  }

  loadAllIncidentsTypes() {
    const data = {
      name: 'getAllIncidentTypes',
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
              // this.popToast('warning', 'No Such Records Yet!', 'Oops! You do not have any records in the database');
            } else {
              let temp: any = res;
              if (temp.reponse.responseData.length) {
                this.notFound = false;
                this._incidentTypesTotal = temp.reponse.responseData[0].totalRows;
              }
              else console.log('No data yet in database', temp);
            }
          }
        }
      }, (err) => {
        console.log(err);
        this._stopLoading = true;
        this.notFound = false;
        // this.popToast('error', 'Failed to Retrieve Incident Types', 'Oops! Something went wrong. Try again');
      });
  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    // this._incidents = '';
    // this._stopLoading = false;
    // this.load();
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
