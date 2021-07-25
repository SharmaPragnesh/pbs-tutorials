import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { InstitutionService } from 'src/app/Services/institution.service';

import { Institution } from 'src/app/Models/institution.model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {

  registerForm: FormGroup;
  formData: Institution;
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<InstitutionComponent>,
    private formBuilder: FormBuilder, private translate: TranslateService, private notifyService: NotificationService,
    public institutionService: InstitutionService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      InstitutionId: [0],
      InstitutionNo: [null, { validators: [Validators.required, Validators.minLength(4)], asyncValidators: [this.institutionService.InstitutionNoValidator()], updateOn: 'change' }],
      InstitutionName: [''],
      InstitutionNameDaDK: ['', Validators.required],
      InstitutionNameEnUS: ['', Validators.required]
    });

    if (this.data.InstitutionId != 0) {
      this.institutionService.institutionRegisterForm = Object.assign({}, this.institutionService.institutionList.filter(x => x.InstitutionId == this.data.InstitutionId)[0]);
      this.formData = Object.assign({}, this.institutionService.institutionList.filter(x => x.InstitutionId == this.data.InstitutionId)[0]);

      this.registerForm.patchValue({
        InstitutionId: Number(this.formData.InstitutionId),
        InstitutionNo: this.formData.InstitutionNo,
        InstitutionName: this.formData.InstitutionName,
        InstitutionNameDaDK: this.formData.InstitutionNameDaDK,
        InstitutionNameEnUS: this.formData.InstitutionNameEnUS,
      });
    }
    else {
      this.institutionService.institutionRegisterForm = Object.assign({}, this.registerForm.value);
    }
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
      this.institutionService.InsertUpdateInstitution(this.registerForm.value).subscribe(
        res => {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          this.institutionService.GetInstitutionList();
          this.dialogRef.close();
        },
        err => {
          if (err === "ErrorFromWebAPI")
            this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
          else
            console.log(err);
        }
      );

      // this.currentData = this.institutionService.institutionList.filter(x => x.InstitutionNo == Number(this.registerForm.value.InstitutionNo))[0];
      // if (this.currentData != undefined) {
      //   if (this.registerForm.value.InstitutionId == 0) { //Add Case
      //     this.notifyService.showErrorWithTimeout("Institution No already exist", "", 2000);
      //     return false;
      //   }
      //   else {
      //     if (this.currentData.InstitutionId != this.registerForm.value.InstitutionId) { //Edit Case
      //       this.notifyService.showErrorWithTimeout("Institution No already exist", "", 2000);
      //       return false;
      //     }
      //   }
      // }
      // //Write Save Logic Here
    }
  }
}
