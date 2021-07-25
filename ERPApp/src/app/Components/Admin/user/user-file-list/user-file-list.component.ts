import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Files, FilesParameter } from 'src/app/Models/note-list.model';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/Models/progress-status.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-file-list',
  templateUrl: './user-file-list.component.html',
  styleUrls: ['./user-file-list.component.scss']
})
export class UserFileListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'SubjectName';
  reverse: boolean = false;

  totalstars: number = 5;
  ///
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
  ///
  filesList: Files[] = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<UserListComponent>,
    public noteListService: NoteListService, public userService: UserService) { }

  ngOnInit(): void {
    var filesParameter = {
      CreatedBy: this.data.UserId,
      LanguageId: this.userService.selectedLanguageId,
      IsApproved: 1
    };

    this.noteListService.GetUserFilesList(filesParameter as FilesParameter).subscribe(data => {
      this.filesList = data;
      console.log(this.filesList);
    });

    this.config = {
      id: 'paginationNoteList',
      itemsPerPage: environment.pageSize,
      currentPage: 1,
      totalItems: this.filesList != undefined ? this.filesList.length : 0
    };
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

  public downloadStatus(event: ProgressStatus) {
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

}
