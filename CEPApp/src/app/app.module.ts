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
import { ClientDetailComponent } from './Components/Client/client-detail/client-detail.component';
import { CustomDatePipe } from './Pipes/custom-date.pipe';
import { EngagementService } from './Services/engagement.service';
import { EngagementListComponent } from './Components/Engagement/engagement-list/engagement-list.component';
import { EngagementComponent } from './Components/engagement/engagement.component';
import { LoginComponent } from './Components/core/login/login.component';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { ForgotPasswordComponent } from './Components/core/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/core/reset-password/reset-password.component';

//For Translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'c8a20593-c899-450e-aba9-dde0107d355c',
      redirectUri: 'http://localhost:4201/'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientComponent,
    DashboardComponent,
    ClientDetailComponent,
    CustomDatePipe,
    EngagementListComponent,
    EngagementComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
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
    ClientService,
    EngagementService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
