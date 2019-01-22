import { VisualizeTasksComponent } from './admin-container/task/visualize-tasks/visualize-tasks.component';
import { SupervisorTaskComponent } from './admin-container/task/supervisor-task/supervisor-task.component';
import { ReasignTaskComponent } from './admin-container/task/reasign-task/reasign-task.component';
import { EditTaskComponent } from './admin-container/task/edit-task/edit-task.component';
import { TaskDetailsComponent } from './admin-container/task/task-details/task-details.component';
import { AllTasksComponent } from './admin-container/task/all-tasks/all-tasks.component';
import { AddTaskComponent } from './admin-container/task/add-task/add-task.component';
import { EditShiftComponent } from './admin-container/shift/edit-shift/edit-shift.component';
import { ShiftDetailsComponent } from './admin-container/shift/shift-details/shift-details.component';
import { AllShiftsComponent } from './admin-container/shift/all-shifts/all-shifts.component';
import { AddShiftComponent } from './admin-container/shift/add-shift/add-shift.component';
import { EditVehicleComponent } from './admin-container/vehicle/edit-vehicle/edit-vehicle.component';
import { VehicleDetailsComponent } from './admin-container/vehicle/vehicle-details/vehicle-details.component';
import { AllVehiclesComponent } from './admin-container/vehicle/all-vehicles/all-vehicles.component';
import { AddVehicleComponent } from './admin-container/vehicle/add-vehicle/add-vehicle.component';
import { IncidentStatusComponent } from './admin-container/incident/incident-status/incident-status.component';
import { EditIncidentComponent } from './admin-container/incident/edit-incident/edit-incident.component';
import { VisualizeIncidentsComponent } from './admin-container/reports/visualize-incidents/visualize-incidents.component';
import { StaffIncidentHistoryComponent } from './admin-container/incident/staff-incident-history/staff-incident-history.component';
import { IncidentDetailsComponent } from './admin-container/incident/incident-details/incident-details.component';
import { UpdateIncidentComponent } from './admin-container/incident/update-incident/update-incident.component';
import { PatrolTeamDetailsComponent } from './admin-container/patrol-team/patrol-team-details/patrol-team-details.component';
import { EditPatrolTeamComponent } from './admin-container/patrol-team/edit-patrol-team/edit-patrol-team.component';
import { AllPatrolTeamsComponent } from './admin-container/patrol-team/all-patrol-teams/all-patrol-teams.component';
import { AddPatrolTeamComponent } from './admin-container/patrol-team/add-patrol-team/add-patrol-team.component';
import { EditPatrolMemberComponent } from './admin-container/patrol-member/edit-patrol-member/edit-patrol-member.component';
import { PatrolMemberDetailsComponent } from './admin-container/patrol-member/patrol-member-details/patrol-member-details.component';
import { AllPatrolMembersComponent } from './admin-container/patrol-member/all-patrol-members/all-patrol-members.component';
import { AddPatrolMemberComponent } from './admin-container/patrol-member/add-patrol-member/add-patrol-member.component';
import { EditPositionComponent } from './admin-container/positions/edit-position/edit-position.component';
import { PositionDetailsComponent } from './admin-container/positions/position-details/position-details.component';
import { AllPositionsComponent } from './admin-container/positions/all-positions/all-positions.component';
import { AddPositionComponent } from './admin-container/positions/add-position/add-position.component';
import { EditStaffComponent } from './admin-container/staff/edit-staff/edit-staff.component';
import { StaffDetailsComponent } from './admin-container/staff/staff-details/staff-details.component';
import { StaffSearchComponent } from './admin-container/staff/staff-search/staff-search.component';
import { AddStaffComponent } from './admin-container/staff/add-staff/add-staff.component';
import { EditBranchComponent } from './admin-container/office-branch/edit-branch/edit-branch.component';
import { BranchDetailsComponent } from './admin-container/office-branch/branch-details/branch-details.component';
import { AllBranchesComponent } from './admin-container/office-branch/all-branches/all-branches.component';
import { AddBranchComponent } from './admin-container/office-branch/add-branch/add-branch.component';
import { EditCasualtyComponent } from './admin-container/casualties/edit-casualty/edit-casualty.component';
import { CasualtyDetailsComponent } from './admin-container/casualties/casualty-details/casualty-details.component';
import { AllCasualtiesComponent } from './admin-container/casualties/all-casualties/all-casualties.component';
import { AddCasualtyComponent } from './admin-container/casualties/add-casualty/add-casualty.component';
import { EditIncidentTypeComponent } from './admin-container/incident-type/edit-incident-type/edit-incident-type.component';
import { IncidentTypeDetailsComponent } from './admin-container/incident-type/incident-type-details/incident-type-details.component';
import { AllIncidentTypesComponent } from './admin-container/incident-type/all-incident-types/all-incident-types.component';
import { AddIncidentTypeComponent } from './admin-container/incident-type/add-incident-type/add-incident-type.component';
import { UserDetailsComponent } from './admin-container/user/users/user-details/user-details.component';
import { AllUsersComponent } from './admin-container/user/users/all-users/all-users.component';
import { AddUserComponent } from './admin-container/user/users/add-user/add-user.component';
import { EditUserRoleComponent } from './admin-container/user/user-role/edit-user-role/edit-user-role.component';
import { UserRoleDetailsComponent } from './admin-container/user/user-role/user-role-details/user-role-details.component';
import { AllUserRolesComponent } from './admin-container/user/user-role/all-user-roles/all-user-roles.component';
import { AddUserRoleComponent } from './admin-container/user/user-role/add-user-role/add-user-role.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { EntryComponent } from './admin-container/incident/entry/entry.component';
import { IncidentFormsComponent } from './admin-container/incident/incident-forms/incident-forms.component';
import { ReportIncidentComponent } from './admin-container/incident/report-incident/report-incident.component';
import { DashboardComponent } from './admin-container/dashboard/dashboard.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllIncidentsComponent } from 'src/app/admin-container/reports/all-incidents/all-incidents.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminContainerComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'incident',
        component: ReportIncidentComponent,
        children: [
          { path: '', component: EntryComponent },
          { path: 'form/:id', component: IncidentFormsComponent },
          { path: 'update', component: UpdateIncidentComponent },
          { path: 'details/:id', component: IncidentDetailsComponent },
          { path: 'history/:id', component: StaffIncidentHistoryComponent },
          { path: 'edit/:id', component: EditIncidentComponent },
          { path: 'status/:id', component: IncidentStatusComponent },
        ]
      },
      {
        path: 'user-role',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddUserRoleComponent },
          { path: 'all', component: AllUserRolesComponent },
          { path: 'details/:id', component: UserRoleDetailsComponent },
          { path: 'edit/:id', component: EditUserRoleComponent },
        ]
      },
      {
        path: 'user',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddUserComponent },
          { path: 'all', component: AllUsersComponent },
          { path: 'details/:id', component: UserDetailsComponent },
          { path: 'edit/:id', component: EditUserRoleComponent },
        ]
      },
      {
        path: 'incident-type',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddIncidentTypeComponent },
          { path: 'all', component: AllIncidentTypesComponent },
          { path: 'details/:id', component: IncidentTypeDetailsComponent },
          { path: 'edit/:id', component: EditIncidentTypeComponent },
        ]
      },
      {
        path: 'casualty',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddCasualtyComponent },
          { path: 'all', component: AllCasualtiesComponent },
          { path: 'details/:id', component: CasualtyDetailsComponent },
          { path: 'edit/:id', component: EditCasualtyComponent },
        ]
      },
      {
        path: 'branch',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddBranchComponent },
          { path: 'all', component: AllBranchesComponent },
          { path: 'details/:id', component: BranchDetailsComponent },
          { path: 'edit/:id', component: EditBranchComponent },
        ]
      },
      {
        path: 'staff',
        children: [
          { path: '', redirectTo: 'search', pathMatch: 'full' },
          { path: 'add', component: AddStaffComponent },
          { path: 'search', component: StaffSearchComponent },
          { path: 'details/:id', component: StaffDetailsComponent },
          { path: 'edit/:id', component: EditStaffComponent },
        ]
      },
      {
        path: 'position',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddPositionComponent },
          { path: 'all', component: AllPositionsComponent },
          { path: 'details/:id', component: PositionDetailsComponent },
          { path: 'edit/:id', component: EditPositionComponent },
        ]
      },
      {
        path: 'patrol-member',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddPatrolMemberComponent },
          { path: 'all', component: AllPatrolMembersComponent },
          { path: 'details/:id', component: PatrolMemberDetailsComponent },
          { path: 'edit/:id', component: EditPatrolMemberComponent },
        ]
      },
      {
        path: 'patrol-team',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddPatrolTeamComponent },
          { path: 'all', component: AllPatrolTeamsComponent },
          { path: 'details/:id', component: PatrolTeamDetailsComponent },
          { path: 'edit/:id', component: EditPatrolTeamComponent },
        ]
      },
      {
        path: 'vehicle',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddVehicleComponent },
          { path: 'all', component: AllVehiclesComponent },
          { path: 'details/:id', component: VehicleDetailsComponent },
          { path: 'edit/:id', component: EditVehicleComponent },
        ]
      },
      {
        path: 'shift',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddShiftComponent },
          { path: 'all', component: AllShiftsComponent },
          { path: 'details/:id', component: ShiftDetailsComponent },
          { path: 'edit/:id', component: EditShiftComponent },
        ]
      },
      {
        path: 'task',
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'add', component: AddTaskComponent },
          { path: 'all', component: AllTasksComponent },
          { path: 'details/:id', component: TaskDetailsComponent },
          { path: 'edit/:id', component: EditTaskComponent },
          { path: 'reassign/:id', component: ReasignTaskComponent },
          { path: 'supervisor-task', component: SupervisorTaskComponent },
          { path: 'visualize', component: VisualizeTasksComponent },
        ]
      },
      {
        path: 'reports',
        children: [
          { path: '', redirectTo: 'incident', pathMatch: 'full' },
          {
            path: 'incident',
            children: [
              { path: '', redirectTo: 'table', pathMatch: 'full' },
              { path: 'table', component: AllIncidentsComponent },
              { path: 'visualize', component: VisualizeIncidentsComponent },
            ]
          },
        ]
      },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: AuthComponent },
  { path: '**', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
