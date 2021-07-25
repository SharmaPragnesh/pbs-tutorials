//Basic Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

//User Defined Modules
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';//For Translation
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//For Translation

//User Defined Components
import { UserComponent } from './user.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MyFilesComponent } from './my-files/my-files.component';

//User Defined Directives
import { NumberDirectiveModule } from 'src/app/Directives/number.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { RatingModule } from 'ng-starrating';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';//For Datepicker
import { SharedModule } from 'src/app/Shared/shared.module';

//For Translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    UserComponent,
    AboutMeComponent,
    MonitoringComponent,
    MyFilesComponent
  ],
  imports: [
    SharedModule,//For those component need for multiple modules
    MatDialogModule,//For Popup
    FormsModule,//For Template driven forms
    ReactiveFormsModule,//For Reactive forms
    CommonModule,
    UserRoutingModule,
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
export class UserModule { }
