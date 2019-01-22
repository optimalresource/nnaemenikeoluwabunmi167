import { ErrorInterceptorService } from './services/interceptors/error-interceptor.service';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatProgressSpinnerModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { TimepickerModule } from 'ngx-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './admin-container/dashboard/dashboard.component';
import { ReportIncidentComponent } from './admin-container/incident/report-incident/report-incident.component';
import { IncidentFormsComponent } from './admin-container/incident/incident-forms/incident-forms.component';
import { EntryComponent } from './admin-container/incident/entry/entry.component';
import { AddUserRoleComponent } from './admin-container/user/user-role/add-user-role/add-user-role.component';
import { AllUserRolesComponent } from './admin-container/user/user-role/all-user-roles/all-user-roles.component';
import { UserRoleDetailsComponent } from './admin-container/user/user-role/user-role-details/user-role-details.component';
import { AddUserComponent } from './admin-container/user/users/add-user/add-user.component';
import { AllUsersComponent } from './admin-container/user/users/all-users/all-users.component';
import { UserDetailsComponent } from './admin-container/user/users/user-details/user-details.component';
import { EditUserRoleComponent } from './admin-container/user/user-role/edit-user-role/edit-user-role.component';
import { AddIncidentTypeComponent } from './admin-container/incident-type/add-incident-type/add-incident-type.component';
import { EditIncidentTypeComponent } from './admin-container/incident-type/edit-incident-type/edit-incident-type.component';
import { AllIncidentTypesComponent } from './admin-container/incident-type/all-incident-types/all-incident-types.component';
import { IncidentTypeDetailsComponent } from './admin-container/incident-type/incident-type-details/incident-type-details.component';
import { EditCasualtyComponent } from './admin-container/casualties/edit-casualty/edit-casualty.component';
import { AddCasualtyComponent } from './admin-container/casualties/add-casualty/add-casualty.component';
import { CasualtyDetailsComponent } from './admin-container/casualties/casualty-details/casualty-details.component';
import { AllCasualtiesComponent } from './admin-container/casualties/all-casualties/all-casualties.component';
import { AddBranchComponent } from './admin-container/office-branch/add-branch/add-branch.component';
import { EditBranchComponent } from './admin-container/office-branch/edit-branch/edit-branch.component';
import { AllBranchesComponent } from './admin-container/office-branch/all-branches/all-branches.component';
import { BranchDetailsComponent } from './admin-container/office-branch/branch-details/branch-details.component';
import { AddStaffComponent } from './admin-container/staff/add-staff/add-staff.component';
import { EditStaffComponent } from './admin-container/staff/edit-staff/edit-staff.component';
import { StaffDetailsComponent } from './admin-container/staff/staff-details/staff-details.component';
import { StaffSearchComponent } from './admin-container/staff/staff-search/staff-search.component';
import { AddPositionComponent } from './admin-container/positions/add-position/add-position.component';
import { AllPositionsComponent } from './admin-container/positions/all-positions/all-positions.component';
import { EditPositionComponent } from './admin-container/positions/edit-position/edit-position.component';
import { PositionDetailsComponent } from './admin-container/positions/position-details/position-details.component';
import { AddPatrolMemberComponent } from './admin-container/patrol-member/add-patrol-member/add-patrol-member.component';
import { EditPatrolMemberComponent } from './admin-container/patrol-member/edit-patrol-member/edit-patrol-member.component';
import { AllPatrolMembersComponent } from './admin-container/patrol-member/all-patrol-members/all-patrol-members.component';
import { PatrolMemberDetailsComponent } from './admin-container/patrol-member/patrol-member-details/patrol-member-details.component';
import { AddPatrolTeamComponent } from './admin-container/patrol-team/add-patrol-team/add-patrol-team.component';
import { EditPatrolTeamComponent } from './admin-container/patrol-team/edit-patrol-team/edit-patrol-team.component';
import { AllPatrolTeamsComponent } from './admin-container/patrol-team/all-patrol-teams/all-patrol-teams.component';
import { PatrolTeamDetailsComponent } from './admin-container/patrol-team/patrol-team-details/patrol-team-details.component';
import { DatePipe } from '@angular/common';
import { UpdateIncidentComponent } from './admin-container/incident/update-incident/update-incident.component';
import { IncidentDetailsComponent } from './admin-container/incident/incident-details/incident-details.component';
import { AddUpdateToIncidentComponent } from './admin-container/incident/add-update-to-incident/add-update-to-incident.component';
import { StaffIncidentHistoryComponent } from './admin-container/incident/staff-incident-history/staff-incident-history.component';
import { AllIncidentsComponent } from 'src/app/admin-container/reports/all-incidents/all-incidents.component';
import { EditIncidentComponent } from './admin-container/incident/edit-incident/edit-incident.component';
import { VisualizeIncidentsComponent } from './admin-container/reports/visualize-incidents/visualize-incidents.component';
import { IncidentStatusComponent } from './admin-container/incident/incident-status/incident-status.component';
import { AddVehicleComponent } from './admin-container/vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './admin-container/vehicle/edit-vehicle/edit-vehicle.component';
import { AllVehiclesComponent } from './admin-container/vehicle/all-vehicles/all-vehicles.component';
import { VehicleDetailsComponent } from './admin-container/vehicle/vehicle-details/vehicle-details.component';
import { AddShiftComponent } from './admin-container/shift/add-shift/add-shift.component';
import { EditShiftComponent } from './admin-container/shift/edit-shift/edit-shift.component';
import { AllShiftsComponent } from './admin-container/shift/all-shifts/all-shifts.component';
import { ShiftDetailsComponent } from './admin-container/shift/shift-details/shift-details.component';
import { AddTaskComponent } from './admin-container/task/add-task/add-task.component';
import { AllTasksComponent } from './admin-container/task/all-tasks/all-tasks.component';
import { TaskDetailsComponent } from './admin-container/task/task-details/task-details.component';
import { EditTaskComponent } from './admin-container/task/edit-task/edit-task.component';
import { ReasignTaskComponent } from './admin-container/task/reasign-task/reasign-task.component';
import { SupervisorTaskComponent } from './admin-container/task/supervisor-task/supervisor-task.component';
import { VisualizeTasksComponent } from './admin-container/task/visualize-tasks/visualize-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminContainerComponent,
    AuthComponent,
    DashboardComponent,
    ReportIncidentComponent,
    IncidentFormsComponent,
    EntryComponent,
    AddUserRoleComponent,
    AllUserRolesComponent,
    UserRoleDetailsComponent,
    AddUserComponent,
    AllUsersComponent,
    UserDetailsComponent,
    EditUserRoleComponent,
    AddIncidentTypeComponent,
    EditIncidentTypeComponent,
    AllIncidentTypesComponent,
    IncidentTypeDetailsComponent,
    EditCasualtyComponent,
    AddCasualtyComponent,
    CasualtyDetailsComponent,
    AllCasualtiesComponent,
    AddBranchComponent,
    EditBranchComponent,
    AllBranchesComponent,
    BranchDetailsComponent,
    AddStaffComponent,
    EditStaffComponent,
    StaffDetailsComponent,
    StaffSearchComponent,
    AddPositionComponent,
    AllPositionsComponent,
    EditPositionComponent,
    PositionDetailsComponent,
    AddPatrolMemberComponent,
    EditPatrolMemberComponent,
    AllPatrolMembersComponent,
    PatrolMemberDetailsComponent,
    AddPatrolTeamComponent,
    EditPatrolTeamComponent,
    AllPatrolTeamsComponent,
    PatrolTeamDetailsComponent,
    AllIncidentsComponent,
    UpdateIncidentComponent,
    IncidentDetailsComponent,
    AddUpdateToIncidentComponent,
    StaffIncidentHistoryComponent,
    EditIncidentComponent,
    VisualizeIncidentsComponent,
    IncidentStatusComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    AllVehiclesComponent,
    VehicleDetailsComponent,
    AddShiftComponent,
    EditShiftComponent,
    AllShiftsComponent,
    ShiftDetailsComponent,
    AddTaskComponent,
    AllTasksComponent,
    TaskDetailsComponent,
    EditTaskComponent,
    ReasignTaskComponent,
    SupervisorTaskComponent,
    VisualizeTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    DragDropModule,
    ToasterModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    SearchService,
    AuthService,
    ToasterService,
    DatePipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
