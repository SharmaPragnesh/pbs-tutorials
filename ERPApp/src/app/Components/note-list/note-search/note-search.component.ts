import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Files, FilesParameter, UserSubjectInterestParameter } from 'src/app/Models/note-list.model';

import { environment } from 'src/environments/environment';

import { UploadFileComponent } from '../../upload-file/upload-file.component';

import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/Services/user.service';

import { Semester } from 'src/app/Models/semester.model';
import { Subject } from 'src/app/Models/subject.model';

import * as uuid from 'uuid';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.scss']
})
export class NoteSearchComponent implements OnInit {

  name = 'Click Me';

  InstitutionId: number;
  InstitutionName: string;
  StudyId: number;
  StudyName: string;
  TermType: string;

  @Input() assignedSubjectIds: string;
  @Input() isFilesFoundList: boolean = true;
  @Input() studyId: number;
  @Input() filesList: Files[] = null;

  firstSemYearId: number;
  subjectList: Subject[] = null;
  semesterList: Semester[] = null;

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(public noteListService: NoteListService, public userService: UserService, private dialog: MatDialog,
    public router: Router, private translate: TranslateService, public notifyService: NotificationService) {
  }

  ngOnInit(): void {
    console.log('-----------------------------------------[StudyId=' + this.studyId + ']-----------------------------------------');
    console.log(this.assignedSubjectIds);

    if (this.filesList != null) {
      this.GetSemesterYearList();
      this.GetSubjectAndNotesList(this.firstSemYearId);
    }
  }

  GetSemesterYearList() {
    let isFilesFoundList = this.isFilesFoundList;

    if (this.filesList.length > 0) {
      this.InstitutionId = this.filesList[0].InstitutionId;
      this.InstitutionName = this.filesList[0].InstitutionName;
      this.StudyId = this.filesList[0].StudyId;
      this.StudyName = this.filesList[0].StudyName;
      this.TermType = this.filesList[0].TermType;
    }

    let tempSemesterList = this.filesList.map(item => ({
      SemesterId: item.SemesterId,
      InstitutionId: item.InstitutionId,
      InstitutionName: item.InstitutionName,
      StudyId: item.StudyId,
      StudyName: item.StudyName,
      // SemesterNo: item.SemesterNo,
      Sorting: item.SemesterOrdering,
      SemesterName: item.SemesterName,
      UploadedFiles: 0
    }))

    this.semesterList = tempSemesterList.reduce((accumalator, current) => {
      if (!accumalator.some(item =>
        item.SemesterId === current.SemesterId)) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);

    this.semesterList = this.semesterList.sort((n1, n2) => n1.Sorting - n2.Sorting);
    this.firstSemYearId = (this.semesterList.length > 0) ? this.semesterList[0].SemesterId : 0;

    console.log(this.semesterList.length + ' Semesters/Years in Study=' + this.semesterList[0].StudyName);

    // // //Below Code is Commented because Michael don't want Count, After Semester/Year buttons. E.g. Year (34)
    // // this.semesterList.forEach(function (value) {
    // //   value.UploadedFiles = isFilesFoundList ? tempSemesterList.filter(book => book.SemesterId === value.SemesterId).length : 0;
    // //   // console.log(value.UploadedFiles);
    // // });
  }

  GetSubjectAndNotesList(semesterNo: any) {
    this.firstSemYearId = semesterNo;

    let courseArray1 = this.filesList.map(item => ({
      SubjectId: item.SubjectId,
      SubjectName: item.SubjectName,
      SemesterId: item.SemesterId,
      SemesterNo: item.SemesterNo,
      SemesterName: item.SemesterName,
      UploadedFiles: 0
    }))
      .filter(book => book.SemesterId === semesterNo);

    //Remove the Duplicate Items
    this.subjectList = courseArray1.reduce((accumalator, current) => {
      if (!accumalator.some(item =>
        item.SubjectId === current.SubjectId &&
        item.SemesterId === current.SemesterId)) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    console.log('=================== Subjects (count=' + this.subjectList?.length + ') ===================');
    // console.log(this.subjectList);

    let tempFilesList = this.filesList.map(item => ({
      SemesterId: item.SemesterId,
      InstitutionId: item.InstitutionId,
      InstitutionName: item.InstitutionName,
      StudyId: item.StudyId,
      StudyName: item.StudyName,
      SemesterNo: item.SemesterNo,
      SemesterName: item.SemesterName,
      SubjectId: item.SubjectId,
      UploadedFiles: 0
    }))

    if (this.isFilesFoundList) {
      this.subjectList.forEach(function (value) {
        value.UploadedFiles = tempFilesList.filter(book => book.SubjectId === value.SubjectId).length;
        console.log('******* ' + value.SubjectName + ' (count=' + value.UploadedFiles + ') *******');
      });
    }
  }

  SubjectIdExist(subjectId) {
    return this.assignedSubjectIds !== undefined ? this.assignedSubjectIds.indexOf(subjectId) != -1 : false;
  }

  ApplyMonitor(SubjectId?: number, SubjectName?: string) {
    this.noteListService.filesParameter.SubjectId = SubjectId;
    this.noteListService.filesParameter.SubjectName = SubjectName;
    if (true) {
      var filesParameter = {
        SubjectId: this.noteListService.filesParameter.SubjectId
      };

      this.noteListService.InsertUserSubjectInterest(filesParameter as FilesParameter).subscribe(
        res => {
          if (environment.ShowConsoleLogs) {
            console.log(res);
          }
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SubjectMonitorSuccess', { 0: this.noteListService.filesParameter.SubjectName }), "", environment.timeSpanLarge);
          this.assignedSubjectIds = this.assignedSubjectIds + ',' + this.noteListService.filesParameter.SubjectId;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  OpenUploadFilePage(subject: Subject) {
    this.noteListService.filesParameter.InstitutionId = this.InstitutionId;
    this.noteListService.filesParameter.InstitutionName = this.InstitutionName;
    this.noteListService.filesParameter.StudyId = this.StudyId;
    this.noteListService.filesParameter.StudyName = this.StudyName;
    this.noteListService.filesParameter.SemesterId = subject.SemesterId;
    this.noteListService.filesParameter.SemesterName = subject.SemesterName;
    this.noteListService.filesParameter.SubjectId = subject.SubjectId;
    this.noteListService.filesParameter.SubjectName = subject.SubjectName;
    if (true) {
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

  public onButtonClick(event: MouseEvent): void {
    // this.name = "Click Me : Clicked note-list !"
    this.noteListService.filesList = null;
    // this.Search();
    //alert("Clicked !!");
    const myId = uuid.v4();
    this.router.navigate(['/note-search-list/', myId])
    console.log("Clicked");
  }
}
