import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatisticsParameter } from 'src/app/Models/statistics.model';
import { StatisticsService } from 'src/app/Services/statistics.service';
import { HttpEventType } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NoteListService } from 'src/app/Services/note-list.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/Services/user.service';
///
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { daLocale } from 'ngx-bootstrap/locale';
import { enGbLocale } from 'ngx-bootstrap/locale';

defineLocale('da', daLocale);
defineLocale('en', enGbLocale);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  usageForm: FormGroup;
  showUsage: boolean = false;
  statisticsParameter: StatisticsParameter;

  constructor(private formBuilder: FormBuilder, private translate: TranslateService,
    private bsLocaleService: BsLocaleService, public userService: UserService,
    private noteListService: NoteListService, private statisticsService: StatisticsService) {
    if (userService.selectedLanguageId == 1) {
      this.bsLocaleService.use('da');
    }
    else {
      this.bsLocaleService.use('en');
      // enGbLocale.week.dow = 1;
      // enGbLocale.week.doy= 6;
    }
  }

  ngOnInit(): void {
    var firstDayofWeek = this.startOfWeek(new Date());
    this.usageForm = this.formBuilder.group({
      UsageFromDate: [firstDayofWeek],
      UsageToDate: [new Date()],
      NewUsers: [],
      DeletedUsers: [],
      TotalActiveUsers: [],
      TotalLogins: [],
      UploadedNotes: [],
      DownloadedNotes: [],
      MonitoredSubjects: [],
      Reviews: [],
      Comments: []
    });
    this.onSubmitStatistics();
  }

  startOfWeek(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  onSubmitStatistics() {
    this.usageForm.value.UsageFromDate = this.noteListService.SetTimeinDate(this.usageForm.value.UsageFromDate);
    this.usageForm.value.UsageToDate = this.noteListService.SetTimeinDate(this.usageForm.value.UsageToDate);

    this.statisticsParameter = {
      FromDate: new Date(this.usageForm.value.UsageFromDate), //(1000 * 60 * 60 * 24)
      ToDate: new Date(this.usageForm.value.UsageToDate)
    }

    if (environment.ShowConsoleLogs) {
      console.log(this.usageForm.value);
      console.log(this.statisticsParameter);
    }

    this.statisticsService.GetStatistics(this.statisticsParameter).subscribe(data => {
      this.showUsage = true;
      this.usageForm.patchValue({
        NewUsers: data.NewUsers,
        DeletedUsers: data.DeletedUsers,
        TotalActiveUsers: data.TotalActiveUsers,
        TotalLogins: data.TotalLogins,
        UploadedNotes: data.UploadedNotes,
        DownloadedNotes: data.DownloadedNotes,
        MonitoredSubjects: data.MonitoredSubjects,
        Reviews: data.Reviews,
        Comments: data.Comments
      });
    });
  }

  DownloadExcel() {
    this.usageForm.value.UsageFromDate = this.noteListService.SetTimeinDate(this.usageForm.value.UsageFromDate);
    this.usageForm.value.UsageToDate = this.noteListService.SetTimeinDate(this.usageForm.value.UsageToDate);

    this.statisticsParameter = {
      FromDate: new Date(this.usageForm.value.UsageFromDate), //(1000 * 60 * 60 * 24)
      ToDate: new Date(this.usageForm.value.UsageToDate)
    }

    if (environment.ShowConsoleLogs) {
      console.log(this.usageForm.value);
      console.log(this.statisticsParameter);
    }

    this.statisticsService.PrintStatistics(this.statisticsParameter).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.translate.instant('PageHeader.Statistics') + ".xlsx";
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
