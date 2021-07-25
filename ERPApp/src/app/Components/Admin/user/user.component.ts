import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  languageList: any[] = null;
  registerForm: FormGroup;
  formData: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<UserComponent>,
    private formBuilder: FormBuilder, private translate: TranslateService,
    public userService: UserService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.GetLanguageList();

    this.registerForm = this.formBuilder.group({
      UserId: [0],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Initials: [''],
      LanguageId: [1, Validators.required],
      // Email: [null, { validators: [Validators.required], asyncValidators: [this.userService.AddEditEmailValidator()], updateOn: 'blur' }],
      Email: [null, { validators: [Validators.required] }],
      //UserName: [null, [Validators.required]],
      UserName: [null, this.data.UserId == 0 ? { validators: [Validators.required], asyncValidators: [this.userService.AddEditUserNameValidator()], updateOn: 'blur' } : [Validators.required]],
      Password: [''],
      ConfirmPassword: [''],
      // Mobile: ['', Validators.required],
      IsAdmin: [false],
      SendNotification: [false]
    }, {
      validator: this.comparePasswords
    });

    if (this.data.UserId != 0) {
      this.userService.userRegisterForm = Object.assign({}, this.userService.userList.filter(x => x.UserId == this.data.UserId)[0]);
      this.formData = Object.assign({}, this.userService.userList.filter(x => x.UserId == this.data.UserId)[0]);
      if (environment.ShowConsoleLogs) {
        console.log(this.registerForm.value);
      }

      this.registerForm.patchValue({
        UserId: this.formData.UserId,
        FirstName: this.formData.FirstName,
        LastName: this.formData.LastName,
        Initials: this.formData.Initials,
        LanguageId: this.formData.LanguageId,
        Email: this.formData.Email,
        UserName: this.formData.UserName,
        Mobile: this.formData.Mobile,
        IsAdmin: this.formData.IsAdmin,
        SendNotification: this.formData.SendNotification
      });
    }
    else {
      this.userService.userRegisterForm = Object.assign({}, this.registerForm.value);
    }
  }

  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({ passwordMismatch: true })
      }
      else {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }

  GetLanguageList() {
    this.userService.LanguageList()
      .subscribe(
        res => {
          this.languageList = res;
        },
        err => {
          console.log(err);
        }
      )
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
      this.userService.InsertUpdateUser(this.registerForm.value).subscribe(
        res => {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          // this.studyService.resetForm(form);
          this.userService.GetUserList();
        },
        err => {
          console.log(err);
        }
      );

      this.dialogRef.close();
    }
  }
}
