import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Semester, SemesterParameter } from '../Models/semester.model';

import { UserService } from './user.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './notification.service';
/////
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubjectParameter } from '../Models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  loading: boolean = false;
  semesterRegisterForm: Semester;
  semesterFormData: Semester;
  semesterParameter: SemesterParameter;
  semesterList: Semester[] = null;
  constructor(private http: HttpClient, private router: Router,
    private translate: TranslateService, public notifyService: NotificationService, private userService: UserService) { }

  GetFormModel() {
    if (this.semesterParameter === undefined) {
      this.semesterParameter = {
        StudyId: 0,
        LanguageId: this.userService.selectedLanguageId
      };
    }
  }

  GetSemesterList() {
    this.semesterParameter.LanguageId = Number(this.userService.selectedLanguageId);
    this.http.post<Semester[]>(environment.apiURL + '/Semester/GetSemester', this.semesterParameter)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => {
        this.semesterList = res as Semester[];
        this.loading = false;
      })
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  SemesterList(semesterParameter: SemesterParameter) {
    return this.http.post<Semester[]>(environment.apiURL + '/Semester/GetSemester', semesterParameter).pipe(
      catchError(this.handleError)
    );
  }

  GetClientSemesterList(semesterParameter: SemesterParameter) {
    semesterParameter.LanguageId = Number(this.userService.selectedLanguageId);
    this.http.post<Semester[]>(environment.apiURL + '/Subject/GetSubject', semesterParameter)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => this.semesterList = res as Semester[])
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  CheckSemesterNoExist(semesterParameter: SemesterParameter) {
    return timer(0)
      .pipe(
        switchMap(() => {
          return this.http.post<Semester[]>(environment.apiURL + '/Semester/GetSemester', semesterParameter)
        })
      );
  }

  SemesterNoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const existSemesterParameter = {
        StudyId: this.semesterParameter.StudyId,
        SemesterNo: Number(control.value)
      };

      if (this.semesterRegisterForm != undefined) {
        this.semesterRegisterForm.SemesterNo = Number(control.value);
        localStorage.setItem('checkSemesterFrom', JSON.stringify(this.semesterRegisterForm));
        return this.CheckSemesterNoExist(existSemesterParameter as SemesterParameter)
          .pipe(
            map(res => {
              if (res.length) {
                if (!!localStorage.getItem('checkSemesterFrom')) {
                  const registerForm = JSON.parse(localStorage.getItem('checkSemesterFrom'));
                  const currentData = res[0];
                  localStorage.removeItem('checkSemesterFrom')

                  if (registerForm.SemesterNo == 0) { //Add Case
                    return { 'semesterNoCanNotZero': true };
                  }

                  if (registerForm.SemesterId == 0) { //Add Case
                    return { 'semesterNoExists': true };
                  }
                }
              }
            })
          );
      }
    };
  }

  InsertUpdateSemester(semester?: Semester) {
    if (semester != undefined) {
      semester.SemesterNo = Number(semester.SemesterNo);
      return this.http.post<any>(environment.apiURL + '/Semester/InsertUpdateSemester', semester).pipe(
        catchError(this.handleError)
      );
    }
  }

  InsertUpdateSemesteronStudy(semesterList: Semester[]) {
    return this.http.post<any>(environment.apiURL + '/Semester/InsertUpdateSemesteronStudy', semesterList).pipe(
      catchError(this.handleError)
    );
  }

  filterSemester(semester: Semester) {
    return semester.IsForDelete == false;
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
