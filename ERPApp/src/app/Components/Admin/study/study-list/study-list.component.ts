import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { NoteListService } from 'src/app/Services/note-list.service';
import { InstitutionService } from 'src/app/Services/institution.service';
import { StudyService } from 'src/app/Services/study.service';
import { SemesterService } from 'src/app/Services/semester.service';

import { environment } from 'src/environments/environment';
import { StudyComponent } from '../study.component';
import { Study, TermTypesParameter } from 'src/app/Models/study.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubjectService } from 'src/app/Services/subject.service';
import { ConfirmationDialogComponent } from 'src/app/Components/Shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss']
})
export class StudyListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'Sorting';
  reverse: boolean = false;

  iCount: number;
  studyA: Study;
  studyB: Study;
  studyC: Study;

  disableSaveOrder: boolean = true;
  tempList: Study[] = null;
  studyList: Study[] = null;

  constructor(private router: Router, private translate: TranslateService,
    private notifyService: NotificationService, private dialog: MatDialog, private deleteConfirmDialog: MatDialog,
    public noteListService: NoteListService,
    public institutionService: InstitutionService, public studyService: StudyService, private semesterService: SemesterService,
    public subjectService: SubjectService) { }

  ngOnInit(): void {
    this.GetStudyList();
    this.GetTermTypeList();
  }

  GetStudyList() {
    this.studyService.StudyList().subscribe(
      res => {
        this.studyService.studyList = res;
        this.studyList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  GetTermTypeList() {
    var termTypesParameter = {
      TermTypeId: null,
    }
    this.studyService.TermTypeList(termTypesParameter as TermTypesParameter).subscribe(
      res => {
        console.log(res);
        this.studyService.termTypesList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onInsititutionChange(institution: any) {
    this.noteListService.onInsititutionChange(institution, false);
    this.GetStudyList();
  }

  ShowSubjects(study: Study) {
    this.semesterService.semesterParameter.StudyId = study.StudyId;
    this.noteListService.filesParameter.StudyId = study.StudyId;
    this.noteListService.filesParameter.StudyName = study.StudyName;
    this.subjectService.subjectParameter.StudyId = this.noteListService.filesParameter.StudyId;
    this.semesterService.GetSemesterList();

    const currentStudy = Object.assign({}, this.studyService.studyList.filter(x => x.StudyId == this.noteListService.filesParameter.StudyId)[0]);
    this.noteListService.filesParameter.TermType = currentStudy.TermType;

    this.router.navigate(['/admin/subject']);
  }

  AddOrEditStudy(InstitutionId: number, StudyId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";
    dialogConfig.data = { InstitutionId, StudyId };//passed the multiple parameter using comma (,)
    this.dialog.open(StudyComponent, dialogConfig).afterClosed().subscribe(res => {
      this.GetStudyList();
      // alert('hello');
    });
  }

  DeleteConfirmDialog(study: Study): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteStudy(study);
      }
    });
  }

  DeleteStudy(study: Study) {
    study.IsForDelete = true;
    this.studyService.InsertUpdateStudy(study).subscribe(
      res => {
        this.GetStudyList();
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
    this.tempList = Object.assign([], this.studyList);
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
    this.studyA = this.studyList[index];
    this.studyB = this.studyList[index - 1];
    this.studyC = this.studyA;

    this.studyList[index] = this.studyB;
    this.studyList[index - 1] = this.studyC;

    this.studyA = this.studyList[index];
    const c = this.studyA["Sorting"];
    this.studyList[index].Sorting = this.studyList[index - 1].Sorting;
    this.studyList[index - 1].Sorting = c;
    this.disableSaveOrder = false;
  }

  MoveDown(index: number) {
    this.studyA = this.studyList[index];
    this.studyB = this.studyList[index + 1];
    this.studyC = this.studyA;

    this.studyList[index] = this.studyB;
    this.studyList[index + 1] = this.studyC;

    this.studyA = this.studyList[index];
    const c = this.studyA["Sorting"];
    this.studyList[index].Sorting = this.studyList[index + 1].Sorting;
    this.studyList[index + 1].Sorting = c;
    this.disableSaveOrder = false;
  }

  UpdateStudySorting() {
    if (environment.ShowConsoleLogs) {
      console.log(this.studyList);
    }
    const studyIds = Array.prototype.map.call(this.studyList, s => s.StudyId).toString();
    var study = { UpDown: studyIds };
    this.studyService.UpdateStudySorting(study as Study).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SortingSuccess'), "", environment.timeSpanMedium);
        this.GetStudyList();
        this.disableSaveOrder = true;
      },
      err => {
        console.log(err);
      }
    );
  }
}
