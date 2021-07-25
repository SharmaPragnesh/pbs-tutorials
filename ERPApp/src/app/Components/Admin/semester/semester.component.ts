import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { StudyService } from 'src/app/Services/study.service';

import { Semester } from 'src/app/Models/semester.model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {

  registerForm: FormGroup;
  formData: Semester;
  currentData: Semester;
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<SemesterComponent>,
    private formBuilder: FormBuilder, private translate: TranslateService, private notifyService: NotificationService,
    public studyService: StudyService, public semesterService: SemesterService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      SemesterId: [0],
      StudyId: ['', Validators.required],
      SemesterNo: [null, { validators: [Validators.required], asyncValidators: [this.semesterService.SemesterNoValidator()], updateOn: 'change' }],
    });

    if (this.data.StudyId != 0) {
      this.registerForm.patchValue({
        StudyId: Number(this.data.StudyId)
      });
    }

    this.semesterService.semesterRegisterForm = Object.assign({}, this.registerForm.value);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return false;
    }
    else {
      //Save the data
      this.semesterService.InsertUpdateSemester(this.registerForm.value).subscribe(
        res => {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          this.semesterService.GetSemesterList();
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
