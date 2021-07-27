import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Institution, InstitutionParameter } from '../Models/institution.model';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';
/////
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  public labels: any = {
    previousLabel: 'Common.Previous',
    nextLabel: 'Common.Next'
  };

  institutionRegisterForm: Institution;
  institutionFormData: Institution;
  institutionParameter: InstitutionParameter;
  institutionList: Institution[] = null;

  constructor(private http: HttpClient, private router: Router,
    private translate: TranslateService, public notifyService: NotificationService, private userService: UserService) { }

  GetFormModel() {
    if (this.institutionParameter === undefined) {
      this.institutionParameter = {
        InstitutionNo: null,
        LanguageId: this.userService.selectedLanguageId
      };
    }
  }

  GetInstitutionList() {
    this.institutionParameter.LanguageId = Number(this.userService.selectedLanguageId);
    this.http.post<Institution[]>(environment.apiURL + '/Institution/GetInstitution', this.institutionParameter)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => this.institutionList = res as Institution[])
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  InstitutionList() {
    return this.http.post<Institution[]>(environment.apiURL + '/Institution/GetInstitution', this.institutionParameter).pipe(
      catchError(this.handleError)
    );
  }

  CheckInstitutionNoExist(institutionParameter: InstitutionParameter) {
    return timer(0)
      .pipe(
        switchMap(() => {
          return this.http.post<Institution[]>(environment.apiURL + '/Institution/GetInstitution', institutionParameter)
        })
      );
  }

  InstitutionNoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const existInstitutionParameter = {
        InstitutionNo: Number(control.value),
      };

      if (this.institutionRegisterForm != undefined) {
        this.institutionRegisterForm.InstitutionNo = Number(control.value);
        localStorage.setItem('checkInstitutionFrom', JSON.stringify(this.institutionRegisterForm));
        return this.CheckInstitutionNoExist(existInstitutionParameter as InstitutionParameter)
          .pipe(
            map(res => {
              if (res.length) {
                if (!!localStorage.getItem('checkInstitutionFrom')) {
                  const registerForm = JSON.parse(localStorage.getItem('checkInstitutionFrom'));
                  const currentData = res[0];
                  localStorage.removeItem('checkInstitutionFrom')

                  if (registerForm.InstitutionId == 0) { //Add Case
                    return { 'subjectNoExists': true };
                  }
                  else {
                    if (currentData.InstitutionId != registerForm.InstitutionId) { //Edit Case
                      return { 'subjectNoExists': true };
                    }
                  }
                }
              }
            })
          );
      }
    };
  }

  InsertUpdateInstitution(institution?: Institution) {
    if (institution != undefined) {
      institution.InstitutionNo = Number(institution.InstitutionNo);
      return this.http.post<any>(environment.apiURL + '/Institution/InsertUpdateInstitution', institution).pipe(
        catchError(this.handleError)
      );
    }
    else {
      this.institutionFormData.InstitutionNo = Number(this.institutionFormData.InstitutionNo);
      return this.http.post<any>(environment.apiURL + '/Institution/InsertUpdateInstitution', this.institutionFormData).pipe(
        catchError(this.handleError)
      );
    }
  }

  UpdateInstitutionSorting(institution: Institution) {
    return this.http.post<any>(environment.apiURL + '/Institution/UpdateInstitutionSorting', institution).pipe(
      catchError(this.handleError)
    );
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
}
