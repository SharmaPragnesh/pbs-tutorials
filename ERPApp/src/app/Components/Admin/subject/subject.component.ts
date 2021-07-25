import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { InstitutionService } from 'src/app/Services/institution.service';
import { StudyService } from 'src/app/Services/study.service';
import { SubjectService } from 'src/app/Services/subject.service';

import { Subject, SubjectLookup } from 'src/app/Models/subject.model';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SemesterService } from 'src/app/Services/semester.service';
import { SubjectLookupComponent } from './subject-lookup/subject-lookup.component';
import { NoteListService } from 'src/app/Services/note-list.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  registerForm: FormGroup;
  formData: Subject;
  isValid: boolean = true;
  fruits: any[]; //['Mango', 'Grapes', 'Strawberry', 'Oranges'];
  favFruitsError: Boolean = false;
  selectedFruitValues = [];
  toggleMultipleSemesters: boolean = false;
  tempSubjectLookupList: SubjectLookup[] = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<SubjectComponent>,
    private formBuilder: FormBuilder, private translate: TranslateService, private notifyService: NotificationService,
    public institutionService: InstitutionService, public studyService: StudyService,
    public semesterService: SemesterService, public subjectService: SubjectService,
    private dialog: MatDialog, public noteListService: NoteListService) { }

  ngOnInit(): void {
    this.subjectService.GetSubjectLookupFormModel(this.noteListService.filesParameter.InstitutionId, this.noteListService.filesParameter.StudyId);
    this.GetSubjectLookupList();
    this.fruits = this.semesterService.semesterList;

    this.registerForm = this.formBuilder.group({
      SubjectId: [0],
      SemesterId: ['', Validators.required],
      SubjectNo: [null, { validators: [Validators.required, Validators.minLength(4)], asyncValidators: [this.subjectService.SubjectNoValidator()], updateOn: 'change' }],
      StudyName: [''],
      SubjectNameDaDK: ['', Validators.required],
      SubjectNameEnUS: ['', Validators.required],
      favFruits: this.addFruitsControls(),
    });

    if (this.data.SemesterId != 0) {
      this.registerForm.patchValue({
        SemesterId: Number(this.data.SemesterId)
      });
    }
    else {
      this.toggleMultipleSemesters = true;
    }

    if (this.data.SubjectId != 0) {
      this.subjectService.subjectRegisterForm = Object.assign({}, this.subjectService.subjectList.filter(x => x.SubjectId == this.data.SubjectId)[0]);
      this.subjectService.subjectRegisterForm["StudyId"] = this.noteListService.filesParameter.StudyId;
      this.formData = Object.assign({}, this.subjectService.subjectList.filter(x => x.SubjectId == this.data.SubjectId)[0]);

      this.registerForm = this.formBuilder.group({
        SubjectId: [0],
        SemesterId: ['', Validators.required],
        SubjectNo: [null, { validators: [Validators.required, Validators.minLength(4)], asyncValidators: [this.subjectService.SubjectNoValidator()], updateOn: 'change' }],
        StudyName: [''],
        SubjectNameDaDK: ['', Validators.required],
        SubjectNameEnUS: ['', Validators.required],
        favFruits: this.editFruitsControls(),
      });

      this.registerForm.patchValue({
        SubjectId: this.formData.SubjectId,
        SemesterId: Number(this.formData.SemesterId),
        SubjectNo: this.formData.SubjectNo,
        StudyId: this.noteListService.filesParameter.StudyId,
        SubjectName: this.formData.SubjectName,
        SubjectNameDaDK: this.formData.SubjectNameDaDK,
        SubjectNameEnUS: this.formData.SubjectNameEnUS,
      });
      this.subjectService.previousSubjectNo = this.formData.SubjectNo;
    }
    else {
      this.subjectService.subjectRegisterForm = Object.assign({}, this.registerForm.value);
      this.subjectService.subjectRegisterForm["StudyId"] = this.noteListService.filesParameter.StudyId;
    }
  }

  GetSubjectLookupList() {
    this.subjectService.SubjectLookupList(this.subjectService.subjectLookupParameter).subscribe(
      res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.subjectService.subjectLookupList = res;
        if (this.data.SubjectId == 0) {
          let subjectNo = 1000;
          if (this.subjectService.subjectLookupList.length > 0) {
            this.tempSubjectLookupList = Object.assign([], this.subjectService.subjectLookupList)
            const sortList = this.tempSubjectLookupList.sort((a, b) => (a.SubjectNo > b.SubjectNo) ? 1 : -1)
            subjectNo = Number(this.tempSubjectLookupList[this.tempSubjectLookupList.length - 1]["SubjectNo"]) + 1;
          }
          this.registerForm.patchValue({
            SubjectNo: subjectNo,
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ShowLookup() {
    const institutionId = this.noteListService.filesParameter.InstitutionId;
    const studyId = this.noteListService.filesParameter.StudyId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "100%";

    dialogConfig.data = { institutionId, studyId };//passed the multiple parameter using comma (,)
    this.dialog.open(SubjectLookupComponent, dialogConfig).afterClosed().subscribe(res => {
      // this.GetSubjectList();
    });
  }

  addFruitsControls() {
    this.selectedFruitValues = [];
    const arr = this.fruits.map(item => {
      item.selected = false;
      if (item.SemesterId == Number(this.data.SemesterId)) {
        this.selectedFruitValues.push(item.SemesterId);
        item.selected = true;
      }
      return new FormControl(item.selected || false);
      // return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  editFruitsControls() {
    this.selectedFruitValues = [];
    const arr = this.fruits.map(item => {
      item.selected = false;
      const str_array = this.formData.SemesterIds.split(',');
      for (var i = 0; i < str_array.length; i++) {
        if (item.SemesterId == Number(str_array[i])) {
          this.selectedFruitValues.push(item.SemesterId);
          item.selected = true;
        }
      }
      return new FormControl(item.selected || false);
    });

    return this.formBuilder.array(arr);
  }

  get fruitsArray() {
    return <FormArray>this.registerForm.get('favFruits');
  }

  getSelectedFruitsValue() {
    this.selectedFruitValues = [];
    this.fruitsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFruitValues.push(this.fruits[i].SemesterId);
      }
    });

    if (this.data.SemesterId == 0) {
      if (this.selectedFruitValues.length > 0) {
        this.registerForm.patchValue({
          SemesterId: this.selectedFruitValues[0]
        })
      }
      else {
        this.registerForm.patchValue({
          SemesterId: ''
        })
      }
    }
    this.favFruitsError = this.selectedFruitValues.length > 0 ? false : true;
  }

  checkFruitControlsTouched() {
    let flg = false;
    this.fruitsArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });

    return flg;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    const newItem = this.selectedFruitValues;
    const semesterIds = Array.prototype.map.call(newItem, s => s).toString();
    
    if (environment.ShowConsoleLogs) {
      console.log(semesterIds);
      console.log({ ...this.registerForm.value, newItem });
    }

    if (this.registerForm.invalid) {
      return false;
    }
    else {
      //Save the data
      this.subjectService.InsertUpdateSubject(this.registerForm.value, semesterIds).subscribe(
        res => {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          this.subjectService.GetSubjectList();
          this.dialogRef.close();
        },
        err => {
          if (err === "ErrorFromWebAPI")
            this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
          else
            console.log(err);
        }
      );

      // const existSubjectParameter = {
      //   SubjectNo: Number(this.registerForm.value.SubjectNo),
      // };

      // this.subjectService.CheckSubjectNoExist(existSubjectParameter as SubjectParameter).subscribe(
      //   res => {
      //     if (res.length > 0) {
      //       this.currentData = res[0];
      //       if (this.registerForm.value.SubjectId == 0) { //Add Case
      //         this.notifyService.showErrorWithTimeout("Subject No already exist", "", 2000);
      //         return false;
      //       }
      //       else {
      //         if (this.currentData.SubjectId != this.registerForm.value.SubjectId) { //Edit Case
      //           this.notifyService.showErrorWithTimeout("Subject No already exist", "", 2000);
      //           return false;
      //         }
      //       }
      //     }
      //     //Write Save Logic Here
      //   },
      //   err => {
      //     console.log(err);
      //     if (err instanceof HttpErrorResponse) {
      //       if (err.status === 401) {
      //         this.router.navigate(['/login'])
      //       }
      //     }
      //   }
      // );
    }
  }

  ShowMultipleSemesters() {
    this.toggleMultipleSemesters = true;
  }
}
