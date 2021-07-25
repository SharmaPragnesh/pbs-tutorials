import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User, UserParameter } from 'src/app/Models/user.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../Shared/confirmation-dialog/confirmation-dialog.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  isEdit = false;
  user: User;
  userParameter: UserParameter;
  languageList: any[] = null;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private translate: TranslateService,
    private deleteConfirmDialog: MatDialog,
    private userService: UserService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.GetLanguageList();
    this.userParameter = {
      UserId: this.userService.userInfo.UserId,
      Email: null
    }
    this.GetUser();
  }

  GetUser() {
    this.userService.GetUser(this.userParameter).subscribe(
      res => {
        if (environment.ShowConsoleLogs) {
          console.log(res);
        }
        this.user = res[0];
      },
      err => {
        console.log(err);
      }
    );
  }

  EditUser() {
    this.isEdit = true;
    this.registerForm = this.formBuilder.group({
      UserId: [0],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Initials: [''],
      LanguageId: [1, Validators.required],
      Email: [null, Validators.required],
      Password: [''],
      ConfirmPassword: [''],
      // Mobile: ['', Validators.required],
      IsAdmin: [false],
      SendNotification: [false]
    });

    this.registerForm.patchValue({
      UserId: this.user.UserId,
      FirstName: this.user.FirstName,
      LastName: this.user.LastName,
      Initials: this.user.Initials,
      LanguageId: this.user.LanguageId,
      Email: this.user.Email,
      // Mobile: this.user.Mobile,
      IsAdmin: this.user.IsAdmin,
      SendNotification: this.user.SendNotification
    });
  }

  GetLanguageList() {
    this.userService.LanguageList()
      .subscribe(
        res => {
          if (environment.ShowConsoleLogs) {
            console.log(res);
          }
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
    if (this.registerForm.value["SendNotification"] == "true") {
      this.registerForm.value["SendNotification"] = true;
    }
    else {
      this.registerForm.value["SendNotification"] = false;
    }

    if (this.registerForm.invalid) {
      return false;
    }
    else {
      this.userService.InsertUpdateUser(this.registerForm.value).subscribe(
        res => {
          this.GetUser();
          this.isEdit = false;
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
          // this.studyService.resetForm(form);
        },
        err => {
          console.log(err);
        }
      );

    }
  }

  DeleteConfirmDialog(): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteAboutMe();
      }
    });
  }


  DeleteAboutMe(): void {
    const user = {
      UserId: this.userService.userInfo.UserId,
      IsForDelete: true,
      LanguageId: this.userService.selectedLanguageId,
    };

    this.userService.InsertUpdateUser(user as User).subscribe(
      res => {
        this.userService.logoutUser();
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteAccountSuccess'), "", environment.timeSpanMedium);
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
