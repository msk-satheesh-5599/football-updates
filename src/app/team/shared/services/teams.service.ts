import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlEndpoints } from 'src/app/shared/class/urlEndpoints.class';
import { IResponse } from 'src/app/shared/modals/response.interface';
import { StandingsService } from 'src/app/standings/shared/services/standings.service';
import { IFixtures } from 'src/app/team/shared/modals/fixture.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  public teamResults = new Map();
  constructor(
    private http: HttpClient,
    private standingService: StandingsService
  ) {}

  public getFixtures(team: number): Observable<IResponse<IFixtures>> {
    const selectedLeauge = this.standingService?.selectedLeauge.get(
      this.standingService.selectedCountry?.name
    );
    const params = new HttpParams()
      .append('team', team)
      .append('league', selectedLeauge ?? '')
      .append('last', 10);
    return this.http.get<IResponse<IFixtures>>(UrlEndpoints.fixtures, {
      params: params,
    });
  }
}
