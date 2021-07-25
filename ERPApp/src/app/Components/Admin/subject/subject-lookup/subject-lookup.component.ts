import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectLookup, SubjectParameter } from 'src/app/Models/subject.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subject-lookup',
  templateUrl: './subject-lookup.component.html',
  styleUrls: ['./subject-lookup.component.scss']
})
export class SubjectLookupComponent implements OnInit {

  //sorting
  configLookup: any;
  keyLookup: string = 'SubjectNo';
  reverse: boolean = false;

  subjectLookupList: SubjectLookup[] = null;
  subjectParameter: SubjectParameter;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<SubjectLookupComponent>,
    public subjectService: SubjectService, public userService: UserService,
    public noteListService: NoteListService) { }

  ngOnInit(): void {
    this.configLookup = {
      id: 'paginationNoteListDetail',
      itemsPerPage: environment.pageSize,
      currentPage: 1,
      totalItems: this.subjectService.subjectLookupList != undefined ? this.subjectService.subjectLookupList.length : 0
    };
  }

  sort(keyLookup) {
    if (this.keyLookup == keyLookup) {
      this.reverse = !this.reverse;
    }
    else {
      this.reverse = false;
    }
    this.keyLookup = keyLookup;
    if (environment.ShowConsoleLogs) {
      console.log(keyLookup);
      console.log(this.reverse);
    }
  }

  pageChanged(event) {
    this.configLookup.currentPage = event;
  }
}
