import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private translate: TranslateService, public userService: UserService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      UserName: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (environment.ShowConsoleLogs) {
      console.log(this.registerForm.value);
    }
    if (this.registerForm.invalid) {
      return false;
    }
    else {
      this.userService.ForgotPassword(this.registerForm.value).subscribe(data => {
        if (data) {
          this.registerForm.reset();
          this.registerForm.patchValue({
            UserName: ''
          });
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.ForgotPassword'), "", environment.timeSpanLarge);
        }
      });
    }
  }
}
