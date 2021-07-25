import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { UserParameter, UniversityParameter } from '../Models/user';
import { User, UserParameter } from '../Models/user.model';
import { TranslateService } from '@ngx-translate/core';
/////
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public labels: any = {
    previousLabel: 'Common.Previous',
    nextLabel: 'Common.Next'
  };

  userRegisterForm: User;
  selectedLanguageId: number = 1;
  userInfo: any;
  userParameter: UserParameter;
  userList: User[] = null;
  needRefreshPage: boolean = false;

  constructor(private http: HttpClient, private router: Router, private translate: TranslateService) { }

  GetUserList() {
    this.http.post<User[]>(environment.apiURL + '/User/GetUser', this.userParameter).pipe(
      catchError(this.handleError)
    ).toPromise()
      .then(res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.userList = res as User[]
      });
  }

  GetUser(userParameter: UserParameter) {
    return this.http.post<User[]>(environment.apiURL + '/User/GetUser', userParameter).pipe(
      catchError(this.handleError)
    );
  }

  public PrintUser(userParameter: UserParameter): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'POST',
      `${environment.apiURL}/User/PrintStatistics?culture=` + this.GetLanguageCulture() + `&ui-culture=` + this.GetLanguageCulture(),
      userParameter,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  UpdatePassword(user?: User) {
    if (user != undefined) {
      return this.http.post<any>(environment.apiURL + '/User/UpdatePassword', user).pipe(
        catchError(this.handleError)
      );
    }
  }

  InsertRegisterUser(user?: User) {
    if (user != undefined) {
      user.Initials = user.FirstName.charAt(0) + user.LastName.charAt(0);
      user.Initials = user.Initials.toUpperCase();
      user.UserId = Number(user.UserId);
      user.LanguageId = Number(user.LanguageId);
      return this.http.post<any>(environment.apiURL + '/User/InsertRegisterUser', user);
    }
  }

  InsertUpdateUser(user?: User) {
    if (user != undefined) {
      user.Initials = user.FirstName.charAt(0) + user.LastName.charAt(0);
      user.Initials = user.Initials.toUpperCase();
      user.UserId = Number(user.UserId);
      user.LanguageId = Number(user.LanguageId);
      return this.http.post<any>(environment.apiURL + '/User/InsertUpdateUser', user);
    }
  }

  ActivateUser(user: User) {
    return this.http.post<any>(environment.apiURL + '/User/ActivateUser', user);
  }

  Login(user: User) {
    return this.http.post<any>(environment.apiURL + '/User/Login', user);
  }

  CheckAddEditUserNameExist(userParameter: UserParameter) {
    return timer(0)
      .pipe(
        switchMap(() => {
          return this.http.post<User[]>(environment.apiURL + '/User/GetUser', userParameter)
        })
      );
  }

  AddEditUserNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const existUser = {
        IsActive: true,
        UserName: control.value
      };

      if (this.userRegisterForm != undefined) {
        this.userRegisterForm.UserName = control.value;
        localStorage.setItem('checkUserFrom', JSON.stringify(this.userRegisterForm));
        return this.CheckAddEditUserNameExist(existUser as UserParameter)
          .pipe(
            map(res => {
              if (res.length) {
                if (!!localStorage.getItem('checkUserFrom')) {
                  const registerForm = JSON.parse(localStorage.getItem('checkUserFrom'));
                  const currentData = res[0];
                  localStorage.removeItem('checkUserFrom')
                  if (registerForm.UserId == 0) { //Add Case
                    return { 'userNameExists': true };
                  }
                  else {
                    if (currentData.UserId != registerForm.UserId) { //Edit Case
                      return { 'userNameExists': true };
                    }
                  }
                }
              }
            })
          );
      }
    };
  }

  CheckExistingUser(user: User) {
    return timer(0)
      .pipe(
        switchMap(() => {
          return this.http.post<any>(environment.apiURL + '/User/IsExistingUser', user)
        })
      );
  }

  ExistingUserValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const existUser = {
        Email: control.value,
      };

      return this.CheckExistingUser(existUser as User)
        .pipe(
          map(res => {
            if (!res) {
              return { 'emailIdNotExists': true };
            }
          })
        );
    };
  }

  ForgotPassword(userParameter: UserParameter) {
    return this.http.post<any>(environment.apiURL + '/User/ForgotPassword', userParameter);
  }

  UpdateUserLanguage(languageId: string) {
    return this.http.get<any>(environment.apiURL + '/User/UpdateUserLanguage?languageId=' + languageId);
  }

  // SetLanguageAndCulture(languageId: number) {
  //   this.selectedLanguageId = languageId;
  //   if (this.selectedLanguageId == 1) {
  //     this.translate.use("da");
  //   }
  //   else {
  //     this.translate.use('en');
  //   }
  // }

  SetLanguageCulture() {
    if (this.selectedLanguageId == 1) {
      this.translate.use("da");
    }
    else {
      this.translate.use('en');
    }
  }

  GetLanguageCulture() {
    if (this.selectedLanguageId == 1) {
      return 'da-DK';
    }
    else {
      return 'en-US';
    }
  }

  // UserList(userParameter: UserParameter) {
  //   return this.http.post<any>(environment.apiURL + '/user/UserList', userParameter);
  // }

  // UniversityList(universityParameter: UniversityParameter) {
  //   return this.http.post<any>(environment.apiURL + '/weatherforecast/UniversityList', universityParameter);
  // }

  LanguageList() {
    return this.http.get<any>(environment.apiURL + '/Language/GetLanguage');
  }

  Dummy() {
    return this.http.get<any>(environment.apiURL + '/Language/Dummy');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser(withoutRedirect?: boolean) {
    var temp = JSON.parse(localStorage.getItem('logininfo'));
    localStorage.clear();
    if (temp != null) {
      localStorage.setItem('logininfo', JSON.stringify(temp));
    }

    if (withoutRedirect == undefined) {
      this.router.navigate(['/'])
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        console.log(error);
        this.router.navigate(['/login'])
      }
      else if (error.status === 500) {
        console.error(`ErrorFromWebAPI code ${error.status}, ` + `body was: ${error.error}`);
        return throwError('ErrorFromWebAPI');
      }
      else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

  /*
  PagingSearchedCompanies(questionParameter: QuestionParameter) {
    return this.http.post<any>(environment.apiURL + '/Question/PagingSearchedCompanies', questionParameter);
  }  
  */
}
