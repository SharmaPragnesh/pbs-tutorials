import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(private msalService: MsalService, public router: Router) {
    if (this.isLoggedIn()) {
      if (!!localStorage.getItem('logininfo')) {
        this.user = JSON.parse(localStorage.getItem('logininfo'));
      }
    }
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      console.log(res);
      this.user = res.account;
      localStorage.setItem('logininfo', JSON.stringify(res.account));
      this.msalService.instance.setActiveAccount(res.account);
      this.router.navigate(['/dashboard']);
    })
  }

  logout() {
    localStorage.removeItem('logininfo');
    this.msalService.logout();
  }
}
