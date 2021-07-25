import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Files } from 'src/app/Models/note-list.model';
import { Semester } from 'src/app/Models/semester.model';
import { Study } from 'src/app/Models/study.model';
import { Subject } from 'src/app/Models/subject.model';
import { InstitutionService } from 'src/app/Services/institution.service';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { StudyService } from 'src/app/Services/study.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {

  registerForm: FormGroup;
  myfiles: Files;
  studyList: Study[];
  semesterList: Semester[];
  subjectList: Subject[];

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<NoteEditComponent>, private formBuilder: FormBuilder,
    private translate: TranslateService, public notifyService: NotificationService,
    public institutionService: InstitutionService, public studyService: StudyService,
    public semesterService: SemesterService, public subjectService: SubjectService,
    public noteListService: NoteListService, public userService: UserService) { }

  ngOnInit(): void {
    this.FillData();
    this.FillStudies(this.myfiles.InstitutionId, false);
    this.FillSemesters(this.myfiles.StudyId, false);
    this.FillSubjects(this.myfiles.SemesterId, false);
  }

  FillData() {
    this.myfiles = this.data.myfiles;

    this.registerForm = this.formBuilder.group({
      FileId: [this.myfiles.FileId],
      InstitutionId: [this.myfiles.InstitutionId, Validators.required],
      StudyId: [this.myfiles.StudyId, Validators.required],
      SemesterId: [this.myfiles.SemesterId, Validators.required],
      SubjectId: [this.myfiles.SubjectId, Validators.required],
      FileTitle: [this.myfiles.FileTitle, Validators.required],
      FileDescription: [this.myfiles.FileDescription, Validators.required],
      Keyword1: [this.myfiles.Keyword1, Validators.required],
      Keyword2: [this.myfiles.Keyword2],
      Keyword3: [this.myfiles.Keyword3],
      Keyword4: [this.myfiles.Keyword4],
      Keyword5: [this.myfiles.Keyword5]
    });
  }

  ChangeInstitution(e) {
    this.FillStudies(Number(e.target.value), true);
  }

  FillStudies(institutionId: number, userHasChange: boolean) {
    var studyParameter = {
      InstitutionId: institutionId,
      LanguageId: this.userService.selectedLanguageId
    }

    this.studyService.StudyList(studyParameter).subscribe(res => {
      if (environment.ShowConsoleLogs) {
        console.log(res);
      }
      this.studyList = res;
      if (userHasChange) {
        this.registerForm.patchValue({
          StudyId: "",
          SemesterId: "",
          SubjectId: ""
        });
      }
    });
  }

  ChangeStudy(e) {
    this.FillSemesters(Number(e.target.value), true);
  }

  FillSemesters(studyId: number, userHasChange: boolean) {
    var semesterParameter = {
      StudyId: studyId,
      LanguageId: this.userService.selectedLanguageId
    }

    this.semesterService.SemesterList(semesterParameter).subscribe(res => {
      if (environment.ShowConsoleLogs) {
        console.log(res);
      }
      this.semesterList = res;
      if (userHasChange) {
        this.registerForm.patchValue({
          SemesterId: "",
          SubjectId: ""
        });
      }
    });
  }

  ChangeSemester(e) {
    this.FillSubjects(Number(e.target.value), true);
  }

  FillSubjects(semesterId: number, userHasChange: boolean) {
    var subjectParameter = {
      SemesterId: semesterId,
      LanguageId: this.userService.selectedLanguageId
    }

    this.subjectService.SubjectList(subjectParameter).subscribe(res => {
      if (environment.ShowConsoleLogs) {
        console.log(res);
      }
      this.subjectList = res;
      if (userHasChange) {
        this.registerForm.patchValue({
          SubjectId: ""
        });
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm.value);
    }
    if (this.registerForm.invalid) {
      return false;
    }
    else {
      //Save the data
      this.noteListService.UpdateFile(this.registerForm.value).subscribe(
        res => {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          this.userService.needRefreshPage = true;
          this.dialogRef.close();
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
