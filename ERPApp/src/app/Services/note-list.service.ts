import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Feedback, Files, FileScore, FileScoreParameter, FilesParameter, NoteList, Remark, RemarkParameter, SearchFiles, UserSubjectInterest, UserSubjectInterestParameter } from '../Models/note-list.model';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './notification.service';
import { InstitutionService } from './institution.service';
import { StudyService } from './study.service';
import { SemesterService } from './semester.service';
import { SubjectService } from './subject.service';
import { UserService } from './user.service';

import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Institution } from '../Models/institution.model';
import { Study } from '../Models/study.model';
import { Subject, SubjectParameter } from '../Models/subject.model';
import { Semester, SemesterParameter } from '../Models/semester.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  themeMode: string = "1";
  loading = false;
  public indexInstitution: number = -1;
  public indexInstitutionPrevious: number = -1;
  // noteList: NoteList = {};

  IsSearchDone: boolean = false;
  IsNoteListSearchDone: boolean = false;
  filesParameter: FilesParameter;
  filesList: Files[] = null;

  constructor(private http: HttpClient, private router: Router, private userService: UserService,
    private translate: TranslateService, public notifyService: NotificationService,
    public institutionService: InstitutionService, public studyService: StudyService,
    public semesterService: SemesterService, public subjectService: SubjectService) {
    if (this.filesParameter === undefined) {
      this.SetDefaultValues();
    }
  }

  SetDefaultValues() {
    this.filesParameter = {
      InstitutionId: 0,
      StudyId: 0,
      SemesterId: 0,
      SubjectId: 0,
      // // // SubjectNo: 0,
      TermType: 'Semester',
      LanguageId: 2,
      IsApproved: 1,
      SearchText: ''
    };
  }

  ResetNoteListValues() {
    this.SetDefaultValues();
    if (this.institutionService.institutionList[this.indexInstitutionPrevious] != undefined) {
      this.institutionService.institutionList[this.indexInstitutionPrevious].Show = false;
    }
    this.indexInstitution = -1;
    this.indexInstitutionPrevious = -1;
  }

  CompareObjects(object1, object2, key) { //for Sorting
    const obj1 = object1[key]
    const obj2 = object2[key]

    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
  }

  SetTimeinDate(newDate: Date) {
    var date = new Date();
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    newDate.setSeconds(date.getSeconds());
    return newDate;
  }

  //////////////////////////////////////////////////////////

  ConvertToId(obj: any) {
    var id = 0;
    if (obj.target.value.split(":").length >= 2) {
      id = Number(obj.target.value.split(":")[1].trim());
    }
    return id;
  }

  ClientInsititutionChange(institution: Institution, index: number) {
    if (environment.ShowConsoleLogs) {
      console.log(this.institutionService.institutionList[index]);
    }

    this.indexInstitution = index;

    if (this.indexInstitutionPrevious != -1) {
      if (this.indexInstitution != this.indexInstitutionPrevious) {
        this.institutionService.institutionList[this.indexInstitutionPrevious].Show = false;
      }
    }
    this.indexInstitutionPrevious = index;
    this.institutionService.institutionList[index].Show = !this.institutionService.institutionList[index].Show;
    //if execute - if institution is minimize and click then open the institution for maximize.
    //else execute- when institution is maximize and click then close the institution for minimize.
    if (this.institutionService.institutionList[index].Show) {
      this.studyService.loading = true;
      this.studyService.studyParameter.InstitutionId = institution.InstitutionId;
      this.filesParameter.InstitutionId = institution.InstitutionId;
      this.filesParameter.InstitutionName = institution.InstitutionName;
      this.studyService.studyList = null;
      this.studyService.GetStudyList();
      this.filesParameter.StudyId = 0;
      this.filesParameter.SemesterId = 0;
      this.filesParameter.SubjectId = 0;
      // // // this.filesParameter.SubjectNo = 0;
      this.filesParameter.SearchText = '';
      this.semesterService.semesterList = null;
      this.subjectService.subjectList = null;
    }
    else {
      this.studyService.studyParameter.InstitutionId = 0;
      this.filesParameter.InstitutionId = 0;
      this.filesParameter.InstitutionName = '';
    }
  }

  SetInstitutionShowValue(InstitutionId: number) {
    this.institutionService.institutionList.forEach((currentValue, index) => {
      currentValue.Show = false;
      if (currentValue.InstitutionId == InstitutionId) {
        currentValue.Show = true;
      }
    });
  }

  SetInstitutionName() {
    if (this.filesParameter.LanguageId != this.userService.selectedLanguageId) {
      this.institutionService.institutionList.forEach((currentValue, index) => {
        if (currentValue.InstitutionId == this.filesParameter.InstitutionId) {
          if (this.userService.selectedLanguageId == 2) {
            this.filesParameter.InstitutionName = currentValue.InstitutionNameEnUS;
          }
          else {
            this.filesParameter.InstitutionName = currentValue.InstitutionNameDaDK;
          }
        }
      });
    }
  }

  SetStudyName() {
    if (this.filesParameter.LanguageId != this.userService.selectedLanguageId) {
      this.studyService.studyList.forEach((currentValue, index) => {
        if (currentValue.StudyId == this.filesParameter.StudyId) {
          if (this.userService.selectedLanguageId == 2) {
            this.filesParameter.StudyName = currentValue.StudyNameEnUS;
          }
          else {
            this.filesParameter.StudyName = currentValue.StudyNameDaDK;
          }
        }
      });
    }
  }

  onInsititutionChange(institution: any, isRefreshStudy: boolean = true) {
    this.SetInstitutionShowValue(this.ConvertToId(institution));

    this.studyService.studyParameter.InstitutionId = this.ConvertToId(institution);
    this.filesParameter.InstitutionId = this.ConvertToId(institution);
    this.filesParameter.InstitutionName = institution.target.options[institution.target.options.selectedIndex].text;

    if (isRefreshStudy) {
      this.studyService.GetStudyList();
    }

    this.filesParameter.StudyId = 0;
    this.filesParameter.SemesterId = 0;
    this.filesParameter.SubjectId = 0;
    this.semesterService.semesterList = null;
    this.subjectService.subjectList = null;
  }

  onStudyChange(subject: any) {
    this.semesterService.semesterParameter.StudyId = this.ConvertToId(subject);
    this.filesParameter.StudyId = this.ConvertToId(subject);
    this.filesParameter.StudyName = subject.target.options[subject.target.options.selectedIndex].text;
    this.semesterService.GetSemesterList();
    this.filesParameter.SemesterId = 0;
    this.filesParameter.SubjectId = 0;
    // // // this.filesParameter.SubjectNo = 0;
    this.semesterService.semesterList = null;
    this.subjectService.subjectList = null;
  }

  ClientStudyChange(study: Study, isRedirect: boolean = true) {
    this.semesterService.semesterParameter.StudyId = study.StudyId;
    this.filesParameter.StudyId = study.StudyId;
    this.filesParameter.StudyName = study.StudyName;
    this.semesterService.loading = true;
    this.semesterService.GetSemesterList();
    // // // this.subjectService.subjectParameter.StudyId = study.StudyId;
    // // // this.subjectService.GetClientSubjectList();
    this.filesParameter.SemesterId = 0;
    this.filesParameter.SubjectId = 0;
    // // // this.filesParameter.SubjectNo = 0;
    this.semesterService.semesterList = null;
    this.subjectService.subjectList = null;
    if (isRedirect)
      this.router.navigate(['/note-list']);
  }

  onSemesterChange(semester: any, isRefreshSubject: boolean = true) {
    this.subjectService.subjectParameter.SubjectId = null; //because if subject is selected from frontend then set to null
    this.subjectService.subjectParameter.SemesterId = this.ConvertToId(semester);
    this.filesParameter.SemesterId = this.ConvertToId(semester);
    // // // this.filesParameter.SemesterNo = semester.target.options[semester.target.options.selectedIndex].text;
    if (this.filesParameter.SemesterId == 0) {
      this.subjectService.subjectList = null;
    }
    else {
      if (isRefreshSubject) {
        this.subjectService.GetSubjectList();
      }
    }
  }

  ClientSemesterChange(semester: Semester) {
    this.subjectService.subjectList = null;
    this.subjectService.subjectParameter.SubjectId = null; //because if subject is selected from frontend then set to null
    this.subjectService.subjectParameter.SemesterId = semester.SemesterId;
    this.filesParameter.SubjectId = 0;
    this.filesParameter.SemesterId = semester.SemesterId;
    this.filesParameter.SemesterNo = semester.SemesterNo
    // // // this.filesParameter.SemesterNo = semester.target.options[semester.target.options.selectedIndex].text;
    this.subjectService.GetSubjectList();

    this.IsNoteListSearchDone = true;
    // const myId = uuid.v4();
    // this.router.navigate(['/note-list/', myId])
  }

  onSubjectChange(subject: any) {
    this.subjectService.subjectParameter.SubjectId = this.ConvertToId(subject);
    this.filesParameter.SubjectId = this.ConvertToId(subject);
    this.filesParameter.SubjectName = subject.target.options[subject.target.options.selectedIndex].text;
  }

  // ClientSubjectChange(subject: Subject) {
  //   this.subjectService.subjectParameter.SubjectId = subject.SubjectId;
  //   this.filesParameter.SubjectId = subject.SubjectId;
  //   this.filesParameter.SubjectName = subject.SubjectName;

  //   this.IsNoteListSearchDone = true;
  //   const myId = uuid.v4();
  //   this.router.navigate(['/note-list/', myId])
  // }

  // // // ClientSubjectChange(subject: any) {
  // // //   this.subjectService.subjectParameter.SubjectNo = this.ConvertToId(subject);
  // // //   this.filesParameter.SubjectNo = this.ConvertToId(subject);
  // // //   this.filesParameter.SubjectName = subject.target.options[subject.target.options.selectedIndex].text;
  // // //   this.filesParameter.SemesterId = 0;
  // // //   this.filesParameter.SemesterNo = 0;
  // // //   this.filesParameter.SearchText = '';

  // // //   const clientSemesterParameter = {
  // // //     SubjectNo: this.filesParameter.SubjectNo,
  // // //     LanguageId: Number(this.userService.selectedLanguageId),
  // // //     StudyId: this.filesParameter.StudyId
  // // //   };

  // // //   this.semesterService.GetClientSemesterList(clientSemesterParameter as SemesterParameter);
  // // // }

  // // // ClientSemesterChange(semester: any, isRefreshSubject: boolean = true) {
  // // //   this.subjectService.subjectParameter.SubjectId = null; //because if subject is selected from frontend then set to null
  // // //   this.subjectService.subjectParameter.SemesterId = this.ConvertToId(semester);
  // // //   this.filesParameter.SemesterId = this.ConvertToId(semester);
  // // //   this.filesParameter.SemesterNo = semester.target.options[semester.target.options.selectedIndex].text;
  // // // }

  ////////--------------Files START--------------////////
  GetFilesList(isAdmin?: boolean) {
    const apiMethod = isAdmin ? "GetFiles" : "UserGetFiles";
    this.http.post<Files[]>(environment.apiURL + '/NoteList/' + apiMethod, this.filesParameter).pipe(
      catchError(this.handleError)
    ).toPromise()
      .then(res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.filesList = res as Files[];
        this.loading = false;
      })
      .catch(err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      });
  }

  FilesList(isAdmin?: boolean, filesParameter?: FilesParameter) {
    const apiMethod = isAdmin ? "GetFiles" : "UserGetFiles";
    if (filesParameter !== undefined) {
      return this.http.post<Files[]>(environment.apiURL + '/NoteList/' + apiMethod, filesParameter).pipe(
        catchError(this.handleError)
      );
    }
    else {
      return this.http.post<Files[]>(environment.apiURL + '/NoteList/' + apiMethod, this.filesParameter).pipe(
        catchError(this.handleError)
      );
    }
  }

  SearchFilesList(isAdmin?: boolean) {
    const apiMethod = isAdmin ? "UserGetSearchFiles" : "UserGetSearchFiles";
    return this.http.post<SearchFiles>(environment.apiURL + '/NoteList/' + apiMethod, this.filesParameter).pipe(
      catchError(this.handleError)
    );
  }

  GetUserFilesList(filesParameter?: FilesParameter) {
    return this.http.post<Files[]>(environment.apiURL + '/NoteList/GetFiles', filesParameter).pipe(
      catchError(this.handleError)
    );
  }

  InsertFile(files?: Files) {
    return this.http.post<any>(environment.apiURL + '/NoteList/InsertFile', files).pipe(
      catchError(this.handleError)
    );
  }

  UpdateFile(files?: Files) {
    files.InstitutionId = Number(files.InstitutionId);
    files.StudyId = Number(files.StudyId);
    files.SemesterId = Number(files.SemesterId);
    files.SubjectId = Number(files.SubjectId);
    return this.http.post<any>(environment.apiURL + '/NoteList/UpdateFiles', files).pipe(
      catchError(this.handleError)
    );
  }

  DeleteFiles(files?: Files) {
    return this.http.post<any>(environment.apiURL + '/NoteList/DeleteFiles', files).pipe(
      catchError(this.handleError)
    );
  }

  ApproveFiles(files?: Files) {
    return this.http.post<any>(environment.apiURL + '/NoteList/ApproveFiles', files).pipe(
      catchError(this.handleError)
    );
  }

  SendApproveFilesEMail(files?: Files) {
    return this.http.post<any>(environment.apiURL + '/NoteList/SendApproveFilesEMail', files).pipe(
      catchError(this.handleError)
    );
  }

  DeleteFile(fileId: number) {
    var files = {
      FileId: fileId
    };

    return this.http.post<any>(environment.apiURL + '/NoteList/DeleteFile', files).pipe(
      catchError(this.handleError)
    );
  }

  ShowFileTypeImage(fileType: string, type: string = 's') {
    let path = '<img alt="" src="/assets/images/{0}">'

    switch (fileType) {
      case 'pdf':
        return path.replace('{0}', 'pdf-icon-' + type + '.png');
      case 'xlsx':
        return path.replace('{0}', 'excel-icon-' + type + '.png');
      case 'doc':
      case 'docx':
        return path.replace('{0}', 'word-icon-' + type + '.png');
      case 'ppt':
      case 'pptx':
        return path.replace('{0}', 'powerpoint-icon-' + type + '.png');
      default:
        return fileType;
    }
  }

  ShowFileSize(fileSize: number) {
    if (this.userService.selectedLanguageId == 2) {
      return fileSize.toLocaleString('en-Us', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
    }
    else {
      return fileSize.toLocaleString('de-DE', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
    }
  }

  ////////--------------Files END--------------////////

  ////////--------------Remark START--------------////////
  GetRemark(remarkParameter: RemarkParameter) {
    return this.http.post<Remark[]>(environment.apiURL + '/NoteList/GetRemark', remarkParameter).pipe(
      catchError(this.handleError)
    );
  }

  SendFeedbackMail(feedback: Feedback) {
    feedback.LanguageId = this.userService.selectedLanguageId;
    return this.http.post<any>(environment.apiURL + '/NoteList/SendFeedbackMail', feedback).pipe(
      catchError(this.handleError)
    );
  }

  InsertRemark(remark: Remark) {
    return this.http.post<any>(environment.apiURL + '/NoteList/InsertRemark', remark).pipe(
      catchError(this.handleError)
    );
  }

  DeleteRemark(remark: Remark) {
    return this.http.post<any>(environment.apiURL + '/NoteList/DeleteRemark', remark).pipe(
      catchError(this.handleError)
    );
  }
  ////////--------------Remark END--------------////////

  ////////--------------FileScore START--------------////////
  GetFileScore(fileScoreParameter: FileScoreParameter) {
    return this.http.post<Remark[]>(environment.apiURL + '/NoteList/GetFileScore', fileScoreParameter).pipe(
      catchError(this.handleError)
    );
  }

  InsertUpdateFileScore(fileScore: FileScore) {
    return this.http.post<any>(environment.apiURL + '/NoteList/InsertUpdateFileScore', fileScore).pipe(
      catchError(this.handleError)
    );
  }
  ////////--------------FileScore END--------------////////

  ////////--------------SubjectInterest START--------------////////
  GetUserSubjectInterest(userSubjectInterestParameter: UserSubjectInterestParameter) {
    return this.http.post<UserSubjectInterest[]>(environment.apiURL + '/NoteList/GetUserSubjectInterest', userSubjectInterestParameter).pipe(
      catchError(this.handleError)
    );
  }

  InsertUserSubjectInterest(filesParameter: FilesParameter) {
    return this.http.post<any>(environment.apiURL + '/NoteList/InsertUserSubjectInterest', filesParameter).pipe(
      catchError(this.handleError)
    );
  }

  DeleteUserSubjectInterest(userSubjectInterestParameter: UserSubjectInterestParameter) {
    return this.http.post<any>(environment.apiURL + '/NoteList/DeleteUserSubjectInterest', userSubjectInterestParameter).pipe(
      catchError(this.handleError)
    );
  }
  ////////--------------SubjectInterest END--------------////////

  ////////--------------Theme Code START--------------////////
  CheckAndSetTheme() {
    // // https://codepen.io/KaioRocha/pen/MdvWmg
    if (localStorage.getItem("setTheme") != undefined) {
      this.themeMode = localStorage.getItem("setTheme");
      if (localStorage.getItem("setTheme") == "0") {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }
  }

  ChangeThemeMode(themeMode) {
    if (themeMode == "1") {
      this.themeMode = "0";
    }
    else {
      this.themeMode = "1";
    }

    localStorage.setItem("setTheme", this.themeMode)
    if (themeMode == "1") {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }
  ////////--------------Theme Code END--------------////////

  //////////////////////////////////////////////////////////
  public downloadFile(file: string, userActionLog: boolean = false): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'GET',
      `${environment.apiURL}/NoteList/Download?file=${file}&userActionLog=${userActionLog}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public uploadFile(file: Blob, fileName: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileName);

    let uploadURL = `${environment.apiURL}/NoteList/UploadFile`;

    return this.http.post<any>(uploadURL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', percentage: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public uploadFile_OLD(file: Blob, fileName: string): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileName);
    return this.http.request(new HttpRequest('POST', environment.apiURL + '/NoteList/Upload', formData,
      {
        reportProgress: true
      }));
  }

  UploadNew(noteList?: Files) {
    const formData = new FormData();
    formData.append('file', noteList.File);
    return this.http.post<any>(environment.apiURL + '/NoteList/UploadNew', formData);
  }

  UploadNew2(formData: any) {
    return this.http.post<any>(environment.apiURL + '/NoteList/UploadNew2', formData);
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
