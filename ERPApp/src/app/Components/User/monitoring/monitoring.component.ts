import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserSubjectInterest, UserSubjectInterestParameter } from 'src/app/Models/note-list.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../Shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'SubjectName';
  reverse: boolean = false;

  userSubjectInterestList: UserSubjectInterest[] = null;

  constructor(private translate: TranslateService, private notifyService: NotificationService,
    private deleteConfirmDialog: MatDialog,
    public noteListService: NoteListService, public userService: UserService) { }

  ngOnInit(): void {
    this.GetUserSubjectInterest(this.userService.userInfo.UserId);
  }

  GetUserSubjectInterest(userId: Number) {
    var userSubjectInterestParameter = { UserId: userId, LanguageId: this.userService.selectedLanguageId };
    this.noteListService.GetUserSubjectInterest(userSubjectInterestParameter as UserSubjectInterestParameter).subscribe(data => {
      this.userSubjectInterestList = data;
      if (environment.ShowConsoleLogs) {
        console.log(this.userSubjectInterestList);
      }

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
      this.GetUserSubjectInterest(this.userService.userInfo.UserId);
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
    if (environment.ShowConsoleLogs) {
      console.log(key);
      console.log(this.reverse);
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
