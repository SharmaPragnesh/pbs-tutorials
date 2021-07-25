import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'microsoft-login';

  constructor(private msalService: MsalService) {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      console.log(res);
      console.log(res.account.username)
      this.msalService.instance.setActiveAccount(res.account);
      // this.isLoggedIn();
    })
  }

  logout() {
    this.msalService.logout();
  }
}
