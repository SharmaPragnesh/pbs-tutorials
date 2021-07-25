import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { InstitutionService } from 'src/app/Services/institution.service';
import { StudyService } from 'src/app/Services/study.service';

import { Study, TermTypesParameter } from 'src/app/Models/study.model';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SubjectParameter } from 'src/app/Models/subject.model';
import { SemesterService } from 'src/app/Services/semester.service';
import { TermTypeComponent } from './term-type/term-type.component';
import { UserService } from 'src/app/Services/user.service';
import { TermTypeListComponent } from './term-type-list/term-type-list.component';
import { TermTypeOptionalNameComponent } from './term-type-optional-name/term-type-optional-name.component';
import { NoteListService } from 'src/app/Services/note-list.service';
import { Semester } from 'src/app/Models/semester.model';
import { SubjectService } from 'src/app/Services/subject.service';
import { ConfirmationDialogComponent } from '../../Shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  registerForm: FormGroup;
  formData: Study;
  isValid: boolean = true;
  oldSemesterNo: number;
  //
  danishName: string;
  englishName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<StudyComponent>,
    private formBuilder: FormBuilder, private translate: TranslateService, private notifyService: NotificationService,
    public institutionService: InstitutionService, public studyService: StudyService, private deleteConfirmDialog: MatDialog,
    public semesterService: SemesterService, private subjectService: SubjectService, public noteListService: NoteListService,
    public userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      StudyId: [0],
      InstitutionId: ['', Validators.required],
      StudyNo: [null, { validators: [Validators.required, Validators.minLength(4)], asyncValidators: [this.studyService.StudyNoValidator()], updateOn: 'change' }],
      StudyName: [''],
      StudyNameDaDK: ['', Validators.required],
      StudyNameEnUS: ['', Validators.required],
      TermTypeId: ['1'],
      SemesterNo: ['', Validators.required]
    });

    if (this.data.InstitutionId != 0) {
      this.registerForm.patchValue({
        InstitutionId: Number(this.data.InstitutionId)
      });
    }

    if (this.data.StudyId != 0) {
      this.studyService.studyRegisterForm = Object.assign({}, this.studyService.studyList.filter(x => x.StudyId == this.data.StudyId)[0]);
      this.formData = Object.assign({}, this.studyService.studyList.filter(x => x.StudyId == this.data.StudyId)[0]);

      this.registerForm.patchValue({
        StudyId: this.formData.StudyId,
        InstitutionId: Number(this.formData.InstitutionId),
        StudyNo: this.formData.StudyNo,
        StudyName: this.formData.StudyName,
        StudyNameDaDK: this.formData.StudyNameDaDK,
        StudyNameEnUS: this.formData.StudyNameEnUS,
        TermTypeId: this.formData.TermTypeId,
        SemesterNo: this.formData.SemesterNo,
      });
      this.oldSemesterNo = this.formData.SemesterNo;
      this.noteListService.ClientStudyChange(this.registerForm.value, false);
      this.GetSubjectList();
    }
    else {
      this.studyService.studyRegisterForm = Object.assign({}, this.registerForm.value);
      this.semesterService.semesterList = null;
    }
    this.SetName(Number(this.registerForm.value.TermTypeId));
  }

  GetSubjectList() {
    this.subjectService.subjectParameter.StudyId = this.noteListService.filesParameter.StudyId;
    this.subjectService.SubjectList().subscribe(
      res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.subjectService.subjectList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() { //Save button
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm);
    }

    if (this.registerForm.invalid) {
      return false;
    }
    else {
      const semesterNo = Number(this.registerForm.value.SemesterNo);
      if (semesterNo < this.oldSemesterNo) {
        var strSemesters = "";
        const constSubjectList = this.subjectService.subjectList;
        this.semesterService.semesterList.forEach(function (semester, index) {
          if (semester.IsForDelete) {
            if (constSubjectList.filter(x => x.SemesterId == semester.SemesterId).length > 0) {
              strSemesters = strSemesters + semester.SemesterName + ",";
            }
          }
        });

        if (strSemesters != "") {
          strSemesters = strSemesters.substring(0, strSemesters.length - 1);
          const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
            data: {
              content: this.translate.instant('Messages.DeleteSemesterConfirmation', { 0: strSemesters }),
              title: this.translate.instant('Messages.ConfirmationTitle')
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.InsertUpdateStudy(this.registerForm, true);
            }
          });
          ////#639 OLD ALERT CODE
          // if (confirm(this.translate.instant('Messages.DeleteSemesterConfirmation', { 0: strSemesters }))) {
          //   this.InsertUpdateStudy(this.registerForm, true);
          // }
        }
        else {
          this.InsertUpdateStudy(this.registerForm, true);
        }
      }
      else {
        this.InsertUpdateStudy(this.registerForm, false);
      }
      return false;
    }
  }

  InsertUpdateStudy(registerForm: FormGroup, isForDelete: boolean) {
    this.studyService.InsertUpdateStudy(registerForm.value).subscribe(
      res => {
        console.log('sucess InsertUpdateStudy');
        console.log(res);

        if (res["action"] == "new") {
          this.semesterService.semesterList.forEach(function (semester, index) {
            semester.StudyId = Number(res["res"]);
          });
        }

        this.semesterService.InsertUpdateSemesteronStudy(this.semesterService.semesterList).subscribe(res => {
          console.log('success InsertUpdateSemesteronStudy');
          console.log(res);
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          this.dialogRef.close();
        })
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      }
    )
  }

  SetName(val: number) {
    this.studyService.termTypesList.forEach(termType => {
      if (termType.TermTypeId == val) {
        this.danishName = termType.TermTypeDaDK;
        this.englishName = termType.TermTypeEnUS;
      }
    });
  }

  ChangeTermType(e: any) {
    this.SetName(Number(e.target.value));

    const danishName = this.danishName;
    const englishName = this.englishName;

    this.semesterService.semesterList.forEach(function (semester, index) {
      semester.SemesterNameDaDK = danishName + " " + (index + 1);
      semester.SemesterNameEnUS = englishName + " " + (index + 1);
      semester.IsModified = true;
    });
  }

  onNumberChange(numberValue: number): void {
    numberValue = Number(numberValue);

    if (this.semesterService.semesterList == null) {//New Study Case
      for (let i = 1; i <= numberValue; i++) {
        var semester = {
          InstitutionId: this.noteListService.filesParameter.InstitutionId,
          IsForDelete: false,
          SemesterId: 0,
          SemesterNameDaDK: this.danishName + " " + i,
          SemesterNameEnUS: this.englishName + " " + i,
          SemesterNo: i,
          StudyId: 0
        }
        this.semesterService.semesterList = this.semesterService.semesterList || []; //assign an empty array
        this.semesterService.semesterList.push(semester);
      }
    }
    else {//Edit Study Case
      if (numberValue < this.semesterService.semesterList.length) {
        for (let i = numberValue; i < this.semesterService.semesterList.length; i++) {
          this.semesterService.semesterList[i].IsForDelete = true;
        }
      }
      else if (numberValue > this.semesterService.semesterList.length) {
        const studyId = this.semesterService.semesterList[0].StudyId;
        for (let i = this.semesterService.semesterList.length + 1; i <= numberValue; i++) {
          var semester = {
            InstitutionId: this.noteListService.filesParameter.InstitutionId,
            IsForDelete: false,
            SemesterId: 0,
            SemesterNameDaDK: this.danishName + " " + i,
            SemesterNameEnUS: this.englishName + " " + i,
            SemesterNo: (i + 1),
            StudyId: studyId
          }
          this.semesterService.semesterList.push(semester);
        }
      }
    }
  }

  ChangeTermTypeOptionalName() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";

    dialogConfig.data = {};//passed the multiple parameter using comma (,)
    const semesterNo = Number(this.registerForm.value.SemesterNo);

    this.dialog.open(TermTypeOptionalNameComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {
        this.registerForm.patchValue({
          SemesterNo: Number(this.semesterService.semesterList.filter(this.semesterService.filterSemester).length)
        });
      }
    });
  }

  //Below Functionality is yet not display.
  AddTermType() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";

    dialogConfig.data = {};//passed the multiple parameter using comma (,)
    this.dialog.open(TermTypeComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {
        if (this.studyService.termTypesList != null && this.studyService.termTypesList.length > 0) {
          const termTypeId = this.studyService.termTypesList[this.studyService.termTypesList.length - 1].TermTypeId;
          this.registerForm.patchValue({
            TermTypeId: Number(termTypeId)
          });
        }
        this.userService.needRefreshPage = false;
      }
    });
  }

  GetTermTypeList() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";

    dialogConfig.data = {};//passed the multiple parameter using comma (,)
    this.dialog.open(TermTypeListComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {

      }
    });
  }
}
