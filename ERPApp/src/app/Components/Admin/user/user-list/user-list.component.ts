import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User, UserParameter } from 'src/app/Models/user.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { UserFileListComponent } from '../user-file-list/user-file-list.component';
import { UserMonitoringListComponent } from '../user-monitoring-list/user-monitoring-list.component';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'StartingDate';
  reverse: boolean = true;

  userParameter: UserParameter;
  constructor(private translate: TranslateService, public userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetFormModel();
    this.userService.GetUserList();

    this.config = {
      id: 'paginationUserList',
      itemsPerPage: environment.pageSize,
      currentPage: 1,
      totalItems: this.userService.userList != undefined ? this.userService.userList.length : 0
    };
  }

  GetFormModel() {
    if (this.userService.userParameter === undefined) {
      this.userParameter = {
        UserId: null,
        Email: null,
        IsActive: true
      };
      this.userService.userParameter = this.userParameter;
    }
    else {
      this.userParameter = this.userService.userParameter;
    }
  }

  onOptionsSelected(value: string) {
    if (value === "1") {
      this.userParameter.IsActive = true;
    }
    else if (value === "0") {
      this.userParameter.IsActive = false;
    }
    else {
      this.userParameter.IsActive = null;
    }
    this.userService.GetUserList();
    console.log("selected value is " + value);
  }

  FilesUploadedList(UserId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "100%";
    dialogConfig.data = { UserId };//passed the multiple parameter using comma (,)
    this.dialog.open(UserFileListComponent, dialogConfig).afterClosed().subscribe(res => {
      // alert('hello');
    });
  }

  FilesMonitoringList(UserId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "100%";
    dialogConfig.data = { UserId };//passed the multiple parameter using comma (,)
    this.dialog.open(UserMonitoringListComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {
        this.userService.GetUserList();
        this.userService.needRefreshPage = false;
      }
    });
  }

  AddOrEditUser(UserId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "100%";
    dialogConfig.data = { UserId };//passed the multiple parameter using comma (,)
    this.dialog.open(UserComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {
        this.userService.GetUserList();
        this.userService.needRefreshPage = false;
      }
    });
  }

  onDelete(user: User) {
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

  onPrint() {
    this.userService.PrintUser(this.userParameter).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.translate.instant('PageHeader.Users') + ".xlsx";
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
