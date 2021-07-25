import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: UserService,
    private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.loggedIn()) {
      const role = this._authService.userInfo["IsAdmin"] ? Role.Admin : Role.User;
      if (route.data.roles && route.data.roles.indexOf(role) === -1) {
        this._router.navigate(['/']);
        return false;
      }
      console.log('loggedIn=true')
      return true
    } else {
      console.log('loggedIn=false')
      this._router.navigate(['/login'])
      return false
    }
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
