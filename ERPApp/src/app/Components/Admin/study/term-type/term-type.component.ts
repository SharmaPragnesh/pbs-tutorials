import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TermTypesParameter } from 'src/app/Models/study.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { StudyService } from 'src/app/Services/study.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-term-type',
  templateUrl: './term-type.component.html',
  styleUrls: ['./term-type.component.scss']
})
export class TermTypeComponent implements OnInit {

  registerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<TermTypeComponent>, private formBuilder: FormBuilder,
    private translate: TranslateService, private notifyService: NotificationService, public studyService: StudyService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      TermTypeId: [0],
      TermType: [''],
      TermTypeDaDK: ['', Validators.required],
      TermTypeEnUS: ['', Validators.required],
    });

    if (this.data.termTypes != undefined && this.data.termTypes.termTypeId != 0) {
      this.registerForm.patchValue({
        TermTypeId: Number(this.data.termTypes.TermTypeId),
        TermType: this.data.termTypes.TermType,
        TermTypeDaDK: this.data.termTypes.TermTypeDaDK,
        TermTypeEnUS: this.data.termTypes.TermTypeEnUS
      });
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm);
    }

    if (this.registerForm.invalid) {
      return false;
    }
    else {
      this.InsertUpdateTermType(this.registerForm);
    }
  }

  InsertUpdateTermType(registerForm: FormGroup) {
    this.studyService.InsertUpdateTermType(registerForm.value).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
        this.GetTermTypeList();
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      }
    )
  }

  GetTermTypeList() {
    var termTypesParameter = {
      TermTypeId: null,
    }
    this.studyService.TermTypeList(termTypesParameter as TermTypesParameter).subscribe(
      res => {
        console.log(res);
        this.studyService.termTypesList = res;
        this.userService.needRefreshPage = true;
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      }
    );
  }

}
