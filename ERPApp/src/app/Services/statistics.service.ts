import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatisticsParameter } from '../Models/statistics.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  GetStatistics(statisticsParameter: StatisticsParameter) {
    return this.http.post<any>(environment.apiURL + '/Statistics/GetStatistics', statisticsParameter);
  }

  public PrintStatistics(statisticsParameter: StatisticsParameter): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'POST',
      `${environment.apiURL}/Statistics/PrintStatistics?culture=` + this.userService.GetLanguageCulture() + `&ui-culture=` + this.userService.GetLanguageCulture(),
      statisticsParameter,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }
}
