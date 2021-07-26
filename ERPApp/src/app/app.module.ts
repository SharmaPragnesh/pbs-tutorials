//Basic Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './Components/Admin/admin.module';
import { SharedModule } from './Shared/shared.module';
import { NgxCookiebotModule } from 'ngx-cookiebot-angular7';

//User Defined Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Components/Admin/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';//For Popup window
import { ToastrModule } from 'ngx-toastr';//For show alert poup message
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';//For Translation
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//For Translation
import { NgxPaginationModule } from 'ngx-pagination';//For Pagination
import { Ng2OrderModule } from 'ng2-order-pipe';//For Sorting
import { RatingModule } from 'ng-starrating';//For Rating
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';//For Datepicker
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';//For SocialLogin
import { GoogleLoginProvider, FacebookLoginProvider, AmazonLoginProvider } from 'angularx-social-login';//For SocialLogin

//User Defined Components
import { AppComponent } from './app.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { StudyComponent } from './Components/Admin/study/study.component';
import { UploadFileComponent } from './Components/upload-file/upload-file.component';
import { NoteListComponent } from './Components/note-list/note-list.component';
import { NoteListDetailComponent } from './Components/note-list/note-list-detail/note-list-detail.component';
import { NoteSearchComponent } from './Components/note-list/note-search/note-search.component';
import { NoteSearchListComponent } from './Components/note-list/note-search-list/note-search-list.component';

//User Defined Services
import { InstitutionService } from './Services/institution.service';
import { StudyService } from './Services/study.service';
import { UserService } from './Services/user.service';
import { SubjectService } from './Services/subject.service';
import { SemesterService } from './Services/semester.service';
import { NoteListService } from './Services/note-list.service';

//User Defined Directives
import { NumberDirectiveModule } from './Directives/number.directive';
import { ForgotPasswordComponent } from './Components/Core/forgot-password/forgot-password.component';
import { CustomRatingComponent } from './Components/note-list/custom-rating/custom-rating.component';
import { ActivateUserComponent } from './Components/Core/register/activate-user/activate-user.component';
import { LoadingScreenComponent } from './Components/loading-screen/loading-screen.component';

import { LoadingScreenInterceptor } from './loading.interceptor';
import { ResetPasswordComponent } from './Components/Core/reset-password/reset-password.component';
import { UserModule } from './Components/User/user.module';
import { MyfilterPipe } from './Pipes/myfilter.pipe';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from './Components/Shared/confirmation-dialog/confirmation-dialog.component';
import { MessageDialogComponent } from './Components/Shared/message-dialog/message-dialog.component';
import { NoteComponent } from './Components/note-list/note/note.component';
import { NoteEditComponent } from './Components/note-list/note-edit/note-edit.component';
import { SafePipe } from './Pipes/safe.pipe';
import { OnlineViewComponent } from './Components/note-list/online-view/online-view.component';
import { FeedbackComponent } from './Components/note-list/feedback/feedback.component';
import { AboutDanishComponent } from './Components/about-us/about-danish/about-danish.component';
import { AboutEnglishComponent } from './Components/about-us/about-english/about-english.component';
import { CookiebotConfig } from './Models/cookiebot.config';
import { RolesService } from './Services/roles.service';

//For Translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UploadFileComponent,
    NoteListComponent,
    NoteListDetailComponent,
    NoteSearchComponent,
    NoteSearchListComponent,
    ForgotPasswordComponent,
    CustomRatingComponent,
    ActivateUserComponent,
    LoadingScreenComponent,
    ResetPasswordComponent,
    MyfilterPipe,
    ConfirmationDialogComponent,
    MessageDialogComponent,
    NoteComponent,
    NoteEditComponent,
    SafePipe,
    OnlineViewComponent,
    FeedbackComponent,
    AboutDanishComponent,
    AboutEnglishComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,//For those component need for multiple modules
    BrowserAnimationsModule,//For Popup & Toaster
    MatDialogModule,//For Popup
    ToastrModule.forRoot({ //For Toaster
      progressBar: true
    }),
    HttpClientModule,//For HTTP call
    FormsModule,//For Template driven forms
    ReactiveFormsModule,//For Reactive forms
    AdminModule, //For Admin Defined Modules
    UserModule, //For User Defined Modules
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
    NumberDirectiveModule,
    SocialLoginModule, //For Social Login
    NgxCookiebotModule.forRoot(CookiebotConfig), //For Cookiebot
    AppRoutingModule
  ],
  entryComponents: [
    StudyComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    RolesService,
    InstitutionService,
    StudyService,
    UserService,
    SubjectService,
    SemesterService,
    NoteListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GoogleClientId),
            //https://console.developers.google.com/apis/credentials/oauthclient/981659961080-9qeq7ra4kt6k47t9k1lnfbvrjrglom5l.apps.googleusercontent.com?project=anshangular
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FacebookClientId),
            //https://developers.facebook.com/apps/
            //https://stackoverflow.com/questions/30085246/app-not-setup-this-app-is-still-in-development-mode
            // https://dzone.com/articles/login-with-facebook-and-google-using-angular-8
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'amzn1.application-oa2-client.f074ae67c0a146b6902cc0c4a3297935'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
