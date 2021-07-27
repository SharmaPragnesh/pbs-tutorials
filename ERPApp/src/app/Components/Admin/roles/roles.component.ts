import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Roles } from 'src/app/Models/roles.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { RolesService } from 'src/app/Services/roles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  registerForm: FormGroup;
  formData: Roles;
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<RolesComponent>,
    private formBuilder: FormBuilder, private translate: TranslateService, private notifyService: NotificationService,
    public rolesService: RolesService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Id: [0],
      Name: ['', Validators.required]
    });

    if (this.data.RoleId != 0) {
      //   this.institutionService.institutionRegisterForm = Object.assign({}, this.institutionService.institutionList.filter(x => x.InstitutionId == this.data.InstitutionId)[0]);
      this.formData = Object.assign({}, this.data.RolesList.filter(x => x.Id == this.data.RoleId)[0]);

      this.registerForm.patchValue({
        Id: Number(this.formData.Id),
        Name: this.formData.Name,
      });
    }
    else {
      //  this.institutionService.institutionRegisterForm = Object.assign({}, this.registerForm.value);
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
      this.rolesService.InsertUpdateRoles(this.registerForm.value).subscribe(
        res => {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
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
