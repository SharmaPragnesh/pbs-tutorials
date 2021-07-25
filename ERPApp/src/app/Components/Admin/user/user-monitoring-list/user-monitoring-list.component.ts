import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from 'src/app/Components/Shared/confirmation-dialog/confirmation-dialog.component';
import { UserSubjectInterest, UserSubjectInterestParameter } from 'src/app/Models/note-list.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-monitoring-list',
  templateUrl: './user-monitoring-list.component.html',
  styleUrls: ['./user-monitoring-list.component.scss']
})
export class UserMonitoringListComponent implements OnInit {


  //sorting
  config: any;
  key: string = 'SubjectName';
  reverse: boolean = false;

  userSubjectInterestList: UserSubjectInterest[] = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<UserListComponent>,
    private translate: TranslateService, private notifyService: NotificationService,
    private deleteConfirmDialog: MatDialog,
    public noteListService: NoteListService, public userService: UserService) { }

  ngOnInit(): void {
    this.GetUserSubjectInterest(this.data.UserId);
  }

  GetUserSubjectInterest(userId: Number) {
    var userSubjectInterestParameter = { UserId: userId, LanguageId: this.userService.selectedLanguageId };
    this.noteListService.GetUserSubjectInterest(userSubjectInterestParameter as UserSubjectInterestParameter).subscribe(data => {
      this.userSubjectInterestList = data;
      console.log(this.userSubjectInterestList);

      this.config = {
        itemsPerPage: environment.pageSize,
        currentPage: 1,
        totalItems: this.userSubjectInterestList != undefined ? this.userSubjectInterestList.length : 0
      };
    }, err => {
      console.log(err);
    });
  }

  DeleteConfirmDialog(user: UserSubjectInterest): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteMonitoring(user);
      }
    });
  }

  DeleteMonitoring(user: UserSubjectInterest) {
    var userSubjectInterestParameter = { UserSubjectInterestId: user.UserSubjectInterestId };
    this.noteListService.DeleteUserSubjectInterest(userSubjectInterestParameter as UserSubjectInterestParameter).subscribe(data => {
      this.GetUserSubjectInterest(this.data.UserId);
      this.userService.needRefreshPage = true;
      this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteSuccess'), "", environment.timeSpanMedium);
    }, err => {
      if (err === "ErrorFromWebAPI")
        this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
      else
        console.log(err);
    });
  }

  sort(key) {
    if (this.key == key) {
      this.reverse = !this.reverse;
    }
    else {
      this.reverse = false;
    }
    this.key = key;
    console.log(key);
    console.log(this.reverse);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}