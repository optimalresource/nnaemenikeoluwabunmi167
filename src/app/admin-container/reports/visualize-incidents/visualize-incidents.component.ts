import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';
import { VisualizeDataService } from './../../../services/visualize-data.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as chartsData from '../../../models/config/ngx-charts.config';

@Component({
  selector: 'app-visualize-incidents',
  templateUrl: './visualize-incidents.component.html',
  styleUrls: ['./visualize-incidents.component.css']
})
export class VisualizeIncidentsComponent implements OnInit {
  chartType = 'Vertical Bar Chart';
  // data goes here
  public single = [];
  public multi = [];

  _verticalBarChart = null;
  _horizontalBarChart = null;
  _groupedVerticalBarChart = null;
  _groupedHorizontalBarChart = null;
  _stackedVerticalBarChart = null;
  _pieChart = null;
  _advancedPieChart = null;
  _lineChart = null;
  _areaChart = null;

  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  view: any[];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Incident Types'
  showXAxisLabel = true;
  xAxisLabel = 'Town';
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

  fetchedData = null;
  fetchedFilterNames = null;
  fetchedFilterValues = null;
  fetchedNumberOfItems = null;
  fetchedItemTotal = null;

  dynamicSearchKey;

  constructor(toasterService: ToasterService, private location: Location, private vsData: VisualizeDataService, public router: Router) {
    this.view = [innerWidth / 1.4, 400];

    this.vsData.currentTableData.subscribe(data => this.fetchedData = data);
    this.vsData.currentFilterNames.subscribe(data => this.fetchedFilterNames = data);
    this.vsData.currentFilterValues.subscribe(data => this.fetchedFilterValues = data);
    this.vsData.currentNumberOfItems.subscribe(data => this.fetchedNumberOfItems = data);
    this.vsData.currentItemTotal.subscribe(data => this.fetchedItemTotal = data);

    this.toasterService = toasterService;
  }

  ngOnInit() {
    this._verticalBarChart = 1;
    // Redirect Back if not data to visualize
    if (!this.fetchedData.reponse) {
      this.router.navigate(['/admin/reports/incident/table'])
    } else {
      this.morphingDataStructureSingle();
      this.morphingDataStructureMulti();
    }
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

  goBack() {
    this.location.back();
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.4, 400];
  }

  onSelect(event) {
    console.log(event);
    if (typeof event == 'string') this.popToast('success', event, 'This is a quick preview!');
    if (typeof event == 'object') this.popToast('success', `Name: ${event.name}, Value: ${event.value}, ${this.xAxisLabel}: ${event.series}`, 'This is a quick preview!');
  }

  resetShowingChartType() {
    this._verticalBarChart = null;
    this._horizontalBarChart = null;
    this._groupedVerticalBarChart = null;
    this._groupedHorizontalBarChart = null;
    this._stackedVerticalBarChart = null;
    this._pieChart = null;
    this._advancedPieChart = null;
    this._lineChart = null;
    this._areaChart = null;
  }

  morphChartType(value) {
    this.chartType = value;
    if (this.chartType == 'Vertical Bar Chart') { this.resetShowingChartType(); this._verticalBarChart = 1 }
    if (this.chartType == 'Horizontal Bar Chart') { this.resetShowingChartType(); this._horizontalBarChart = 1 }
    if (this.chartType == 'Grouped Vertical Bar Chart') { this.resetShowingChartType(); this._groupedVerticalBarChart = 1 }
    if (this.chartType == 'Grouped Horizontal Bar Chart') { this.resetShowingChartType(); this._groupedHorizontalBarChart = 1 }
    if (this.chartType == 'Stacked Vertical Bar Chart') { this.resetShowingChartType(); this._stackedVerticalBarChart = 1 }
    if (this.chartType == 'Pie Chart') { this.resetShowingChartType(); this._pieChart = 1 }
    if (this.chartType == 'Advanced Pie Chart') { this.resetShowingChartType(); this._advancedPieChart = 1 }
    if (this.chartType == 'Line Chart') { this.resetShowingChartType(); this._lineChart = 1 }
    if (this.chartType == 'Area Chart') { this.resetShowingChartType(); this._areaChart = 1 }
  }

  changeXAxisTitle(value) {
    this.xAxisLabel = value;
    this.morphingDataStructureMulti();
  }

  morphingDataStructureSingle() {
    if (this.fetchedData.reponse) {
      // Get New Array of Unique Incident Types from Primary Data Source
      var flags = [], output: any = [], l = this.fetchedData.reponse.responseData.length, i;
      for (i = 0; i < l; i++) {
        if (flags[this.fetchedData.reponse.responseData[i].incidentType]) continue;
        flags[this.fetchedData.reponse.responseData[i].incidentType] = true;
        output.push(this.fetchedData.reponse.responseData[i].incidentType);
      }
      console.log(output);
      // Get New Array of Incident Types counts
      var count: any = [], len = output.length, j;
      for (j = 0; j < len; j++) {
        var temp = this.fetchedData.reponse.responseData.reduce((acc, cur) => cur.incidentType === output[j] ? ++acc : acc, 0);
        count.push(temp);
      }
      console.log(count);
      // Merge both Unique Incident Types Array and Counts Array
      var result = [];
      output.forEach((op, i) => result[i] = { "name": op, "value": count[i] });
      console.log(result);
      // Pass Result to SINGLE graph data source
      this.single = result;
    }
  }

