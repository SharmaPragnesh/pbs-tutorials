import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Institution } from 'src/app/Models/institution.model';
import { InstitutionService } from 'src/app/Services/institution.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.scss']
})
export class InstitutionDetailComponent implements OnInit {

  currentData: Institution;

  constructor(private router: Router, private translate: TranslateService, private notifyService: NotificationService,
    public institutionService: InstitutionService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.InstitutionNo.toString().length < 4) {
      this.notifyService.showErrorWithTimeout("InstitutionNo should be 4 digit", "", 2000);
      return false;
    }

    this.currentData = this.institutionService.institutionList.filter(x => x.InstitutionNo == Number(this.institutionService.institutionFormData.InstitutionNo))[0];
    if (form.value.InstitutionId == 0) {
      if (this.currentData != undefined) {
        this.notifyService.showErrorWithTimeout("Institution No already exist", "", 2000);
        return false;
      }
    }
    else {
      if (this.currentData != undefined && this.currentData.InstitutionId != this.institutionService.institutionFormData.InstitutionId) {
        this.notifyService.showErrorWithTimeout("Institution No already exist", "", 2000);
        return false;
      }
    }

    this.institutionService.InsertUpdateInstitution().subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", environment.timeSpanMedium);
        this.institutionService.GetInstitutionList();
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
}
