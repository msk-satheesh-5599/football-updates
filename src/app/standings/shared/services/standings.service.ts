import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlEndpoints } from 'src/app/shared/class/urlEndpoints.class';
import { IResponse } from 'src/app/shared/modals/response.interface';
import { Country } from 'src/app/standings/shared/modals/country.interface';
import { ILeaugue } from 'src/app/standings/shared/modals/leauge.interface';
import { IStandings } from 'src/app/standings/shared/modals/standings.interface';

@Injectable({
  providedIn: 'root',
})
export class StandingsService {
  public standings = new Map();
  public selectedCountry: Country | null = null;
  public selectedCountryMapper = new Map();
  public selectedLeauge = new Map();
  constructor(private http: HttpClient) {}

  public getLeagueId(country: Country): Observable<IResponse<ILeaugue>> {
    const params = new HttpParams()
      .append('country', country.name.toLowerCase())
      .append('name', country.leauge)
      .append('current', country.current);
    return this.http.get<IResponse<ILeaugue>>(UrlEndpoints.leagues, {
      params: params,
    });
  }

  public getStandings(
    leagueId: number,
    season: number
  ): Observable<IResponse<IStandings>> {
    const params = new HttpParams()
      .append('league', leagueId)
      .append('season', season);
    return this.http.get<IResponse<IStandings>>(UrlEndpoints.standings, {
      params: params,
    });
  }
}
