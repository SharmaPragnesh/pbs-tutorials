import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { DomSanitizer } from '@angular/platform-browser';

import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-online-view',
  templateUrl: './online-view.component.html',
  styleUrls: ['./online-view.component.scss']
})
export class OnlineViewComponent implements OnInit, AfterViewInit {

  @ViewChild("iframe") iframe: ElementRef;

  //https://stackoverflow.com/questions/35981094/display-ms-word-file-in-html-using-angular
  //https://jsfiddle.net/gcuzq343/

  showPortal = false;
  localsrcPath: string;
  filePath: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public sanitizer: DomSanitizer, private el: ElementRef) {
    //https://social.msdn.microsoft.com/Forums/office/en-US/4151672a-f9bb-463a-a5b2-5cb247135795/disablehide-quotprint-to-pdfquotquotdownload-a-copyquotquotembded-informationquot?forum=sharepointdevelopment
  }

  ngOnInit(): void {

    this.filePath = this.data.filePath;
    this.filePath = this.filePath.replace("\\", "/").replace("\\", "/");

    if (this.filePath.indexOf('pdf') > 0) {
      this.localsrcPath = environment.apiURL + '/UploadedFiles' + this.filePath;
      // this.localsrcPath = 'https://view.officeapps.live.com/op/embed.aspx?src=' + environment.viewDocumentURL;
    }
    else {
      this.localsrcPath = 'https://view.officeapps.live.com/op/embed.aspx?src=' + environment.apiURL + '/UploadedFiles' + this.filePath;
      // this.localsrcPath = 'https://view.officeapps.live.com/op/embed.aspx?src=' + environment.viewDocumentURL;
    }
  }

  ngAfterViewInit() {
    
  }

  // photoURL() {
  //   const t = this.sanitizer.bypassSecurityTrustUrl(this.srcPath)
  //   debugger;
  //   return t;
  // }


}
