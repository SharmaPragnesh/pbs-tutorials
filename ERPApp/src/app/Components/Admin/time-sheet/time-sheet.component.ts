import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LookUpResponse } from 'src/app/Models/common.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { TimeSheetService } from 'src/app/Services/time-sheet.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {

  projectId: number = 0;
  resourceId: number = 0;
  projectList: LookUpResponse[];
  resourceList: LookUpResponse[];

  constructor(private router: Router, private translate: TranslateService,
    private notifyService: NotificationService, private dialog: MatDialog, private deleteConfirmDialog: MatDialog,
    public timeSheetService: TimeSheetService) { }

  ngOnInit(): void {
    this.GetRolesList();
  }

  GetRolesList() {
    this.timeSheetService.TimeSheet().subscribe(
      res => {
        // debugger
        console.log(res);
        this.projectList = res.ProjectList;
        this.resourceList = res.ResourceList;

      },
      err => {
        console.log(err);
      }
    );
  }

}
