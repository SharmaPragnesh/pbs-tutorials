import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo: any;

  constructor(private msalService: MsalService, public router: Router) { }

  logoutUser() {
    this.msalService.logout();
    localStorage.removeItem('logininfo');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }
}
