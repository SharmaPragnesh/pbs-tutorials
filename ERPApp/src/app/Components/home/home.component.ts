import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteListService } from 'src/app/Services/note-list.service';
import * as uuid from 'uuid';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, private activeRoute: ActivatedRoute, public noteListService: NoteListService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $("#txtSearchText").focus();

      $(".hero-banner").slick({
        draggable: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        fade: true,
        speed: 3000,
        infinite: true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      });
    });

    // //Below code for the set the height of the left & right side div
    // $(window).on('load', function () {
    //   $(".content-left").height($(".content-right").outerHeight());
    // });
    // $(window).resize(function () {
    //   $(".content-left").height($(".content-right").outerHeight());
    // });

    setTimeout(() => {
      const searchText = this.activeRoute.snapshot.queryParamMap.get('searchText')
      if (searchText != '' && searchText != null) {
        this.noteListService.filesParameter.SearchText = searchText;
        console.log(searchText);
        if (this.noteListService.filesParameter.SearchText != '') {
          this.noteListService.IsNoteListSearchDone = false;
          this.noteListService.filesParameter.SearchText = searchText;
          localStorage.setItem('searchtext', searchText);
          const myId = uuid.v4();
          this.router.navigate(['/note-search-list/', myId])
        }
      }
    }, 2000);
  }
}
