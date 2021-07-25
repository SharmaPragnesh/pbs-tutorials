import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TermTypes } from 'src/app/Models/study.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { StudyService } from 'src/app/Services/study.service';
import { environment } from 'src/environments/environment';
import { TermTypeComponent } from '../term-type/term-type.component';

@Component({
  selector: 'app-term-type-list',
  templateUrl: './term-type-list.component.html',
  styleUrls: ['./term-type-list.component.scss']
})
export class TermTypeListComponent implements OnInit {

  constructor(private router: Router, private translate: TranslateService, private notifyService: NotificationService,
    public studyService: StudyService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  EditTermType(termTypes: TermTypes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";

    dialogConfig.data = { termTypes };//passed the multiple parameter using comma (,)
    this.dialog.open(TermTypeComponent, dialogConfig).afterClosed().subscribe(res => {
      // if (this.userService.needRefreshPage) {
      //   if (this.studyService.termTypesList != null && this.studyService.termTypesList.length > 0) {
      //     const termTypeId = this.studyService.termTypesList[this.studyService.termTypesList.length - 1].TermTypeId;
      //     this.registerForm.patchValue({
      //       TermTypeId: Number(termTypeId)
      //     });
      //   }
      //   this.userService.needRefreshPage = false;
      // }
    });
  }

  CofirmDeleteTermType(termTypes: TermTypes) {
    if (termTypes.NoOfStudyExists != 0) {
      if (confirm(this.translate.instant('Messages.TermTypeAlreadyAssign', { 0: termTypes.TermType }))) {
        this.DeleteTermType(termTypes);
      }
    }
    else {
      if (confirm(this.translate.instant('Messages.DeleteConfirmation'))) {
        this.DeleteTermType(termTypes);
      }
    }
  }

  DeleteTermType(termTypes: TermTypes) {
    this.studyService.DeleteTermType(termTypes).subscribe(
      res => {
        // this.GetRemark();
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteRemark'), "", environment.timeSpanMedium);
        this.studyService.termTypesList = this.studyService.termTypesList.filter(obj => obj !== termTypes);
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
  HideTermType(termTypeId: number) {
    if (termTypeId == 1 || termTypeId == 2 || termTypeId == 3|| termTypeId == 4) {
      return false;
    }
    return true;
  }
}
