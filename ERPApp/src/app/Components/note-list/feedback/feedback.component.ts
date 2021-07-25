import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StarRatingComponent } from 'ng-starrating';
import { Files, FileScore } from 'src/app/Models/note-list.model';
import { ratingElement } from 'src/app/Models/ratingElement';
import { NoteListService } from 'src/app/Services/note-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  inValidOneField: boolean = false;
  //https://gist.github.com/zmnv/3049447ef7dd2802fa6148c4b1215896
  @ViewChild('imgRenderer1') imgRenderer1: ElementRef;
  @ViewChild('imgRenderer2') imgRenderer2: ElementRef;
  @ViewChild('imgRenderer3') imgRenderer3: ElementRef;
  ///
  myfiles: Files;
  registerForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<FeedbackComponent>,
    private translate: TranslateService, public notifyService: NotificationService,
    private formBuilder: FormBuilder, public noteListService: NoteListService,
    public userService: UserService, public router: Router) {

  }

  ngOnInit(): void {
    this.myfiles = this.data.files;
    this.buildForm();
    this.setFeedbackTypeValidators();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      FeedbackType: [''],
      FeedbackComment1: [''],
      FeedbackComment2: [''],
      FeedbackComment3: [''],
      FeedbackComment: [''],
      Image64String: [''],
      ContactMe: [false]
    });
  }

  setFeedbackTypeValidators() {
    const FeedbackComment1Control = this.registerForm.get('FeedbackComment1');
    const FeedbackComment2Control = this.registerForm.get('FeedbackComment2');
    const FeedbackComment3Control = this.registerForm.get('FeedbackComment3');

    this.registerForm.get('FeedbackType').valueChanges
      .subscribe(feedbackType => {

        if (feedbackType === 1) {//There is something I like
          FeedbackComment1Control.setValidators([Validators.required]);
          FeedbackComment2Control.setValidators(null);
          FeedbackComment3Control.setValidators(null);
        }

        if (feedbackType === 2) {//There is something I don´t like
          FeedbackComment1Control.setValidators(null);
          FeedbackComment2Control.setValidators([Validators.required]);
          FeedbackComment3Control.setValidators(null);
        }

        if (feedbackType === 3) {//I have a proposal
          FeedbackComment1Control.setValidators(null);
          FeedbackComment2Control.setValidators(null);
          FeedbackComment3Control.setValidators([Validators.required]);
        }

        FeedbackComment1Control.updateValueAndValidity();
        FeedbackComment2Control.updateValueAndValidity();
        FeedbackComment3Control.updateValueAndValidity();
      });
  }

  ngAfterViewInit(): void {
    $('.feedback-row').hide();
    $(document).ready(function () {
      $('a.feedback-type').click(function (e) {
        e.preventDefault();
        $(".feedback-row").hide();
        $(this).next('.feedback-row').slideToggle(100);
        $('a.feedback-type.active').removeClass('active');
        $(this).addClass('active');
      });
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  setFeedbackType(feedbackType: number) {
    this.inValidOneField = false;
    if (feedbackType == 1) {
      this.registerForm.patchValue({
        FeedbackType: feedbackType,
        FeedbackComment: this.registerForm.value.FeedbackComment1
      });
    }
    else if (feedbackType == 2) {
      this.registerForm.patchValue({
        FeedbackType: feedbackType,
        FeedbackComment: this.registerForm.value.FeedbackComment2
      });
    }
    else {
      this.registerForm.patchValue({
        FeedbackType: feedbackType,
        FeedbackComment: this.registerForm.value.FeedbackComment3
      });
    }
  }

  changeFeedbackComment(obj: any) {
    this.registerForm.patchValue({
      FeedbackComment: obj.target.value
    });
  }

  onPaste(event: any, feedbackType: number) {
    const items = event.clipboardData.items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {

      const fileFromBlob: File = new File([blob], 'your-filename.jpg');

      const reader = new FileReader();
      reader.onload = (evt: any) => {
        console.log(evt.target.result); // data url!
        if (feedbackType == 1) {
          this.imgRenderer1.nativeElement.src = evt.target.result;
        }
        else if (feedbackType == 2) {
          this.imgRenderer2.nativeElement.src = evt.target.result;
        }
        else {
          this.imgRenderer3.nativeElement.src = evt.target.result;
        }
      };
      reader.readAsDataURL(blob);
    }
  }

  onSubmit() {
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm.value);
    }

    if (this.registerForm.value.FeedbackType == '') {
      this.inValidOneField = true;
      return false;
    }

    if (this.registerForm.invalid) {
      return false;
    }
    else {
      // console.log(this.imgRenderer.nativeElement.src);
      var feedback = {
        FeedbackType: this.registerForm.value.FeedbackType,
        FeedbackComment: this.registerForm.value.FeedbackComment,
        Image64String: (this.registerForm.value.FeedbackType == 1 ? this.imgRenderer1.nativeElement.src : (this.registerForm.value.FeedbackType == 2 ? this.imgRenderer2.nativeElement.src : this.imgRenderer3.nativeElement.src)),
        ContactMe: this.registerForm.value.ContactMe,
        UserId: this.userService.userInfo.UserId,
        UserFullName: this.userService.userInfo.FirstName + ' ' + (this.userService.userInfo.LastName != '' ? this.userService.userInfo.LastName : '')
      }

      this.noteListService.SendFeedbackMail(feedback).subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.SaveFeedback'), "", environment.timeSpanMedium);
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
}
