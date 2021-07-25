import { Router } from '@angular/router';

import { Injectable, NgZone } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
// import * as store from 'store';

const MINUTES_UNITL_AUTO_LOGOUT = environment.Timeout // in Minutes
const CHECK_INTERVALL = 1000 // in ms
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  //https://medium.com/@sean.nicholas/how-we-implemented-auto-logout-client-side-c060b1eb311c
  constructor(private auth: UserService, private router: Router, private ngZone: NgZone, private dialogRef: MatDialog) {

    if (this.auth.loggedIn()) {
      this.check();
    }

    this.initListener();
    this.initInterval();
  }

  get lastAction() {
    // debugger;
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  set lastAction(value) {
    localStorage.setItem(STORE_KEY, value.toString());
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      // document.body.addEventListener('mouseover', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        if (this.auth.loggedIn()) {
          this.check();
        }
      }, CHECK_INTERVALL);
    })
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    const remaingSeconds = Math.floor(diff / 1000);

    if (!isNaN(remaingSeconds)) {
      this.ngZone.run(() => {
        if (isTimeout && this.auth.loggedIn()) {
          console.log(`You were automatically logged out after ${MINUTES_UNITL_AUTO_LOGOUT} minutes of inactivity`);
          this.auth.logoutUser(true);
          this.dialogRef.closeAll(); //Close all poups pages (if page is popup)
          this.router.navigate(['login']);
        }
        else {
          // Calculate the number of days left
          var days = 0; //Math.floor(remaingSeconds / 86400);
          // After deducting the days calculate the number of hours left
          var hours = Math.floor((remaingSeconds - (days * 86400)) / 3600)
          // After days and hours , how many minutes are left
          var minutes = Math.floor((remaingSeconds - (days * 86400) - (hours * 3600)) / 60)
          // Finally how many seconds left after removing days, hours and minutes.
          var secs = Math.floor((remaingSeconds - (days * 86400) - (hours * 3600) - (minutes * 60)))
          if (environment.ShowTimerLogs) {
            console.log("(" + hours + " Hours " + minutes + " Minutes and " + secs + " Secondes) -> Total Seconds=" + remaingSeconds);
          }
        }
      });
    }
  }
}
