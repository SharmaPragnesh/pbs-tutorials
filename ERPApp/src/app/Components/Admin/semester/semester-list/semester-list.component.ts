import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { NoteListService } from 'src/app/Services/note-list.service';
import { InstitutionService } from 'src/app/Services/institution.service';
import { StudyService } from 'src/app/Services/study.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { SubjectService } from 'src/app/Services/subject.service';

import { SemesterComponent } from '../semester.component';
import { Semester, SemesterParameter } from 'src/app/Models/semester.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { SubjectParameter } from 'src/app/Models/subject.model';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss']
})
export class SemesterListComponent implements OnInit {

  semester: Semester;
  semesterParameter: SemesterParameter;
  NoOfSemesters: number;

  constructor(private router: Router, private translate: TranslateService,
    private notifyService: NotificationService, private dialog: MatDialog, public noteListService: NoteListService,
    public institutionService: InstitutionService, public studyService: StudyService, public semesterService: SemesterService,
    public subjectService: SubjectService) { }

  ngOnInit(): void {
    this.semesterService.GetSemesterList();
  }

  ShowSubjects(semester: Semester) {
    this.subjectService.subjectParameter.SemesterId = semester.SemesterId;
    this.noteListService.filesParameter.SemesterId = semester.SemesterId;
    this.router.navigate(['/admin/subject']);
  }

  AddOrEditSemester(form: NgForm) {
    // if (form.value["NoOfSemesters"] !== '' && form.value["NoOfSemesters"] != undefined) {
    //   console.log(form.value);
    //   const noOfSemesters = Number(form.value["NoOfSemesters"]);
    //   const len = this.semesterService.semesterList.length;

    //   if (noOfSemesters < len) {
    //     var subjectParameter = { StudyId: this.noteListService.filesParameter.StudyId, SemesterNo: noOfSemesters, LanguageId: 1 };
    //     this.semesterService.ValidateSemester(subjectParameter as SubjectParameter).subscribe(
    //       res => {
    //         if (res.semesterNos != '') {
    //           if (confirm(this.translate.instant('Messages.DeleteSemesterConfirmation', { 0: res.semesterNos }))) {
    //             this.InsertUpdateSemester(noOfSemesters, true);
    //           }
    //         }
    //         else {
    //           this.InsertUpdateSemester(noOfSemesters, true);
    //         }
    //       },
    //       err => {
    //         if (err === "ErrorFromWebAPI")
    //           this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
    //         else
    //           console.log(err);
    //       }
    //     );
    //   }
    //   else {
    //     this.InsertUpdateSemester(noOfSemesters, false);
    //   }
    // }
  }

  InsertUpdateSemester(noOfSemesters: number, isForDelete: boolean) {
    var semester = { StudyId: this.noteListService.filesParameter.StudyId, SemesterNo: noOfSemesters, IsForDelete: isForDelete };
    this.semesterService.InsertUpdateSemester(semester as Semester).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
        this.semesterService.GetSemesterList();
        // this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteSuccess'), "", environment.timeSpanMedium);
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      }
    );
  }

  // AddOrEditSemester(StudyId: number, SemesterId: number) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = false;
  //   dialogConfig.width = "50%";
  //   dialogConfig.data = { StudyId, SemesterId };//passed the multiple parameter using comma (,)
  //   this.dialog.open(SemesterComponent, dialogConfig).afterClosed().subscribe(res => {
  //     // alert('hello');
  //   });
  // }

  DeleteSemester(semester: Semester) {
    if (confirm(this.translate.instant('Messages.DeleteConfirmation'))) {
      semester.IsForDelete = true;
      semester.SemesterNo = 0;
      semester.StudyId = 0;
      this.semesterService.InsertUpdateSemester(semester).subscribe(
        res => {
          this.semesterService.GetSemesterList();
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
  }
}
