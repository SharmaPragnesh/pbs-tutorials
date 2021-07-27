import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageParameter, Roles } from '../Models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public labels: any = {
    previousLabel: 'Common.Previous',
    nextLabel: 'Common.Next'
  };

  constructor(private http: HttpClient, private router: Router) { }

  RolesList(pageParameter: PageParameter) {
    return this.http.post<Roles[]>(environment.erpApiURL + '/Roles', pageParameter).pipe(
      catchError(this.handleError)
    );
  }

  InsertUpdateRoles(institution?: Roles) {
    debugger;
    if (institution != undefined) {
      institution.Id = Number(institution.Id);
      return this.http.post<any>(environment.erpApiURL + '/Roles/InsertUpdateRoles', institution).pipe(
        catchError(this.handleError)
      );
    }
    // else {
    // institution.Id = Number(institution.Id);
    // return this.http.post<any>(environment.apiURL + '/Roles/InsertUpdateRoles', this.institutionFormData).pipe(
    //   catchError(this.handleError)
    // );
    // }
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401) {
        console.log(error);
        this.router.navigate(['/login'])
      }
      else if (error.status === 500) {
        console.error(`ErrorFromWebAPI code ${error.status}, ` + `body was: ${error.error}`);
        return throwError('ErrorFromWebAPI');
      }
      else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
