import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscriber } from 'rxjs';
import { Files } from 'src/app/Models/note-list.model';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  uploadResponse = { status: '', percentage: 0 };
  fileUploadError: string;
  files: Files;
  registerForm: FormGroup;
  guIdFileName: string = '';
  originalFileName: string = '';
  showMore: boolean = false;

  constructor(private router: Router, private translate: TranslateService, public notifyService: NotificationService,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    private formBuilder: FormBuilder, public noteListService: NoteListService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      InstitutionId: [this.noteListService.filesParameter.InstitutionId],
      StudyId: [this.noteListService.filesParameter.StudyId],
      SemesterId: [this.noteListService.filesParameter.SemesterId],
      SubjectId: [this.noteListService.filesParameter.SubjectId],
      FileTitle: ['', Validators.required],
      Keyword1: ['', Validators.required],
      Keyword2: [''],
      Keyword3: [''],
      Keyword4: [''],
      Keyword5: [''],
      FileDescription: ['', Validators.required]
    });
  }

  public upload(event) {
    console.log('--------------------upload START--------------------')
    this.fileUploadError = "";
    this.guIdFileName = uuid.v4();
    if (event.target.files && event.target.files.length > 0) {
      //https://convertlive.com/u/convert/megabytes/to/bytes#20
      // const max_size = 20971520; //Size in Bytes-20MB
      // const max_size = 104857600; //Size in Bytes-100MB
      const max_size = environment.UploadFileSize; //Size in Bytes-100MB
      const allowed_types = [
        'application/pdf', //PDF
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',//Word
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',//Excel
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'//PowerPoint
      ];

      const file = event.target.files[0];
      if (file.size > max_size) {
        this.fileUploadError = this.translate.instant('Messages.FileMaximumSize', { 0: (max_size / (1024 * 1024)) });
        return false;
      }

      console.log('File type is = ' + file.type);
      if (!allowed_types.includes(file.type)) {
        this.fileUploadError = this.translate.instant('Messages.FileNotValid'); //'Your file is not in PDF, Word, Excel or PowerPoint format, and it can´t be uploaded';
        return false;
      }

      this.originalFileName = file.name;
      this.noteListService.uploadFile(file, this.guIdFileName).subscribe((data: any) => {
        // alert('Subscriber method');
        console.log('data=' + JSON.stringify(data));
        if (data != null) {
          this.uploadResponse = data;
          if (data == true || data == false) {
            this.showMore = data;
          }
          console.log('--------------------upload END--------------------')
        }
      },
        err => {
          console.log(err);
        });
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.files = Object.assign({}, this.registerForm.value);
    this.files.GuId = this.guIdFileName;
    this.files.FileName = this.originalFileName;

    if (this.files.FileName.split(".").length >= 2) {
      this.files.FileType = this.files.FileName.split(".")[this.files.FileName.split(".").length - 1].trim();
    }

    console.log(this.files);
    this.noteListService.InsertFile(this.files).subscribe(
      res => {
        console.log('sucess');
        console.log(res);
        this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.ManyThanksForNotes'), "", environment.timeSpanLarge);
        this.dialogRef.close();
      },
      err => {
        console.log('error');
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
