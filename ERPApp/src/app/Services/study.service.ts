import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Study, StudyParameter, TermTypes, TermTypesParameter } from '../Models/study.model';

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
export class StudyService {

  loading: boolean = false;
  studyRegisterForm: Study;
  studyFormData: Study;
  studyParameter: StudyParameter;
  studyList: Study[] = null;
  termTypesList: TermTypes[] = null;

  constructor(private http: HttpClient, private router: Router,
    private translate: TranslateService, public notifyService: NotificationService, private userService: UserService) { }

  GetFormModel() {
    if (this.studyParameter === undefined) {
      this.studyParameter = {
        InstitutionId: 0,
        LanguageId: this.userService.selectedLanguageId
      };
    }
  }

  GetStudyList() {
    this.studyParameter.LanguageId = Number(this.userService.selectedLanguageId);
    this.http.post<Study[]>(environment.apiURL + '/Study/GetStudy', this.studyParameter)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => {
        this.studyList = res as Study[];
        this.loading = false;
      })
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  StudyList(studyParameter?: StudyParameter) {
    if (studyParameter != undefined) {
      studyParameter.LanguageId = Number(this.userService.selectedLanguageId);
      return this.http.post<Study[]>(environment.apiURL + '/Study/GetStudy', studyParameter).pipe(
        catchError(this.handleError)
      );
    }
    else {
      this.studyParameter.LanguageId = Number(this.userService.selectedLanguageId);
      return this.http.post<Study[]>(environment.apiURL + '/Study/GetStudy', this.studyParameter).pipe(
        catchError(this.handleError)
      );
    }
  }

  // CheckStudyNoExist(studyParameter: StudyParameter) {
  //   return this.http.post<Study[]>(environment.apiURL + '/Study/GetStudy', studyParameter);
  // }

  CheckStudyNoExist(studyParameter: StudyParameter) {
    return timer(0)
      .pipe(
        switchMap(() => {
          return this.http.post<Study[]>(environment.apiURL + '/Study/GetStudy', studyParameter)
        })
      );
  }

  StudyNoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const existStudyParameter = {
        StudyNo: Number(control.value),
      };

      if (this.studyRegisterForm != undefined) {
        this.studyRegisterForm.StudyNo = Number(control.value);
        localStorage.setItem('checkStudyFrom', JSON.stringify(this.studyRegisterForm));
        return this.CheckStudyNoExist(existStudyParameter as StudyParameter)
          .pipe(
            map(res => {
              if (res.length) {
                if (!!localStorage.getItem('checkStudyFrom')) {
                  const registerForm = JSON.parse(localStorage.getItem('checkStudyFrom'));
                  const currentData = res[0];
                  localStorage.removeItem('checkStudyFrom')

                  if (registerForm.StudyId == 0) { //Add Case
                    return { 'studyNoExists': true };
                  }
                  else {
                    if (currentData.StudyId != registerForm.StudyId) { //Edit Case
                      return { 'studyNoExists': true };
                    }
                  }
                }
              }
            })
          );
      }
    };
  }

  InsertUpdateStudy(study?: Study) {
    if (study != undefined) {
      study.InstitutionId = Number(study.InstitutionId);
      study.StudyNo = Number(study.StudyNo);
      study.SemesterNo = Number(study.SemesterNo);
      study.TermTypeId = Number(study.TermTypeId);
      return this.http.post<any>(environment.apiURL + '/Study/InsertUpdateStudy', study).pipe(
        catchError(this.handleError)
      );
    }
    else {
      this.studyFormData.InstitutionId = Number(study.InstitutionId);
      this.studyFormData.StudyNo = Number(this.studyFormData.StudyNo);
      this.studyFormData.SemesterNo = Number(this.studyFormData.SemesterNo);
      this.studyFormData.TermTypeId = Number(study.TermTypeId);
      return this.http.post<any>(environment.apiURL + '/Study/InsertUpdateStudy', this.studyFormData).pipe(
        catchError(this.handleError)
      );
    }
  }

  UpdateStudySorting(study: Study) {
    return this.http.post<any>(environment.apiURL + '/Study/UpdateStudySorting', study).pipe(
      catchError(this.handleError)
    );
  }

  TermTypeList(termTypesParameter?: TermTypesParameter) {
    if (termTypesParameter != undefined) {
      termTypesParameter.LanguageId = Number(this.userService.selectedLanguageId);
      return this.http.post<TermTypes[]>(environment.apiURL + '/Study/GetTermType', termTypesParameter).pipe(
        catchError(this.handleError)
      );
    }
    else {
      // this.termTypesParameter.LanguageId = Number(this.userService.selectedLanguageId);
      // return this.http.post<Study[]>(environment.apiURL + '/Study/GetTermType', this.termTypesParameter).pipe(
      //   catchError(this.handleError)
      // );
    }
  }

  InsertUpdateTermType(termTypes?: TermTypes) {
    if (termTypes != undefined) {
      return this.http.post<any>(environment.apiURL + '/Study/InsertTermType', termTypes).pipe(
        catchError(this.handleError)
      );
    }
    else {
      // return this.http.post<any>(environment.apiURL + '/Study/InsertUpdateStudy', this.studyFormData).pipe(
      //   catchError(this.handleError)
      // );
    }
  }

  DeleteTermType(termTypes: TermTypes) {
    return this.http.post<any>(environment.apiURL + '/Study/DeleteTermType', termTypes).pipe(
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
