//Basic Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//User Defined Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthInterceptor } from './Components/Admin/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';//For Popup window
import { ToastrModule } from 'ngx-toastr';//For show alert poup message
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';//For Translation
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//For Translation
import { NgxPaginationModule } from 'ngx-pagination';//For Pagination
import { Ng2OrderModule } from 'ng2-order-pipe';//For Sorting
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';//For Datepicker

import { AppComponent } from './app.component';
import { ClientService } from './Services/client.service';
import { ClientListComponent } from './Components/Client/client-list/client-list.component';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

//For Translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    // SharedModule,//For those component need for multiple modules
    BrowserAnimationsModule,//For Popup & Toaster
    MatDialogModule,//For Popup
    ToastrModule.forRoot({ //For Toaster
      progressBar: true
    }),
    HttpClientModule,//For HTTP call
    FormsModule,//For Template driven forms
    ReactiveFormsModule,//For Reactive forms
    // AdminModule, //For Admin Defined Modules
    // UserModule, //For User Defined Modules
    TranslateModule.forRoot({//For Translation
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxPaginationModule,//For Pagination
    Ng2OrderModule,//For Sorting   
    BsDatepickerModule.forRoot(),//For Datepicker
    // NumberDirectiveModule,
    AppRoutingModule
  ],
  providers: [
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