  morphingDataStructureMulti() {
    if (this.fetchedData.reponse) {

      // Get Unique Search Key Names and Return Array
      var flags = [], output: any = [], l = this.fetchedData.reponse.responseData.length, i;

      // Transforming Data based on Selected Axis Name
      if (this.xAxisLabel == "Date of Incident") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].dateOfIncident]) continue;
          flags[this.fetchedData.reponse.responseData[i].dateOfIncident] = true;
          output.push(this.fetchedData.reponse.responseData[i].dateOfIncident);
        }
      }
      if (this.xAxisLabel == "Status") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].status]) continue;
          flags[this.fetchedData.reponse.responseData[i].status] = true;
          output.push(this.fetchedData.reponse.responseData[i].status);
        }
      }
      if (this.xAxisLabel == "Staff") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].staffId]) continue;
          flags[this.fetchedData.reponse.responseData[i].staffId] = true;
          output.push(this.fetchedData.reponse.responseData[i].staffId);
        }
      }
      if (this.xAxisLabel == "Patrol Supervisor") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].patrolSupervisor]) continue;
          flags[this.fetchedData.reponse.responseData[i].patrolSupervisor] = true;
          output.push(this.fetchedData.reponse.responseData[i].patrolSupervisor);
        }
      }
      if (this.xAxisLabel == "Caller Name") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].callerName]) continue;
          flags[this.fetchedData.reponse.responseData[i].callerName] = true;
          output.push(this.fetchedData.reponse.responseData[i].callerName);
        }
      }
      if (this.xAxisLabel == "Town") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].town]) continue;
          flags[this.fetchedData.reponse.responseData[i].town] = true;
          output.push(this.fetchedData.reponse.responseData[i].town);
        }
      }
      if (this.xAxisLabel == "LGA") {
        for (i = 0; i < l; i++) {
          if (flags[this.fetchedData.reponse.responseData[i].lga]) continue;
          flags[this.fetchedData.reponse.responseData[i].lga] = true;
          output.push(this.fetchedData.reponse.responseData[i].lga);
        }
      }
      console.log(output);

      // Get Unique Incident Type Names and Return Array
      var flags1 = [], output1: any = [], l = this.fetchedData.reponse.responseData.length, i;
      for (i = 0; i < l; i++) {
        if (flags1[this.fetchedData.reponse.responseData[i].incidentType]) continue;
        flags1[this.fetchedData.reponse.responseData[i].incidentType] = true;
        output1.push(this.fetchedData.reponse.responseData[i].incidentType);
      }
      console.log(output1);

      var finalOutput: any = [];
      var incidentTypes: any = [];
      var count: any = [];
      // Assign All Incident to their respective Search Keys
      output.forEach((op, i) => {
        var len = this.fetchedData.reponse.responseData.length, k;
        for (k = 0; k < len; k++) {
          let checkThis;

          if (this.xAxisLabel == "Date of Incident") { checkThis = this.fetchedData.reponse.responseData[k].dateOfIncident == op }
          if (this.xAxisLabel == "Status") { checkThis = this.fetchedData.reponse.responseData[k].status == op }
          if (this.xAxisLabel == "Staff") { checkThis = this.fetchedData.reponse.responseData[k].staffId == op }
          if (this.xAxisLabel == "Patrol Supervisor") { checkThis = this.fetchedData.reponse.responseData[k].patrolSupervisor == op }
          if (this.xAxisLabel == "Caller Name") { checkThis = this.fetchedData.reponse.responseData[k].callerName == op }
          if (this.xAxisLabel == "Town") { checkThis = this.fetchedData.reponse.responseData[k].town == op }
          if (this.xAxisLabel == "LGA") { checkThis = this.fetchedData.reponse.responseData[k].lga == op }

          if (checkThis) {
            output1.forEach((op1, j) => {
              var temp = this.fetchedData.reponse.responseData.reduce((acc, cur) => cur.incidentType === op1 ? ++acc : acc, 0);
              count.push(temp)
              if (this.fetchedData.reponse.responseData[k].incidentType == op1) {
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

      console.log(finalOutput)
      // Pass Result to SINGLE graph data source
      this.multi = finalOutput;
    }

  }

  // Extra Card Controls
  _toggleExpand = false;
  _toggleExpandIcon = true;
  _toggleCollapse = true;
  _toggleCollapseIcon = false;
  _stopLoading = false;

  reload() {
    // this._incidents = '';
    this._stopLoading = false;
    // this.load();
  }

  expand() {
    this._toggleExpand = !this._toggleExpand;
    this._toggleExpandIcon = !this._toggleExpandIcon;
    // this.view = [1200, 800];
  }

  collapse() {
    this._toggleCollapse = !this._toggleCollapse;
    this._toggleCollapseIcon = !this._toggleCollapseIcon;
  }

}
