import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StarRatingComponent } from 'ng-starrating';
import { Files, FileScore, FilesParameter, Remark, RemarkParameter } from 'src/app/Models/note-list.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { ratingElement } from 'src/app/Models/ratingElement';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../Shared/confirmation-dialog/confirmation-dialog.component';
import { NoteEditComponent } from '../note-edit/note-edit.component';

@Component({
  selector: 'app-note-list-detail',
  templateUrl: './note-list-detail.component.html',
  styleUrls: ['./note-list-detail.component.scss']
})
export class NoteListDetailComponent implements OnInit {

  //sorting
  configRemark: any;
  keyRemark: string = 'CreatedDate';
  reverseRemark: boolean = false;

  registerForm: FormGroup;
  myfiles: Files;
  showNotesDetails: boolean;
  remarkParameter: RemarkParameter;
  remarkList: Remark[];
  ratingElement: ratingElement;
  fileScore: FileScore;
  userScore: number;
  totalstars: number = 5;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<NoteListDetailComponent>,
    private formBuilder: FormBuilder, private router: Router, private deleteConfirmDialog: MatDialog,
    private translate: TranslateService, public notifyService: NotificationService,
    public noteListService: NoteListService, public userService: UserService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.myfiles = this.data.files;
    this.showNotesDetails = this.data.showNotesDetails;
    this.userScore = this.data.userScore;

    this.ratingElement = new ratingElement();
    this.ratingElement.checkedcolor = "orange";
    this.ratingElement.uncheckedcolor = "gray";
    this.ratingElement.value = this.userScore;
    this.ratingElement.size = 26;
    this.ratingElement.totalstars = 5;
    this.ratingElement.readonly = false;

    if (this.myfiles.TermType == "") {
      this.myfiles.TermType = this.noteListService.filesParameter.TermType;
    }

    this.registerForm = this.formBuilder.group({
      RemarkId: [0],
      FileId: [this.myfiles.FileId],
      RemarkText: [null, Validators.required]
    });

    if (this.remarkParameter === undefined) {
      this.remarkParameter = {
        FileId: this.myfiles.FileId
      };
    }
    this.GetRemark();
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.fileScore = {
      FileId: this.myfiles.FileId,
      Score: Number($event.newValue)
    };
  }

  SaveRating() {
    this.noteListService.InsertUpdateFileScore(this.fileScore).subscribe(
      res => {
        this.userService.needRefreshPage = true;
        // this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.ReviewSuccess'), "", environment.timeSpanMedium);
      },
      err => {
        console.log(err);
      }
    );
    // alert(`Old Value:${$event.oldValue}, 
    //   New Value: ${$event.newValue}, 
    //   Checked Color: ${$event.starRating.checkedcolor}, 
    //   Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  GetRemark() {
    this.noteListService.GetRemark(this.remarkParameter).subscribe(data => {
      if (environment.ShowConsoleLogs) {
        console.log(data);
        console.log(this.userService.userInfo);
      }

      this.configRemark = {
        id: 'paginationNoteListDetail',
        itemsPerPage: 3,
        currentPage: 1,
        totalItems: this.userService.userInfo != undefined ? this.userService.userInfo.length : 0
      };
      this.remarkList = data;
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  EditNotes() {
    var myfiles = this.myfiles
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";
    dialogConfig.data = { myfiles };//passed the multiple parameter using comma (,)
    this.dialog.open(NoteEditComponent, dialogConfig).afterClosed().subscribe(res => {
      if (this.userService.needRefreshPage) {
        this.dialogRef.close();
        // this.BindNote();
      }
    });
  }

  DeleteNotesConfirmDialog(): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteNotes();
      }
    });
  }

  DeleteNotes() {
    this.noteListService.DeleteFile(this.myfiles.FileId).subscribe(
      res => {
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteSuccess'), "", environment.timeSpanMedium);
        this.userService.needRefreshPage = true;
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
  
  onSubmitNotes() {

  }

  // BindNote() {
  //   var filesParameter = {
  //     FileId: this.registerForm.value.FileId,
  //     LanguageId: 2,
  //     IsApproved: 1
  //   };
  //   this.noteListService.FilesList(true, filesParameter).subscribe(
  //     res => {
  //       if (environment.ShowConsoleLogs) {
  //         console.log(res);
  //       }
  //       const seachFiles = res;
  //       debugger;
  //       this.myfiles = res[0];
  //     });
  // }

  onSubmit() {
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm.value);
    }
    if (this.registerForm.invalid) {
      return false;
    }
    else {
      this.noteListService.InsertRemark(this.registerForm.value).subscribe(
        res => {
          this.SaveRating();
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveRemark'), "", environment.timeSpanMedium);
          this.GetRemark();
          this.registerForm.reset();
          this.registerForm.patchValue({
            FileId: this.myfiles.FileId,
            RemarkId: 0
          });
        },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login'])
            }
          }
        }
      );
    }
  }

  DeleteConfirmDialog(remark: Remark): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteRemark(remark);
      }
    });
  }

  DeleteRemark(remark: Remark) {
    this.noteListService.DeleteRemark(remark).subscribe(
      res => {
        this.GetRemark();
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteRemark'), "", environment.timeSpanMedium);
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      }
    );
  }

  sortRemark(keyRemark) {
    if (this.keyRemark == keyRemark) {
      this.reverseRemark = !this.reverseRemark;
    }
    else {
      this.reverseRemark = false;
    }
    this.keyRemark = keyRemark;
    if (environment.ShowConsoleLogs) {
      console.log(keyRemark);
      console.log(this.reverseRemark);
    }
  }

  pageChangedRemark(event) {
    this.configRemark.currentPage = event;
  }

}
