import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Files } from 'src/app/Models/note-list.model';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/Models/progress-status.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { MessageDialogComponent } from '../../Shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})
export class DownloadFileComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() files: Files;
  @Input() public showButton: boolean;
  @Input() public userActionLog: boolean = true;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private translate: TranslateService, private messageDialog: MatDialog, public noteListService: NoteListService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
  }

  public download() {
    this.downloadStatus.emit({ status: ProgressStatusEnum.START });
    this.noteListService.downloadFile(this.files.FilePath, this.userActionLog).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit({ status: ProgressStatusEnum.COMPLETE });
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.files.FileName; // + "\\" + this.files.FileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        debugger;
        if (error.status == 404 || error.statusText == "Not Found") {
          const dialogRef = this.messageDialog.open(MessageDialogComponent, {
            data: this.translate.instant('Messages.FileNotFound')
          });
          dialogRef.afterClosed().subscribe(result => {
          });
        }
        this.downloadStatus.emit({ status: ProgressStatusEnum.ERROR });
      }
    );
  }
}
