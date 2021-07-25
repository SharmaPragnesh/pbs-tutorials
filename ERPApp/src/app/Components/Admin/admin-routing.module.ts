import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from 'src/app/Models/user.model';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { InstitutionComponent } from './institution/institution.component';
import { SemesterListComponent } from './semester/semester-list/semester-list.component';
import { SemesterComponent } from './semester/semester.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StudyListComponent } from './study/study-list/study-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { UnapprovedFilesComponent } from './unapproved-files/unapproved-files.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'institution', component: InstitutionListComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
          { path: 'study', component: StudyListComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
          { path: 'semester', component: SemesterListComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
          { path: 'subject', component: SubjectListComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
          { path: 'user', component: UserListComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
          { path: 'unapproved-files', component: UnapprovedFilesComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
          { path: 'statistics', component: StatisticsComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
