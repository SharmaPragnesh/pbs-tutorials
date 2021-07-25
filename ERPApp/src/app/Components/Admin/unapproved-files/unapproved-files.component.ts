import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { NoteListService } from 'src/app/Services/note-list.service';
import { UserService } from 'src/app/Services/user.service';

import { environment } from 'src/environments/environment';
import { Files, FilesParameter } from 'src/app/Models/note-list.model';
import { ConfirmationDialogComponent } from '../../Shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-unapproved-files',
  templateUrl: './unapproved-files.component.html',
  styleUrls: ['./unapproved-files.component.scss']
})
export class UnapprovedFilesComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'CreatedDate';
  reverse: boolean = true;

  filesParameter: FilesParameter;

  constructor(private translate: TranslateService, public notifyService: NotificationService,
    private deleteConfirmDialog: MatDialog,
    public noteListService: NoteListService, public userService: UserService) { }

  ngOnInit(): void {
    this.GetFormModel();
    this.noteListService.GetFilesList(true);

    this.config = {
      itemsPerPage: environment.pageSize,
      currentPage: 1,
      totalItems: this.noteListService.filesList != undefined ? this.noteListService.filesList.length : 0
    };
  }

  GetFormModel() {
    if (this.noteListService.filesParameter === undefined) {
      this.filesParameter = {
        InstitutionId: null,
        StudyId: null,
        SemesterId: null,
        LanguageId: this.userService.selectedLanguageId,
        IsApproved: 0
      };
      this.noteListService.filesParameter = this.filesParameter;
    }
    else {
      this.noteListService.filesParameter.SearchText = '';
      this.filesParameter = this.noteListService.filesParameter;
      this.filesParameter.LanguageId = Number(this.userService.selectedLanguageId);
      this.filesParameter.IsApproved = 0;
    }
  }

  isCheckboxChecked() {
    if (this.noteListService.filesList != null) {
      return this.noteListService.filesList.filter(product => product.Checked).map(p => p.FileId).length;
    }
    return 0;
  }

  ApproveFiles() {
    const selectedFiles = this.noteListService.filesList.filter(product => product.Checked).map(p => p.FileId);
    const strFiles = selectedFiles.toString();
    const files = {
      FileName: strFiles
    }
    this.noteListService.ApproveFiles(files as Files).subscribe(
      res => {
        this.noteListService.GetFilesList(true);
        if (selectedFiles.length == 1) {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.OneFilespprovedSuccess', { 0: selectedFiles.length }), "", environment.timeSpanLarge);
        }
        else {
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.NFilesApprovedSuccess', { 0: selectedFiles.length }), "", environment.timeSpanLarge);
        }

        const strFiles = selectedFiles.toString();
        const files = {
          FileName: strFiles
        }
        console.log('mail send start');
        this.noteListService.SendApproveFilesEMail(files as Files).subscribe(
          res => {
            console.log('mail send finish');
          },
          err => {
            if (err === "ErrorFromWebAPI")
              this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
            else
              console.log(err);
          }
        );
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      }
    );
  }

  DeleteConfirmDialog(files: Files): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteFile(files);
      }
    });
  }

  DeleteFile(files: Files) {
    this.noteListService.DeleteFile(files.FileId).subscribe(
      res => {
        this.noteListService.GetFilesList(true);
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteSuccess'), "", environment.timeSpanMedium);
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
        else
          console.log(err);
      }
    );
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
