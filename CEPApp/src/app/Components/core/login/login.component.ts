import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // user: any;

  constructor(private msalService: MsalService, public userService: UserService, public router: Router) {
    if (this.userService.isLoggedIn()) {
      if (!!localStorage.getItem('logininfo')) {
        this.userService.userInfo = JSON.parse(localStorage.getItem('logininfo'));
      }
    }
  }

  ngOnInit(): void {
  }

  // isLoggedIn(): boolean {
  //   var t = this.msalService.instance.getActiveAccount() != null;
  //   debugger;
  //   return this.msalService.instance.getActiveAccount() != null;
  // }

  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      console.log(res);
      this.userService.userInfo = res.account;
      localStorage.setItem('logininfo', JSON.stringify(res.account));
      this.msalService.instance.setActiveAccount(res.account);
      this.router.navigate(['/dashboard']);
    })
  }

  // logout() {
  //   localStorage.removeItem('logininfo');
  //   this.msalService.logout();
  // }
}
