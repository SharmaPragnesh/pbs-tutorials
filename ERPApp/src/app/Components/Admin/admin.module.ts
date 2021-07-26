//Basic Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

//User Defined Modules
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';//For Translation
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//For Translation

//User Defined Components
import { AdminComponent } from './admin/admin.component';
import { InstitutionComponent } from './institution/institution.component';
import { InstitutionDetailComponent } from './institution/institution-detail/institution-detail.component';
import { InstitutionListComponent } from './institution/institution-list/institution-list.component';
import { StudyComponent } from './study/study.component';
import { StudyListComponent } from './study/study-list/study-list.component';
import { SemesterComponent } from './semester/semester.component';
import { SemesterListComponent } from './semester/semester-list/semester-list.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UnapprovedFilesComponent } from './unapproved-files/unapproved-files.component';
import { UserFileListComponent } from './user/user-file-list/user-file-list.component';
import { UserMonitoringListComponent } from './user/user-monitoring-list/user-monitoring-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SubjectLookupComponent } from './subject/subject-lookup/subject-lookup.component';

//User Defined Directives
import { NumberDirectiveModule } from 'src/app/Directives/number.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { RatingModule } from 'ng-starrating';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';//For Datepicker
import { SharedModule } from 'src/app/Shared/shared.module';
import { TermTypeComponent } from './study/term-type/term-type.component';
import { TermTypeListComponent } from './study/term-type-list/term-type-list.component';
import { TermTypeOptionalNameComponent } from './study/term-type-optional-name/term-type-optional-name.component';
import { CallbackPipe } from 'src/app/Pipes/callback.pipe';
import { RolesComponent } from './roles/roles.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';

//For Translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminComponent,
    InstitutionComponent,
    InstitutionDetailComponent,
    InstitutionListComponent,
    StudyComponent,
    StudyListComponent,
    SemesterComponent,
    SemesterListComponent,
    SubjectComponent,
    SubjectListComponent,
    UserComponent,
    UserListComponent,
    UnapprovedFilesComponent,
    UserFileListComponent,
    UserMonitoringListComponent,
    StatisticsComponent,
    SubjectLookupComponent,
    TermTypeComponent,
    TermTypeListComponent,
    TermTypeOptionalNameComponent,
    CallbackPipe,
    RolesComponent,
    RolesListComponent
  ],
  imports: [
    SharedModule,//For those component need for multiple modules
    MatDialogModule,//For Popup
    FormsModule,//For Template driven forms
    ReactiveFormsModule,//For Reactive forms
    CommonModule,
    AdminRoutingModule,
    TranslateModule.forRoot({//For Translation
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxPaginationModule,//For Pagination
    Ng2OrderModule,//For Sorting
    RatingModule,//For Rating 
    BsDatepickerModule.forRoot(),//For Datepicker
    NumberDirectiveModule
  ]
})
export class AdminModule { }
