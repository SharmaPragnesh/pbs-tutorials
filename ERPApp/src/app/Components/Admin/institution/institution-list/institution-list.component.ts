import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { NoteListService } from 'src/app/Services/note-list.service';
import { InstitutionService } from 'src/app/Services/institution.service';
import { StudyService } from 'src/app/Services/study.service';

import { environment } from 'src/environments/environment';
import { InstitutionComponent } from '../institution.component';
import { Institution } from 'src/app/Models/institution.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/Components/Shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'Sorting';
  reverse: boolean = false;

  iCount: number;
  institutionA: Institution;
  institutionB: Institution;
  institutionC: Institution;

  disableSaveOrder: boolean = true;
  tempList: Institution[] = null;
  institutionList: Institution[] = null;

  constructor(private router: Router, private translate: TranslateService,
    private notifyService: NotificationService, private dialog: MatDialog, private deleteConfirmDialog: MatDialog,
    public noteListService: NoteListService,
    public institutionService: InstitutionService, private studyService: StudyService) { }

  ngOnInit(): void {
    this.institutionService.GetFormModel();
    this.GetInstitutionList();
  }

  GetInstitutionList() {
    this.institutionService.InstitutionList().subscribe(
      res => {
        this.institutionList = res;
        this.institutionService.institutionList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  ShowStudies(institution: Institution) {
    this.studyService.studyParameter.InstitutionId = institution.InstitutionId;
    this.noteListService.filesParameter.InstitutionId = institution.InstitutionId;
    this.noteListService.filesParameter.InstitutionName = institution.InstitutionName;
    this.noteListService.SetInstitutionShowValue(institution.InstitutionId);
    this.router.navigate(['/admin/study']);
  }

  AddOrEditInstitution(InstitutionId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'medium-dialog-box';
    dialogConfig.width = "100%";
    dialogConfig.data = { InstitutionId };//passed the multiple parameter using comma (,)
    this.dialog.open(InstitutionComponent, dialogConfig).afterClosed().subscribe(res => {
      this.GetInstitutionList();
    });
  }

  DeleteConfirmDialog(institution: Institution): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteInstitute(institution);
      }
    });
  }

  DeleteInstitute(institution: Institution) {
    institution.IsForDelete = true;
    this.institutionService.InsertUpdateInstitution(institution).subscribe(
      res => {
        this.GetInstitutionList();
        this.notifyService.showWarningWithTimeout(this.translate.instant('Messages.DeleteSuccess'), "", environment.timeSpanMedium);
      },
      err => {
        if (err === "ErrorFromWebAPI")
          this.notifyService.showErrorHTMLWithTimeout(this.translate.instant("Messages." + err), "", environment.timeSpanMedium);
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
    this.ChangeSortOrder();
  }

  ChangeSortOrder() {
    this.iCount = 1;
    this.tempList = Object.assign([], this.institutionList);
    this.tempList.sort((book1, book2) => {
      return this.reverse ? this.noteListService.CompareObjects(book2, book1, this.key) : this.noteListService.CompareObjects(book1, book2, this.key);
    })

    for (let id of this.tempList) {
      id.Sorting = this.iCount;
      this.iCount++;
    }
    this.disableSaveOrder = false;
  }

  MoveUp(index: number) {
    this.institutionA = this.institutionList[index];
    this.institutionB = this.institutionList[index - 1];
    this.institutionC = this.institutionA;

    this.institutionList[index] = this.institutionB;
    this.institutionList[index - 1] = this.institutionC;

    this.institutionA = this.institutionList[index];
    const c = this.institutionA["Sorting"];
    this.institutionList[index].Sorting = this.institutionList[index - 1].Sorting;
    this.institutionList[index - 1].Sorting = c;
    this.disableSaveOrder = false;
  }

  MoveDown(index: number) {
    this.institutionA = this.institutionList[index];
    this.institutionB = this.institutionList[index + 1];
    this.institutionC = this.institutionA;

    this.institutionList[index] = this.institutionB;
    this.institutionList[index + 1] = this.institutionC;

    this.institutionA = this.institutionList[index];
    const c = this.institutionA["Sorting"];
    this.institutionList[index].Sorting = this.institutionList[index + 1].Sorting;
    this.institutionList[index + 1].Sorting = c;
    this.disableSaveOrder = false;
  }

  UpdateInstitutionSorting() {
    if (environment.ShowConsoleLogs) {
      console.log(this.institutionList);
    }
    const institutionIds = Array.prototype.map.call(this.institutionList, s => s.InstitutionId).toString();
    var institution = { UpDown: institutionIds };
    this.institutionService.UpdateInstitutionSorting(institution as Institution).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SortingSuccess'), "", environment.timeSpanMedium);
        this.GetInstitutionList();
        this.disableSaveOrder = true;
      },
      err => {
        console.log(err);
      }
    );
  }

}
