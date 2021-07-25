import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from 'src/app/Components/Shared/confirmation-dialog/confirmation-dialog.component';
import { Semester } from 'src/app/Models/semester.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-term-type-optional-name',
  templateUrl: './term-type-optional-name.component.html',
  styleUrls: ['./term-type-optional-name.component.scss']
})
export class TermTypeOptionalNameComponent implements OnInit {

  key: string = 'Sorting';

  institutionA: Semester;
  institutionB: Semester;
  institutionC: Semester;

  semesterList: Semester[] = null;

  constructor(public dialogRef: MatDialogRef<TermTypeOptionalNameComponent>, private translate: TranslateService,
    private userService: UserService, public noteListService: NoteListService,
    private deleteConfirmDialog: MatDialog,
    public semesterService: SemesterService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.semesterList = Object.assign([], this.semesterService.semesterList);
    // this.semesterList = this.semesterService.semesterList;
    console.log(this.semesterList)
  }

  SaveTermTypeOptionalName() {
    this.semesterService.semesterList = this.semesterList;
    this.dialogRef.close();
  }

  SemesterValueModified(semester: Semester) {
    semester.IsModified = true;
  };

  MoveUp(index: number) {
    this.institutionA = this.semesterList[index];
    this.institutionB = this.semesterList[index - 1];
    this.institutionC = this.institutionA;

    this.semesterList[index] = this.institutionB;
    this.semesterList[index - 1] = this.institutionC;

    this.institutionA = this.semesterList[index];
    const c = this.institutionA["Sorting"];
    this.semesterList[index].Sorting = this.semesterList[index - 1].Sorting;
    this.semesterList[index - 1].Sorting = c;
    ///Update that record has been modified
    this.semesterList[index].IsModified = true;
    this.semesterList[index - 1].IsModified = true;
    // this.disableSaveOrder = false;
  }

  MoveDown(index: number) {
    this.institutionA = this.semesterList[index];
    this.institutionB = this.semesterList[index + 1];
    this.institutionC = this.institutionA;

    this.semesterList[index] = this.institutionB;
    this.semesterList[index + 1] = this.institutionC;

    this.institutionA = this.semesterList[index];
    const c = this.institutionA["Sorting"];
    this.semesterList[index].Sorting = this.semesterList[index + 1].Sorting;
    this.semesterList[index + 1].Sorting = c;
    ///Update that record has been modified
    this.semesterList[index].IsModified = true;
    this.semesterList[index + 1].IsModified = true;
  }

  CofirmDeleteTermTypeName(semester: Semester, index: number): void {
    const dialogRef = this.deleteConfirmDialog.open(ConfirmationDialogComponent, {
      data: {
        content: this.translate.instant('Messages.DeleteConfirmation'),
        title: this.translate.instant('Messages.ConfirmationTitle')
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeleteTermTypeName(semester, index);
      }
    });
  }

  DeleteTermTypeName(semester: Semester, index: number) {
    if (semester.SemesterId == 0) {//if semester is added
      this.semesterList = this.semesterList.filter(obj => obj !== semester);
    }
    else {
      this.semesterList.forEach(function (sem, index) {
        if (semester.SemesterId == sem.SemesterId) {
          sem.IsForDelete = true;
        }
      });
    }
    this.userService.needRefreshPage = true;
  }
}
