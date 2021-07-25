import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SemesterParameter } from 'src/app/Models/semester.model';
import { SubjectMapping, SubjectMappingParameter, SubjectParameter } from 'src/app/Models/subject.model';
import { InstitutionService } from 'src/app/Services/institution.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { SemesterService } from 'src/app/Services/semester.service';
import { StudyService } from 'src/app/Services/study.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-subject-mapping',
  templateUrl: './subject-mapping.component.html',
  styleUrls: ['./subject-mapping.component.scss']
})
export class SubjectMappingComponent implements OnInit {

  subjectMapping: SubjectMapping;

  subjectParameter: SubjectParameter;
  subjectMappingParameter: SubjectMappingParameter;
  semesterParameter: SemesterParameter;

  unassignedSubjectIds: string;
  assignedSubjectIds: string;

  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];

  constructor(private translate: TranslateService, public institutionService: InstitutionService, public studyService: StudyService,
    public semesterService: SemesterService, public subjectService: SubjectService, private notifyService: NotificationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.GetFormModel();
  }

  GetFormModel() {
    if (this.subjectService.subjectMappingParameter === undefined) {
      this.subjectMappingParameter = {
        SemesterId: 0,
        LanguageId: 1
      };
      this.subjectService.subjectMappingParameter = this.subjectMappingParameter;
    }
    else {
      this.subjectMappingParameter = this.subjectService.subjectMappingParameter;
    }

    // if (this.subjectService.subjectParameter === undefined) {
    //   this.subjectParameter = {
    //     SubjectNo: null,
    //     LanguageId: 1
    //   };
    //   this.subjectService.subjectParameter = this.subjectParameter;
    // }
    // else {
    //   this.subjectParameter = this.subjectService.subjectParameter;
    // }

    if (this.semesterService.semesterParameter === undefined) {
      this.semesterParameter = {
        StudyId: this.studyService.adminSelectedStudyId,
        LanguageId: this.userService.selectedLanguageId
      };
      this.semesterService.semesterParameter = this.semesterParameter;
    }
    else {
      this.semesterService.semesterParameter.LanguageId = Number(this.userService.selectedLanguageId);
      this.semesterParameter = this.semesterService.semesterParameter;
    }
  }

  onInsititutionChange(value: string) {
    this.studyService.studyParameter.InstitutionId = Number(value);
    this.studyService.GetStudyList();
  }

  onStudyChange(value: string) {
    this.semesterService.semesterParameter.StudyId = Number(value);
    this.subjectService.subjectMappingParameter.SemesterId = 0;
    if (this.semesterService.semesterParameter.StudyId == 0) {
      this.semesterService.semesterList = null;
      // this.semesterService.adminSelectedSemesterId = 0;
    }
    else {
      this.semesterService.GetSemesterList();
    }
    // this.subjectService.GetUnassignedSubject();
    // this.subjectService.GetAssignedSubject();
  }

  onSemesterChange(value: string) {
    this.subjectService.subjectMappingParameter.SemesterId = Number(value);
    this.subjectService.GetAssignedSubject();
    this.subjectService.GetUnassignedSubject();
  }

  chosenCars(cars: any) {
    this.selectedToAdd = cars;
  }

  chosenCarsToRemove(cars: any) {
    this.selectedToRemove = cars;
  }

  AssignAll() {
    this.subjectService.assignedSubject = this.subjectService.assignedSubject.concat(this.subjectService.unassignedSubject);
    this.subjectService.unassignedSubject = [];
  }

  UnAssignAll() {
    this.subjectService.unassignedSubject = this.subjectService.unassignedSubject.concat(this.subjectService.assignedSubject);
    this.subjectService.assignedSubject = [];
  }

  AssignSelected() {
    //Save the Selected Subject Mapping
    this.assignedSubjectIds = Array.prototype.map.call(this.selectedToAdd, s => s.SubjectId).toString();
    this.subjectMapping = {
      SemesterId: this.subjectService.subjectMappingParameter.SemesterId,
      SubjectIds: this.assignedSubjectIds,
      LanguageId: this.userService.selectedLanguageId
    }

    debugger;
    this.subjectService.InsertSubjectMapping(this.subjectMapping).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", 2000);
        this.subjectService.GetUnassignedSubject();
        this.subjectService.GetAssignedSubject();
      },
      err => {
        console.log(err);
      }
    );
  }

  UnAssignSelected() {
    //Delete the Selected Subject Mapping
    this.assignedSubjectIds = Array.prototype.map.call(this.selectedToRemove, s => s.SubjectId).toString();
    this.subjectMapping = {
      SemesterId: this.subjectService.subjectMappingParameter.SemesterId,
      SubjectIds: this.assignedSubjectIds,
      LanguageId: this.userService.selectedLanguageId
    }

    this.subjectService.DeleteSubjectMapping(this.subjectMapping).subscribe(
      res => {
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", 2000);
        this.subjectService.GetUnassignedSubject();
        this.subjectService.GetAssignedSubject();
      },
      err => {
        console.log(err);
      }
    );
  }
  // SaveMapping() {
  //   this.unassignedSubjectIds = Array.prototype.map.call(this.subjectService.unassignedSubject, s => s.SubjectId).toString();
  //   this.assignedSubjectIds = Array.prototype.map.call(this.subjectService.assignedSubject, s => s.SubjectId).toString();

  //   this.subjectMapping = {
  //     SemesterId: this.subjectService.subjectMappingParameter.SemesterId,
  //     SubjectIds: this.assignedSubjectIds,
  //     LanguageId: this.userService.selectedLanguageId
  //   }

  //   this.subjectService.InsertSubjectMapping(this.subjectMapping).subscribe(
  //     res => {
  //       this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveSuccess'), "", 2000);
  //       // this.subjectService.resetForm(form);
  //       // this.subjectService.GetSubjectList();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
}
