import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { NoteListService } from 'src/app/Services/note-list.service';
import { InstitutionService } from 'src/app/Services/institution.service';
import { StudyService } from 'src/app/Services/study.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { SubjectService } from 'src/app/Services/subject.service';

import { environment } from 'src/environments/environment';
import { SubjectComponent } from '../subject.component';
import { Subject, SubjectParameter } from 'src/app/Models/subject.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/Components/Shared/confirmation-dialog/confirmation-dialog.component';
import { TermType } from 'src/app/Models/note-list.model';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'Sorting';
  reverse: boolean = false;

  iCount: number;
  subjectA: Subject;
  subjectB: Subject;
  subjectC: Subject;

  disableSaveOrder: boolean = true;
  tempList: Subject[] = null;
  subjectList: Subject[] = null;

  subjectParameter: SubjectParameter;

  constructor(private translate: TranslateService, private notifyService: NotificationService,
    private dialog: MatDialog, private deleteConfirmDialog: MatDialog, public noteListService: NoteListService,
    public institutionService: InstitutionService, public studyService: StudyService,
    public semesterService: SemesterService, public subjectService: SubjectService) { }

  ngOnInit(): void {
    if (this.subjectService.subjectParameter.SemesterId == 0) {
      this.key = 'Ordering';
      this.reverse = true;
    }

    debugger;
    this.subjectService.GetFormModel();
    this.subjectService.subjectParameter.SubjectId = null; //because if subject is selected from frontend then set to null
    // // // this.subjectService.subjectParameter.SubjectNo = null;
    this.GetSubjectList();
  }

  GetSubjectList() {
    this.subjectService.SubjectList().subscribe(
      res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.subjectService.subjectList = res;
        this.subjectList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onStudyChange(subject: any) {
    this.key = 'Ordering';
    this.reverse = true;

    this.noteListService.onStudyChange(subject);
    this.subjectService.subjectParameter.StudyId = this.noteListService.filesParameter.StudyId;
    this.subjectService.subjectParameter.SemesterId = 0;

    if (this.noteListService.filesParameter.StudyId == 0) {
      this.noteListService.filesParameter.TermType = TermType.Semester;
    }
    else {
      const currentStudy = Object.assign({}, this.studyService.studyList.filter(x => x.StudyId == this.noteListService.filesParameter.StudyId)[0]);
      this.noteListService.filesParameter.TermType = currentStudy.TermType;
    }
    this.GetSubjectList();
  }

  onSemesterChange(semester: any) {
    if (this.noteListService.ConvertToId(semester) == 0) {
      this.key = 'Ordering';
      this.reverse = true;
    }
    else {
      this.key = 'Sorting';
      this.reverse = false;
    }

    this.subjectService.subjectParameter.StudyId = this.noteListService.filesParameter.StudyId;
    this.noteListService.onSemesterChange(semester, false);
    this.GetSubjectList();
  }

  AddOrEditSubject(SemesterId: number, SubjectId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";
    dialogConfig.data = { SemesterId, SubjectId };//passed the multiple parameter using comma (,)
    this.dialog.open(SubjectComponent, dialogConfig).afterClosed().subscribe(res => {
      this.GetSubjectList();
    });
  }

  DeleteConfirmDialog(subject: Subject): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteSubject(subject);
      }
    });
  }

  DeleteSubject(subject: Subject) {
    subject.IsForDelete = true;
    this.subjectService.InsertUpdateSubject(subject).subscribe(
      res => {
        this.GetSubjectList();
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteSuccess'), "", environment.timeSpanMedium);
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      }
    );
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
    this.ChangeSortOrder();
  }

  ChangeSortOrder() {
    this.iCount = 1;
    this.tempList = Object.assign([], this.subjectList);
    this.tempList.sort((book1, book2) => {
      return this.reverse ? this.noteListService.CompareObjects(book2, book1, this.key) : this.noteListService.CompareObjects(book1, book2, this.key);
    })

    for (let id of this.tempList) {
      id.Sorting = this.iCount;
      this.iCount++;
    }
    this.disableSaveOrder = false;
  }

  MoveUp(index: number) {
    this.subjectA = this.subjectList[index];
    this.subjectB = this.subjectList[index - 1];
    this.subjectC = this.subjectA;

    this.subjectList[index] = this.subjectB;
    this.subjectList[index - 1] = this.subjectC;

    this.subjectA = this.subjectList[index];
    const c = this.subjectA["Sorting"];
    this.subjectList[index].Sorting = this.subjectList[index - 1].Sorting;
    this.subjectList[index - 1].Sorting = c;
    this.disableSaveOrder = false;
  }

  MoveDown(index: number) {
    this.subjectA = this.subjectList[index];
    this.subjectB = this.subjectList[index + 1];
    this.subjectC = this.subjectA;

    this.subjectList[index] = this.subjectB;
    this.subjectList[index + 1] = this.subjectC;

    this.subjectA = this.subjectList[index];
    const c = this.subjectA["Sorting"];
    this.subjectList[index].Sorting = this.subjectList[index + 1].Sorting;
    this.subjectList[index + 1].Sorting = c;
    this.disableSaveOrder = false;
  }

  UpdateSubjectSorting() {
    if (environment.ShowConsoleLogs) {
      console.log(this.subjectList);
    }
    const subjectIds = Array.prototype.map.call(this.subjectList, s => s.SubjectId).toString();
    var subject = { UpDown: subjectIds };
    this.subjectService.UpdateSubjectSorting(subject as Subject).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SortingSuccess'), "", environment.timeSpanMedium);
        this.GetSubjectList();
        this.disableSaveOrder = true;
      },
      err => {
        console.log(err);
      }
    );
  }
}
