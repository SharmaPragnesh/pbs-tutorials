import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Files, FilesParameter, SearchFiles, SearchFilesStudyList, UserSubjectInterestParameter } from 'src/app/Models/note-list.model';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/Models/progress-status.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-note-search-list',
  templateUrl: './note-search-list.component.html',
  styleUrls: ['./note-search-list.component.scss']
})
export class NoteSearchListComponent implements OnInit {

  assignedSubjectIds: string;

  //sorting
  config: any;
  key: string = 'StudyId';
  reverse: boolean = true;

  selectedFile: File = null;
  filesParameter: FilesParameter;
  IsMonitor: boolean = false;
  private newBlogForm: FormGroup;

  filesList: Files[] = null;
  seachFiles: SearchFiles;

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

  noSearchFound: string;
  searchFilesStudyFoundList: SearchFilesStudyList[];
  searchFilesStudyNotFoundList: SearchFilesStudyList[];

  constructor(private route: ActivatedRoute, public router: Router, private translate: TranslateService, public notifyService: NotificationService,
    public noteListService: NoteListService, public userService: UserService, private dialog: MatDialog,
    public semesterService: SemesterService, public subjectService: SubjectService) {
    this.filesList = null;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('welcome to note-search-list');

      if (localStorage.getItem('searchtext') != null) {
        this.noteListService.filesParameter.SearchText = localStorage.getItem('searchtext');
      }
      this.GetFormModel();
      if (this.userService.loggedIn()) {
        this.GetUserSubjectInterest();
      }
      else {
        if (this.SearchFieldsSelected()) {
          this.GetFilesList();
        }
      }
    });
  }

  //This method is used for Get the No. of SubjectId those are already monitored.
  GetUserSubjectInterest() {
    var userSubjectInterestParameter = {
      UserId: this.userService.userInfo.UserId,
      LanguageId: this.userService.selectedLanguageId
    };

    this.noteListService.GetUserSubjectInterest(userSubjectInterestParameter as UserSubjectInterestParameter).subscribe(data => {
      if (environment.ShowConsoleLogs) {
        console.log(data);
      }

      if (this.SearchFieldsSelected()) {
        this.GetFilesList();
      }
      this.assignedSubjectIds = Array.prototype.map.call(data, s => s.SubjectId).toString()
    }, err => {
      console.log(err);
    });
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
    this.filesList = null;
    this.searchFilesStudyFoundList = [];
    this.searchFilesStudyNotFoundList = [];
  }

  SearchFieldsSelected() {
    return (this.noteListService.filesParameter.InstitutionId !== 0 && this.noteListService.filesParameter.StudyId !== 0) ||
      this.noteListService.filesParameter.SearchText !== '';
  }

  GetFilesList() {
    this.noteListService.SearchFilesList().subscribe(res => {
      if (environment.ShowConsoleLogs) {
        console.log(res);
      }
      this.seachFiles = res;
      this.noteListService.IsSearchDone = true;
      this.noteListService.IsNoteListSearchDone = true;

      //If FilesFoundList found then make distinct StudyIds
      if (this.seachFiles.FilesFoundList != null) {
        let distinctStudyIdsFilesFound = this.seachFiles.FilesFoundList.map(item => item.StudyId)
          .filter((value, index, self) => self.indexOf(value) === index);

        for (let studyId of distinctStudyIdsFilesFound) {
          this.searchFilesStudyFoundList.push({
            StudyId: studyId,
            FilesList: this.seachFiles.FilesFoundList.filter(book => book.StudyId === studyId)
          })
        }
        console.log('------  searchFilesStudyFoundList ------ ');
        console.log(this.searchFilesStudyFoundList);

        if (this.seachFiles.FilesFoundList.length == 0) {
          this.noSearchFound = this.noteListService.filesParameter.SearchText;
        }
      }

      //If FilesFoundList NOT found then make distinct StudyIds
      if (this.seachFiles.FilesNotFoundList !== null) {
        let distinctStudyIdsFilesNotFoundList = this.seachFiles.FilesNotFoundList.map(item => item.StudyId)
          .filter((value, index, self) => self.indexOf(value) === index);

        for (let studyId of distinctStudyIdsFilesNotFoundList) {
          this.searchFilesStudyNotFoundList.push({
            StudyId: studyId,
            FilesList: this.seachFiles.FilesNotFoundList.filter(book => book.StudyId === studyId)
          })
        }
        console.log('------ searchFilesStudyNotFoundList ------');
        console.log(this.searchFilesStudyNotFoundList);

        if (this.seachFiles.FilesNotFoundList.length == 0) {
          this.noSearchFound = this.noteListService.filesParameter.SearchText;
        }
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  // IsShowEmptyRecords() {
  //   var retVal = false;
  //   if (this.seachFiles != undefined) {
  //     retVal = this.seachFiles && this.seachFiles.FilesNotFoundList && this.seachFiles.FilesNotFoundList?.length > 0;
  //   }
  //   return retVal;
  // }

  Reset() {
    localStorage.removeItem('searchtext');
    this.noteListService.ResetNoteListValues();
    this.noteListService.IsSearchDone = false;
    this.noteListService.IsNoteListSearchDone = false;
    this.router.navigate(['/'])
  }

  public downloadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

}
