import { Component, OnInit } from '@angular/core';
import { NoteListService } from 'src/app/Services/note-list.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public noteListService: NoteListService) { }

  ngOnInit(): void {
  }

}
