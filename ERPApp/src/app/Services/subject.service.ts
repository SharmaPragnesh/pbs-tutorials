import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, SubjectLookup, SubjectMapping, SubjectMappingParameter, SubjectParameter } from '../Models/subject.model';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
/////
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  subjectRegisterForm: Subject;
  subjectFormData: Subject;
  subjectParameter: SubjectParameter;
  subjectList: Subject[] = null;

  previousSubjectNo: number;//For checking valid Subject enter or not, while user change the SubjectNo in Edit Case

  subjectLookupList: SubjectLookup[] = null;
  subjectLookupParameter: SubjectParameter;

  subjectMappingParameter: SubjectMappingParameter;
  unassignedSubject: Subject[] = null;
  assignedSubject: Subject[] = null;

  constructor(private http: HttpClient, private router: Router,
    private translate: TranslateService, public notifyService: NotificationService, private userService: UserService) { }

  GetFormModel() {
    if (this.subjectParameter === undefined) {
      this.subjectParameter = {
        SemesterId: 0,
        LanguageId: this.userService.selectedLanguageId
      };
    }
  }

  GetSubjectLookupFormModel(institutionId: number, studyId: number) {
    if (this.subjectLookupParameter === undefined) {
      this.subjectLookupParameter = {
        SemesterId: 0,
        InstitutionId: institutionId,
        StudyId: studyId,
        LanguageId: this.userService.selectedLanguageId
      };
    }
    else {
      this.subjectLookupParameter.InstitutionId = institutionId;
      this.subjectLookupParameter.StudyId = studyId;
    }
  }

  resetForm(form?: NgForm) {
    // if (form != null)
    //   form.resetForm();

    // this.subjectFormData = {
    //   SubjectId: 0,
    //   SemesterId: 0,
    //   SubjectNo: null,
    //   SubjectNameDaDK: '',
    //   SubjectNameEnUS: '',
    //   IsForDelete: false
    // }
  }

  GetSubjectList() {
    this.subjectParameter.LanguageId = Number(this.userService.selectedLanguageId);
    this.http.post<Subject[]>(environment.apiURL + '/Subject/GetSubject', this.subjectParameter)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.subjectList = res as Subject[]

      })
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  // // // GetClientSubjectList() {
  // // //   this.subjectParameter.LanguageId = Number(this.userService.selectedLanguageId);
  // // //   this.http.post<Subject[]>(environment.apiURL + '/Subject/GetClientSubject', this.subjectParameter)
  // // //     .pipe(catchError(this.handleError))
  // // //     .toPromise()
  // // //     .then(res => {
  // // //       if (environment.ShowConsoleLogs) {
  // // //         console.log(res);
  // // //       }
  // // //       this.subjectList = res as Subject[]
  // // //     })
  // // //     .catch(err => {
  // // //       if (err === "ErrorFromWebAPI")
  // // //         this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
  // // //       else
  // // //         console.log(err);
  // // //     });
  // // // }

  GetAllSubjectList() {//Specially Bind for the main Dropdown only.
    this.subjectParameter.SubjectId = null;
    this.subjectParameter.LanguageId = Number(this.userService.selectedLanguageId);
    this.http.post<Subject[]>(environment.apiURL + '/Subject/GetSubject', this.subjectParameter)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.subjectList = res as Subject[]
      })
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  SubjectList(subjectParameter?: SubjectParameter) {
    if (subjectParameter != undefined) {
      this.subjectParameter.LanguageId = Number(this.userService.selectedLanguageId);
      return this.http.post<Subject[]>(environment.apiURL + '/Subject/GetSubject', subjectParameter).pipe(
        catchError(this.handleError)
      );
    }
    else {
      this.subjectParameter.LanguageId = Number(this.userService.selectedLanguageId);
      return this.http.post<Subject[]>(environment.apiURL + '/Subject/GetSubject', this.subjectParameter).pipe(
        catchError(this.handleError)
      );
    }
  }

  SubjectLookupList(subjectParameter?: SubjectParameter) {
    return this.http.post<SubjectLookup[]>(environment.apiURL + '/Subject/GetSubject', subjectParameter).pipe(
      catchError(this.handleError)
    );
  }

  // CheckSubjectNoExist(subjectParameter: SubjectParameter) {
  //   return this.http.post<Subject[]>(environment.apiURL + '/Subject/GetSubject', subjectParameter);
  // }

  CheckSubjectNoExist(subjectParameter: SubjectParameter) {
    return timer(0)
      .pipe(
        switchMap(() => {
          return this.http.post<Subject[]>(environment.apiURL + '/Subject/GetSubject', subjectParameter)
        })
      );
  }

  SubjectNoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const existStudyParameter = {
        StudyId: this.subjectRegisterForm["StudyId"],
        SubjectNo: Number(control.value)
      };

      if (this.subjectRegisterForm != undefined) {
        this.subjectRegisterForm.SubjectNo = Number(control.value);
        localStorage.setItem('checkSubjectFrom', JSON.stringify(this.subjectRegisterForm));
        return this.CheckSubjectNoExist(existStudyParameter as SubjectParameter)
          .pipe(
            map(res => {
              if (res.length) {
                if (!!localStorage.getItem('checkSubjectFrom')) {
                  const registerForm = JSON.parse(localStorage.getItem('checkSubjectFrom'));
                  const currentData = res[0];
                  localStorage.removeItem('checkSubjectFrom')

                  if (registerForm.SubjectId == 0) { //Add Case
                    return { 'subjectNoExists': true };
                  }
                  else {
                    // var found = 0;
                    // const str_array = registerForm.SemesterIds.split(',');
                    // for (var i = 0; i < str_array.length; i++) {
                    //   if (registerForm.SemesterId == Number(str_array[i])) {
                    //     found = 1;
                    //   }
                    // }
                    // if (!found) {
                    //   return { 'subjectNoExists': true };
                    // }
                    // if (currentData.SubjectId != registerForm.SubjectId) { //Edit Case
                    //   return { 'subjectNoExists': true };
                    // }

                    const subj = this.previousSubjectNo;
                    var found = 0;
                    if ((this.previousSubjectNo != currentData.SubjectNo) && (registerForm.SubjectId != currentData.SubjectId)) {
                      const str_array = registerForm.SemesterIds.split(',');
                      for (var i = 0; i < str_array.length; i++) {
                        const str_currrent = currentData.SemesterIds.split(',');
                        for (var j = 0; j < str_currrent.length; j++) {
                          if (Number(str_array[i]) == Number(str_currrent[j])) {
                            found = 1;
                          }
                        }
                        // if (registerForm.SemesterId == Number(str_array[i])) {
                        //   found = 1;
                        // }
                      }
                    }
                    if (found) {
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

  InsertUpdateSubject(subject?: Subject, SemesterIds?: string) {
    if (subject != undefined) {
      subject.SemesterIds = SemesterIds;
      subject.SubjectNo = Number(subject.SubjectNo);
      return this.http.post<any>(environment.apiURL + '/Subject/InsertUpdateSubject', subject).pipe(
        catchError(this.handleError)
      );
    }
    else {
      this.subjectFormData.SubjectNo = Number(this.subjectFormData.SubjectNo);
      return this.http.post<any>(environment.apiURL + '/Subject/InsertUpdateSubject', this.subjectFormData).pipe(
        catchError(this.handleError)
      );
    }
  }

  UpdateSubjectSorting(subject: Subject) {
    return this.http.post<any>(environment.apiURL + '/Subject/UpdateSubjectSorting', subject).pipe(
      catchError(this.handleError)
    );
  }

  GetUnassignedSubject() {
    this.http.post<Subject[]>(environment.apiURL + '/Subject/GetUnassignedSubject', this.subjectMappingParameter)
      .toPromise()
      .then(res => {
        console.log('-----GetUnassignedSubject-----');
        console.log(res);
        this.unassignedSubject = res as Subject[]
      });
  }

  GetAssignedSubject() {
    this.http.post<Subject[]>(environment.apiURL + '/Subject/GetAssignedSubject', this.subjectMappingParameter)
      .toPromise()
      .then(res => {
        console.log('-----GetAssignedSubject-----');
        console.log(res);
        this.assignedSubject = res as Subject[]
      });
  }

  InsertSubjectMapping(subject?: SubjectMapping) {
    return this.http.post<any>(environment.apiURL + '/Subject/InsertSubjectMapping', subject);
  }

  DeleteSubjectMapping(subject?: SubjectMapping) {
    return this.http.post<any>(environment.apiURL + '/Subject/DeleteSubjectMapping', subject);
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
