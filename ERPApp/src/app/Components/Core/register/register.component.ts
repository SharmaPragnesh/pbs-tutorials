import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user.model';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  languageList: any[] = null;
  registerForm: FormGroup;
  // formData: User;

  constructor(private router: Router, private formBuilder: FormBuilder, private translate: TranslateService,
    public userService: UserService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.GetLanguageList();

    this.registerForm = this.formBuilder.group({
      UserId: [0],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Initials: [''],
      LanguageId: [1, Validators.required],
      // Email: [null, { validators: [Validators.required, Validators.email], asyncValidators: [this.userService.AddEditEmailValidator()], updateOn: 'blur' }],
      Email: [null, { validators: [Validators.required, Validators.email] }],
      UserName: [null, { validators: [Validators.required], asyncValidators: [this.userService.AddEditUserNameValidator()], updateOn: 'blur' }],
      // Password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      // https://stackoverflow.com/questions/48350506/how-to-validate-password-strength-with-angular-5-validator-pattern/48350507
      Password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      ConfirmPassword: ['', Validators.required],
      // Mobile: ['', Validators.required],
      IsAdmin: [false],
      SendNotification: [false]
    }, {
      validator: this.comparePasswords
    });

    this.userService.userRegisterForm = Object.assign({}, this.registerForm.value);
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

  GetLanguageList() {
    this.userService.LanguageList()
      .subscribe(
        res => {
          this.languageList = res;
        },
        err => {
          console.log(err);
        }
      )
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
      this.userService.InsertRegisterUser(this.registerForm.value).subscribe(
        res => {
          console.log('succesful register');
          this.notifyService.showInfoWithTimeout(this.translate.instant('Messages.RegisterSuccess'), "", environment.timeSpanLarge);
          this.registerForm.reset();
          this.registerForm.patchValue({
            LanguageId: 1
          });
          this.router.navigate(['/login'])
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onEmailChange(val) {
    this.registerForm.patchValue({
      UserName: val
    })
  }

}
