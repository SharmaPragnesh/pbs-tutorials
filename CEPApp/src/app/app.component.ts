import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CEPApp';
  showLogout: boolean = false;

  constructor(public userService: UserService, public router: Router) {
    if (this.userService.isLoggedIn()) {
      if (!!localStorage.getItem('logininfo')) {
        this.userService.userInfo = JSON.parse(localStorage.getItem('logininfo'));
      }
    }
  }

  ToggleLogout() {
    this.showLogout = !this.showLogout;
  }
}
