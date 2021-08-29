import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client, ClientIndustry, ClientParameter } from '../Models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientParameter: ClientParameter;
  constructor(private http: HttpClient, private router: Router) { }

  GetFormModel() {
    if (this.clientParameter === undefined) {
      this.clientParameter = {
        PageStart: 1,
        PageSize: environment.pageSize,
        SortOrder: true,
        SortColumn: "ClientName"
      };
    }
  }

  GetClientsSearch() {
    return this.http.post<Client[]>(environment.apiURL + '/Client/GetClientsSearch', this.clientParameter).pipe(
      catchError(this.handleError)
    );
  }

  GetClients() {
    return this.http.get<Client[]>(environment.apiURL + '/Client/GetClients').pipe(
      catchError(this.handleError)
    );
  }

  GetClientById(clientId: number) {
    return this.http.get<Client>(environment.apiURL + '/Client/GetClientById?clientId=' + clientId).pipe(
      catchError(this.handleError)
    );
  }

  SaveClient(client: Client) {
    client.Status = Number.parseInt(client.Status.toString());
    client.ClientIndustryId = Number.parseInt(client.ClientIndustryId.toString());
    return this.http.post<any>(environment.apiURL + '/Client/SaveClient', client).pipe(
      catchError(this.handleError)
    );
  }

  GetClientIndustries() {
    return this.http.get<ClientIndustry[]>(environment.apiURL + '/Client/GetClientIndustries').pipe(
      catchError(this.handleError)
    );
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
