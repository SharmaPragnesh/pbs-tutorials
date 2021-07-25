import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Files, FilesParameter, UserSubjectInterestParameter } from 'src/app/Models/note-list.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

import { UploadFileComponent } from '../upload-file/upload-file.component';

import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/Services/user.service';

import { Semester } from 'src/app/Models/semester.model';
import { Subject } from 'src/app/Models/subject.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  name = 'Click Me';
  assignedSubjectIds: string;

  //sorting
  config: any;
  key: string = 'SubjectName';
  reverse: boolean = false;

  selectedFile: File = null;
  filesParameter: FilesParameter;
  IsMonitor: boolean = false;
  private newBlogForm: FormGroup;

  public form: {
    name: string;
    email: string;
    resume: FileList | null;
  };

  totalstars: number = 5;
  ///////////////////////////

  noteList: Files;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  ///
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
  ///
  constructor(private route: ActivatedRoute, public router: Router, private translate: TranslateService, public notifyService: NotificationService,
    public noteListService: NoteListService, public userService: UserService, private dialog: MatDialog,
    public semesterService: SemesterService, public subjectService: SubjectService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('welcome to note list');
      this.GetFormModel();

      // if (this.userService.loggedIn()) {
      //   this.GetUserSubjectInterest();
      // }

      if (this.SearchFieldsSelected() && this.noteListService.IsNoteListSearchDone) {
        this.noteListService.GetFilesList();
        this.noteListService.IsSearchDone = true;
      }

      this.config = {
        id: 'paginationNoteList',
        itemsPerPage: environment.pageSize,
        currentPage: 1,
        totalItems: this.noteListService.filesList != undefined ? this.noteListService.filesList.length : 0
      };
    });

    ///////////////////////////
    this.newBlogForm = new FormGroup({
      Name: new FormControl(null),
      TileImage: new FormControl(null)
    });

    this.form = {
      name: "",
      email: "",
      resume: null
    };
  }

  public onButtonClick(event: MouseEvent): void {
    this.name = "Click Me : Clicked note-list !"
    this.noteListService.filesList = null;
    this.Search();
    //alert("Clicked !!");
    console.log("Clicked");
  }

  GetFormModel() {
    if (this.noteListService.filesParameter === undefined) {
      this.filesParameter = {
        InstitutionId: null,
        StudyId: null,
        SemesterId: null,
        LanguageId: this.userService.selectedLanguageId,
        IsApproved: 1
      };
      this.noteListService.filesParameter = this.filesParameter;
    }
    else {
      this.filesParameter = this.noteListService.filesParameter;
      this.filesParameter.LanguageId = Number(this.userService.selectedLanguageId);
      this.filesParameter.IsApproved = 1;
    }
  }

  Search() {
    this.config.currentPage = 1;
    this.noteListService.loading = true;
    this.noteListService.filesParameter.SearchText = '';
    if (environment.ShowConsoleLogs) {
      console.log(this.noteListService.filesParameter);
    }
    const myId = uuid.v4();
    this.GetFormModel();

    if (this.SearchFieldsSelected()) {
      this.noteListService.FilesList().subscribe(res => {
        this.noteListService.filesList = res;
        let tempFilesList = res;
        // debugger;
        this.subjectService.subjectList.forEach(function (value) {
          value.UploadedFiles = (tempFilesList.length > 0) ? tempFilesList.filter(book => book.SubjectId === value.SubjectId).length : 0;
          // console.log(value.UploadedFiles);
        });
        // debugger;
      });
      this.noteListService.IsSearchDone = false;
      this.noteListService.IsNoteListSearchDone = true;
    }
    // this.router.navigate(['/note-list/', myId])
  }

  ClientSemesterChange(semester: Semester) {
    this.noteListService.filesList = null;
    this.subjectService.subjectList = null;
    this.subjectService.subjectParameter.SubjectId = null; //because if subject is selected from frontend then set to null
    this.subjectService.subjectParameter.StudyId = null; //because if user come from study (admin) page then set to null
    this.subjectService.subjectParameter.SemesterId = semester.SemesterId;
    this.filesParameter.SubjectId = 0;
    this.filesParameter.SemesterId = semester.SemesterId;
    this.filesParameter.SemesterName = semester.SemesterName
    this.subjectService.SubjectList().subscribe(res => {
      this.subjectService.subjectList = res as Subject[];
      this.noteListService.IsNoteListSearchDone = true;
      this.Search();
    });
    ///////////
    // this.noteListService.ClientSemesterChange(semester);
    if (this.userService.loggedIn()) {
      this.GetUserSubjectInterest();
    }
    // setTimeout(() => {
    // }, 5000);
    // setInterval(() => {
  }

  // ClientSubjectChange($event) {
  //   this.noteListService.onSubjectChange($event);
  //   if (this.userService.loggedIn()) {
  //     this.GetUserSubjectInterest();
  //   }
  // }

  SearchFieldsSelected() {
    return (this.noteListService.filesParameter.InstitutionId !== 0 && this.noteListService.filesParameter.StudyId !== 0) ||
      this.noteListService.filesParameter.SearchText !== '';
  }

  GetUserSubjectInterest() {
    var userSubjectInterestParameter = {
      UserId: this.userService.userInfo.UserId,
      SemesterId: this.noteListService.filesParameter.SemesterId,
      LanguageId: this.userService.selectedLanguageId
    };

    this.noteListService.GetUserSubjectInterest(userSubjectInterestParameter as UserSubjectInterestParameter).subscribe(data => {
      if (environment.ShowConsoleLogs) {
        console.log(data);
      }
      this.assignedSubjectIds = Array.prototype.map.call(data, s => s.SubjectId).toString()
    }, err => {
      console.log(err);
    });
  }

  SubjectIdExist(subjectId) {
    return this.assignedSubjectIds !== undefined ? this.assignedSubjectIds.indexOf(subjectId) != -1 : false;
  }

  sort(key) {
    if (this.key == key) {
      this.reverse = !this.reverse;
    }
    else {
      this.reverse = false;
    }
    this.key = key;
    if (environment.ShowConsoleLogs) {
      console.log(key);
      console.log(this.reverse);
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ValidateDropdown() {
    if (this.noteListService.filesParameter.InstitutionId == 0 || this.noteListService.filesParameter.StudyId == 0 ||
      this.noteListService.filesParameter.SemesterId == 0 || this.noteListService.filesParameter.SubjectId == 0) {
      var strMessage = this.translate.instant('Messages.BeforeYouUpload')
      if (this.noteListService.filesParameter.InstitutionId == 0) {
        strMessage += "<br>• " + this.translate.instant('PageHeader.Institution');
      }
      if (this.noteListService.filesParameter.StudyId == 0) {
        strMessage += "<br>• " + this.translate.instant('PageHeader.Study');
      }
      if (this.noteListService.filesParameter.SemesterId == 0) {
        strMessage += "<br>• " + this.translate.instant('PageHeader.Semester');
      }
      if (this.noteListService.filesParameter.SubjectId == 0) {
        strMessage += "<br>• " + this.translate.instant('PageHeader.Subject');
      }
      this.notifyService.showErrorHTMLWithTimeout(strMessage, "", environment.timeSpanLarge);
      return false;
    }
    return true;
  }

  ApplyMonitor(SubjectId?: number, SubjectName?: string) {
    this.noteListService.filesParameter.SubjectId = SubjectId;
    this.noteListService.filesParameter.SubjectName = SubjectName;
    if (this.ValidateDropdown()) {
      var filesParameter = {
        SubjectId: this.noteListService.filesParameter.SubjectId
      };

      this.noteListService.InsertUserSubjectInterest(filesParameter as FilesParameter).subscribe(
        res => {
          if (environment.ShowConsoleLogs) {
            console.log(res);
          }
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SubjectMonitorSuccess', { 0: this.noteListService.filesParameter.SubjectName }), "", environment.timeSpanLarge);
          this.IsMonitor = false;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  OpenUploadFilePage(SubjectId?: number, SubjectName?: string) {
    this.noteListService.filesParameter.SubjectId = SubjectId;
    this.noteListService.filesParameter.SubjectName = SubjectName;
    if (this.ValidateDropdown()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = false;
      dialogConfig.panelClass = 'medium-dialog-box';
      dialogConfig.width = "100%";
      //dialogConfig.data = { this.noteListService.filesParameter };//passed the multiple parameter using comma (,)
      this.dialog.open(UploadFileComponent, dialogConfig).afterClosed().subscribe(res => {
        // alert('hello');
      });
    }
  }

  // public downloadStatus(event: ProgressStatus) {
  //   switch (event.status) {
  //     case ProgressStatusEnum.START:
  //       this.showDownloadError = false;
  //       break;
  //     case ProgressStatusEnum.IN_PROGRESS:
  //       this.showProgress = true;
  //       this.percentage = event.percentage;
  //       break;
  //     case ProgressStatusEnum.COMPLETE:
  //       this.showProgress = false;
  //       break;
  //     case ProgressStatusEnum.ERROR:
  //       this.showProgress = false;
  //       this.showDownloadError = true;
  //       break;
  //   }
  // }

  Reset() {
    this.noteListService.ResetNoteListValues();
    this.noteListService.IsSearchDone = false;
    this.noteListService.IsNoteListSearchDone = false;
    this.router.navigate(['/'])
  }

  // // LoginConfirmDialog() {
  // //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  // //     data: {
  // //       title: this.translate.instant('Messages.LoginConfirmationTitle'),
  // //       content: this.translate.instant('Messages.LoginConfirmation'),
  // //       yes: this.translate.instant('Common.CreateLogin'),
  // //       no: this.translate.instant('Common.Close'),
  // //       nocss: "btn-confirm-close",
  // //       yescss: "btn-confirm-confirm"
  // //     }
  // //   });
  // //   dialogRef.afterClosed().subscribe(result => {
  // //     if (result) {
  // //       this.router.navigate(['/login'])
  // //     }
  // //   });
  // // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }

  onSubmit(data) {

    const formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('TileImage', this.selectedFile);

    this.newBlogForm.reset();
  }

  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.noteListService.UploadNew(this.noteList).subscribe((data: any) => {
      //   if (data.status == 200) {
      //     this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", 2000);
      //   }
      //   else{
      //     alert('error');
      //   }

      //   // alert('after success');
      // });

      this.noteListService.uploadFile(file, "aaa").subscribe((data: any) => {
        if (data.status == 200) {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
        }
      });
    }
  }


  //////////////////////////////
  // I submit the job application form.
  public submitApplication(): void {
    console.log(this.form);
    var resume = (this.form.resume && this.form.resume.length)
      ? this.form.resume[0]
      : null;

    this.noteListService.UploadNew2(this.form).subscribe((data: any) => {
      if (data.status == 200) {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", 2000);
      }
      else {
        alert('error');
      }
    });

  }
}
