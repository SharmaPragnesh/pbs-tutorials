import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FilesParameter } from './Models/note-list.model';
import { SubjectParameter } from './Models/subject.model';
import { InstitutionService } from './Services/institution.service';
import { NoteListService } from './Services/note-list.service';
import { SemesterService } from './Services/semester.service';
import { StudyService } from './Services/study.service';
import { SubjectService } from './Services/subject.service';
import { UserService } from './Services/user.service';
import * as uuid from 'uuid';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, interval, Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AutoLogoutService } from './Services/auto-logout.service';
import { environment } from 'src/environments/environment';
import { Study } from './Models/study.model';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLogout: boolean = false;
  entriesWorking: string[];
  entriesProblem: string[];
  private updateSubscription: Subscription;

  languageList: any[] = null;
  subjectParameter: SubjectParameter;
  filesParameter: FilesParameter;

  constructor(public router: Router, private activeRoute: ActivatedRoute, private translate: TranslateService, public userService: UserService, public noteListService: NoteListService,
    public institutionService: InstitutionService, public studyService: StudyService, public semesterService: SemesterService, public subjectService: SubjectService,
    private autoLogout: AutoLogoutService) {

    //Set the Default Culture
    this.userService.SetLanguageCulture()

    //Set the Culture for Login User
    if (this.userService.userInfo == undefined && !!localStorage.getItem('userinfo')) {
      const conversionDecryptOutput1 = CryptoJS.AES.decrypt(localStorage.getItem('userinfo'), "").toString(CryptoJS.enc.Utf8);
      this.userService.userInfo = JSON.parse(conversionDecryptOutput1);
      this.userService.selectedLanguageId = Number(this.userService.userInfo.LanguageId);
      this.userService.SetLanguageCulture();
    }
    else if (!!localStorage.getItem('anonymousLanguageId')) {
      this.userService.selectedLanguageId = Number(localStorage.getItem('anonymousLanguageId'));
      this.userService.SetLanguageCulture();
    }
  }

  ngOnInit(): void {
    this.noteListService.CheckAndSetTheme();
    this.entriesWorking = ['aa-Direct', 'bb', 'cc'];
    //https://stackoverflow.com/questions/54734738/set-auto-refresh-page-on-angular-6/54743718
    //10000= 10 sec
    //60000= 60 sec = 1min
    // // this.updateSubscription = interval(60000 * 5).subscribe(
    // //   (val) => {
    // //     console.log('Dummy event');
    // //     console.log(this.userService.loggedIn());
    // //     if (this.userService.loggedIn()) {
    // //       this.Dummy();
    // //     }
    // //   }
    // // );
    this.Dummy();

    this.GetLanguageList();
    this.institutionService.GetFormModel();
    this.studyService.GetFormModel();
    this.semesterService.GetFormModel();
    this.subjectService.GetFormModel();

    this.institutionService.GetInstitutionList();
    this.studyService.GetStudyList();
    this.semesterService.GetSemesterList();
    this.subjectService.GetAllSubjectList();
  }

  onStudyChange(study: Study) {
    localStorage.removeItem('searchtext');
    this.noteListService.filesParameter.TermType = study.TermType;
    this.noteListService.ClientStudyChange(study);
  }

  ngAfterViewChecked(): void {
    $(".login-close-button").click(function () {//for close the upper window for mobile view
      $(".nav-right.active").removeClass('active');
    });

    $(".nav-middle a, .nav-middle-right a").click(function () {
      $(".nav-right.active").removeClass('active');
    });

    $(".close-click-res").click(function () { //1] main menu
      $(".main-wrapper").removeClass('toggled');//close the 1] main menu
      var overlayBox = $('.overlay-box').css('display');
      if (environment.ShowConsoleLogs) {
        console.log(overlayBox);
      }
      if (overlayBox == 'block') {
        $(".overlay-box").fadeOut();//close the 1] main menu
      }
    });
  }

  GetLanguageList() {
    this.userService.LanguageList()
      .subscribe(
        res => {
          if (environment.ShowConsoleLogs) {
            console.log(res);
          }
          this.languageList = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  ToggleLogout() {
    this.showLogout = !this.showLogout;
  }

  Dummy() {
    this.userService.Dummy()
      .subscribe(
        res => {
          this.entriesProblem = ['aa-Subscribe-Success', 'bb', 'cc'];
          console.log(res);
        },
        err => {
          this.entriesProblem = ['aa-Subscribe-Error', 'bb', 'cc'];
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.userService.logoutUser(true);
              const searchText = this.activeRoute.snapshot.queryParamMap.get('searchText');
              if (searchText != '' && searchText != null) {
                this.router.navigate(['/home?searchText=' + searchText])
              }
              else {
                this.router.navigate(['/home'])
              }
            }
          }
        }
      )
  }

  Search() {
    const searchText = this.noteListService.filesParameter.SearchText.trim();
    if (this.noteListService.filesParameter.SearchText != '') {
      this.noteListService.ResetNoteListValues();
      this.noteListService.IsNoteListSearchDone = false;
      this.noteListService.filesParameter.SearchText = searchText;
      const myId = uuid.v4();
      localStorage.setItem('searchtext', searchText);
      this.router.navigate(['/note-search-list/', myId])
    }
  }

  ChangeLanguage(languageId: number) {
    //Set Language & Culture
    this.userService.selectedLanguageId = Number(languageId);
    this.userService.SetLanguageCulture();

    console.log(this.router.url);
    //Refresh the Dropdown which required.
    this.institutionService.GetInstitutionList();
    this.noteListService.SetInstitutionName();

    if (this.noteListService.filesParameter.InstitutionId != 0) {
      this.studyService.GetStudyList();
      this.noteListService.SetStudyName();
    }
    if (this.noteListService.filesParameter.SemesterId != 0) {
      this.subjectService.GetAllSubjectList();
    }

    this.noteListService.filesParameter.LanguageId = this.userService.selectedLanguageId;

    if (this.userService.loggedIn()) {
      const conversionDecryptOutput1 = CryptoJS.AES.decrypt(localStorage.getItem('userinfo'), "").toString(CryptoJS.enc.Utf8);
      this.userService.userInfo = JSON.parse(conversionDecryptOutput1);
      this.userService.userInfo.LanguageId = languageId;
      localStorage.setItem('userinfo', CryptoJS.AES.encrypt(JSON.stringify(this.userService.userInfo), "").toString());

      this.userService.UpdateUserLanguage(languageId.toString()).subscribe((res: any) => {
        console.log('result :' + res);
      },
        err => {
          console.log('Error :' + err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login'])
            }
          }
        });
    }
    else {
      localStorage.setItem('anonymousLanguageId', String(languageId));
    }

    if (this.router.url.indexOf('note-list') > 0) { //because we have to show the search result with updated language
      const myId = uuid.v4();
      this.router.navigate(['/note-list/', myId])
    }
    else if (this.router.url.indexOf('note-search-list') > 0) { //because we have to show the search result with updated language
      const myId = uuid.v4();
      this.router.navigate(['/note-search-list/', myId])
    }
  }
}
