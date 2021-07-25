import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public userService: UserService,
    private translate: TranslateService, private notifyService: NotificationService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      UserGuId: [''],
      // https://stackoverflow.com/questions/48350506/how-to-validate-password-strength-with-angular-5-validator-pattern/48350507
      Password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      ConfirmPassword: ['', Validators.required]
    }, {
      validator: this.comparePasswords
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.registerForm.patchValue({
        UserGuId: params.get('id')
      });
      const activateUser = {
        UserGuId: params.get('id')
      };
      console.log(activateUser);
    });
  }


  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value) {
        confirmPasswordCtrl.setErrors({ passwordMismatch: true })
      }
      else {
        confirmPasswordCtrl.setErrors(null);
      }
    }
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
      this.userService.UpdatePassword(this.registerForm.value).subscribe(
        res => {
          if (environment.ShowConsoleLogs) {
            console.log(res);
          }
          this.router.navigate(['/login']);
          if (res) {
            this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.ResetSuccess'), "", environment.timeSpanLarge);
          }
          else {
            this.notifyService.showErrorWithTimeout(this.translate.instant('Messages.ResetError'), "", environment.timeSpanLarge);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
