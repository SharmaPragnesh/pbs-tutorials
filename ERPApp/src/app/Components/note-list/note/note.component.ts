import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Files } from 'src/app/Models/note-list.model';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/Models/progress-status.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { ConfirmationDialogComponent } from '../../Shared/confirmation-dialog/confirmation-dialog.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { NoteListDetailComponent } from '../note-list-detail/note-list-detail.component';
import { OnlineViewComponent } from '../online-view/online-view.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'CreatedDate';
  reverse: boolean = true;

  totalstars: number = 5;

  filesList;
  @Input() isFilesFoundList: boolean = true;
  @Input() subjectId: number;
  @Input() filesListAllRecords: Files[] = null;
  @Input() name: string;
  @Output() buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  ///
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
  ///
  public pagingId: string;
  selectedFileId: number = 0;

  constructor(private route: ActivatedRoute, public router: Router, private translate: TranslateService,
    public noteListService: NoteListService, public userService: UserService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.pagingId = "paginationNoteList" + this.subjectId;
    if (this.filesListAllRecords != null) {
      this.filesList = this.filesListAllRecords.filter(book => book.SubjectId === this.subjectId);
      this.config = {
        id: this.pagingId,
        itemsPerPage: environment.pageSize,
        currentPage: 1,
        totalItems: this.filesList != undefined ? this.filesList.length : 0
      };
    }
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

  public downloadStatus(event: ProgressStatus, fileId: number) {
    this.selectedFileId = fileId;
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

  ShowNoteDetail(files: Files, showNotesDetails: boolean) {
    var fileScoreParameter = { FileId: files.FileId, UserId: this.userService.loggedIn() ? this.userService.userInfo.UserId : 0 };
    this.noteListService.GetFileScore(fileScoreParameter).subscribe(data => {
      console.log(data);
      var userScore = 0;
      if (data.length > 0) {
        userScore = data[0]["Score"];
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = false;
      dialogConfig.panelClass = 'medium-dialog-box';
      dialogConfig.width = "100%";
      dialogConfig.data = { files, userScore, showNotesDetails };//passed the multiple parameter using comma (,)
      this.dialog.open(NoteListDetailComponent, dialogConfig).afterClosed().subscribe(res => {
        if (this.userService.needRefreshPage) {
          this.buttonClick.emit();
          this.noteListService.GetFilesList();
          this.userService.needRefreshPage = false;
        }

        // alert('hello');
      });
    }, err => {
      console.log(err);
    });
  }

  ShowFeedback(files: Files) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";
    dialogConfig.data = { files };//passed the multiple parameter using comma (,)
    this.dialog.open(FeedbackComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {
        this.buttonClick.emit();
        this.noteListService.GetFilesList();
        this.userService.needRefreshPage = false;
      }
    });
  }

  LoginConfirmDialog(type: string) {
    var title_data = "";
    var content_data = "";
    if (type == "Download") {
      title_data = this.translate.instant('Messages.LoginConfirmationDownloadTitle');
      content_data = this.translate.instant('Messages.LoginConfirmationDownload');
    }
    else if (type == "OnlineView") {
      title_data = this.translate.instant('Messages.LoginConfirmationOnlineViewTitle')
      content_data = this.translate.instant('Messages.LoginConfirmationOnlineView');
    }
    else {
      title_data = this.translate.instant('PageHeader.Feedback')
      content_data = this.translate.instant('Messages.LoginConfirmationFeedback');
    }

    console.log(title_data);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: title_data,
        content: content_data,
        yes: this.translate.instant('Common.CreateLogin'),
        no: this.translate.instant('Common.Close'),
        nocss: "btn-confirm-close",
        yescss: "btn-confirm-confirm"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/login'])
      }
    });
  }

  OnlineViewing(filePath) {
    const UserId = 10000;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "100%";
    dialogConfig.data = { filePath };//passed the multiple parameter using comma (,)
    this.dialog.open(OnlineViewComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }
}
