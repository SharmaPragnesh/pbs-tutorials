import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User, UserLoginType, UserParameter } from 'src/app/Models/user.model';
import { InstitutionService } from 'src/app/Services/institution.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { StudyService } from 'src/app/Services/study.service';
import { UserService } from 'src/app/Services/user.service';
import * as CryptoJS from 'crypto-js';
import { NoteListService } from 'src/app/Services/note-list.service';
import { HttpErrorResponse } from '@angular/common/http';
//Social Login
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, AmazonLoginProvider } from "angularx-social-login";
import * as uuid from 'uuid';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  registerForm: FormGroup;
  Error: string;

  registerSocialUser?: User
  userParameter: UserParameter;
  socialUser: SocialUser;
  iCount: number;

  constructor(private formBuilder: FormBuilder, private router: Router, private translate: TranslateService,
    public userService: UserService, private notifyService: NotificationService, public noteListService: NoteListService,
    private institutionService: InstitutionService, private studyService: StudyService,
    private authService: SocialAuthService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      //Email: [null, { validators: [Validators.required], asyncValidators: [this.userService.ExistingUserValidator()], updateOn: 'blur' }],
      UserName: [null, [Validators.required]],
      Password: [null, Validators.required],
      IsRememberPassword: [false],
      UserLoginType: [UserLoginType.Application]
    });

    if (!!localStorage.getItem('logininfo')) {
      this.user = JSON.parse(localStorage.getItem('logininfo'));
      this.registerForm.patchValue({
        UserName: this.user.UserName,
        Password: this.user.Password,
        IsRememberPassword: this.user.IsRememberPassword
      });
    }

    if (localStorage.getItem("socialUser") != undefined) {
      this.socialUser = JSON.parse(localStorage.getItem("socialUser"));
    }

    this.authService.authState.subscribe((user) => {
      this.iCount = this.iCount + 1;
      if (user != null && this.iCount == 1) {
        if (user.provider === 'GOOGLE') {
          this.registerForm.patchValue({
            UserLoginType: UserLoginType.Google
          });
        }
        else if (user.provider === 'FACEBOOK') {
          this.registerForm.patchValue({
            UserLoginType: UserLoginType.Facebook
          });
        }

        localStorage.setItem("socialUser", JSON.stringify(user));
        this.socialUser = user;

        this.registerSocialUser = {
          FirstName: user.firstName,
          LastName: user.lastName,
          Initials: user.firstName.substring(0, 3).toUpperCase(),
          LanguageId: 1,
          UserName: user.email,
          Email: user.email,
          Password: '',
          Mobile: "0000",
          IsAdmin: false,
          SendNotification: false,
          UserId: 0,
          FilesUploaded: 0,
          SubjectInterestCount: 0,
          UserGuId: uuid.v4(),
          IsActive: true,
          UserLoginType: this.registerForm.value.UserLoginType
        }

        this.userParameter = {
          IsActive: true,
          Email: '',
          UserName: this.registerSocialUser.Email
        }

        console.log('GetUser call-----------------------------------------');
        this.userService.GetUser(this.userParameter).subscribe(
          res => {
            if (res.length > 0) {
              this.user = res[0];
              console.log('User already exist');
              this.LoginSocialUser();
            }
            else {
              if (this.registerSocialUser.UserLoginType == 2 || this.registerSocialUser.UserLoginType == 3) {//Google / Facebook Login
                this.userParameter.IsActive = false;
                this.userService.GetUser(this.userParameter).subscribe(//Get the Inactive user and make it Active if exist else create new user
                  res => {
                    if (res.length > 0) {
                      this.user = res[0];
                      const activateUser = {
                        UserGuId: this.user.UserGuId
                      };
                      this.userService.ActivateUser(activateUser as User).subscribe(data => {
                        console.log('Social User already exist - reactivated :' + data);
                        if (data == true) {
                          this.LoginSocialUser();
                        }
                      });
                    }
                    else {
                      console.log('User not exist');
                      this.InsertRegisterSocialUser()
                    }
                  },
                  err => {
                    console.log(err);
                  });
              }
              else {//Application Login
                console.log('User not exist');
                this.InsertRegisterSocialUser()
              }
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  InsertRegisterSocialUser() {
    this.userService.InsertRegisterUser(this.registerSocialUser).subscribe(
      res => {
        console.log('Succesfully register');
        this.LoginSocialUser();
      },
      err => {
        console.log(err);
      }
    );
  }

  LoginSocialUser() {
    this.registerForm.patchValue({
      UserName: this.registerSocialUser.UserName,
      Password: 'NotUseThisPassword@123',
      IsRememberPassword: false
    });

    this.onSubmit()
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.Error = "";
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm.value);
    }
    if (this.registerForm.invalid) {
      return false;
    }
    else {
      if (this.registerForm.value.IsRememberPassword) {
        localStorage.setItem('logininfo', JSON.stringify(this.registerForm.value));
      }
      else {
        localStorage.removeItem('logininfo');
      }

      this.userService.Login(this.registerForm.value).subscribe(
        res => {
          //Task-588 If user change language and login then language should be change.
          if (!!localStorage.getItem('anonymousLanguageId')) {
            res.singleUser.LanguageId = Number(localStorage.getItem('anonymousLanguageId'));
          }

          localStorage.setItem('userinfo', CryptoJS.AES.encrypt(JSON.stringify(res.singleUser), "").toString());
          localStorage.setItem('token', res.singleUser.Token);

          //Set Language & Culture
          this.userService.userInfo = res.singleUser;
          this.userService.selectedLanguageId = res.singleUser.LanguageId;
          this.userService.SetLanguageCulture();

          this.institutionService.GetInstitutionList();
          this.noteListService.SetInstitutionName();

          if (this.noteListService.filesParameter.InstitutionId != 0) {
            this.studyService.GetStudyList();
            this.noteListService.SetStudyName();
          }

          //Task-588 If user change language and login then language should be change.
          if (!!localStorage.getItem('anonymousLanguageId')) {
            this.userService.UpdateUserLanguage(res.singleUser.LanguageId.toString()).subscribe((res: any) => {
              console.log('result :' + res);
            },
              err => {
                console.log('Error :' + err);
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.router.navigate(['/login'])
                  }
                }
              });
          }

          if (localStorage.getItem("socialUser") != undefined) {
            localStorage.removeItem("socialUser");
            this.authService.signOut();
            this.registerSocialUser = null;
          }

          if (this.userService.userInfo["IsAdmin"]) {
            this.router.navigate(['/admin/unapproved-files']);
          }
          else {
            if (this.noteListService.IsSearchDone || this.noteListService.IsNoteListSearchDone) {
              if (this.noteListService.filesParameter.SearchText == '') {
                this.router.navigate(['/note-list']);
              }
              else {
                this.router.navigate(['/note-search-list']);
              }
            }
            else {
              this.router.navigate(['/user']);
            }
          }
        },
        err => {
          if (err.status = 400) {
            this.Error = err.error.message;
            // this.Error = err.status;
            //this.notifyService.showErrorWithTimeout("Username or password is incorrect", "", 1500);
          }
          console.log('Error :' + err.message);
        });
    }
  }

  ////SOCIAL LOGIN BUTTONS
  signInWithGoogle(): void {
    this.iCount = 0;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signInWithFB(): void {
    this.iCount = 0;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  // signInWithLinkedIn(): void {
  //   this.iCount = 0;
  //   this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }

}
