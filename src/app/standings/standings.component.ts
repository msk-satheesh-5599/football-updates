import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IResponse } from 'src/app/shared/modals/response.interface';
import { countries } from 'src/app/standings/shared/constants/countries.const';
import { Country } from 'src/app/standings/shared/modals/country.interface';
import { ILeaugue } from 'src/app/standings/shared/modals/leauge.interface';
import {
  IStandings,
  ISubStandings,
} from 'src/app/standings/shared/modals/standings.interface';
import { StandingsService } from 'src/app/standings/shared/services/standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnDestroy {
  public countries = countries;
  public standings: ISubStandings[] = [];
  public showStandings = false;
  public selectedCountry: Country | null = null;
  private subscription$ = new Subject<void>();
  constructor(private standingService: StandingsService) {
    const selectedLeauge = this.standingService.selectedLeauge;
    if (selectedLeauge) {
      this.selectedCountry = this.standingService.selectedCountry;
      this.standings = this.standingService.standings.get(+selectedLeauge);
      this.showStandings = true;
    }
  }

  public getLeaugueId(country: Country): void {
    this.selectedCountry = country;
    this.standingService.selectedCountry = country;
    this.standingService
      .getLeagueId(country)
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (league: IResponse<ILeaugue>) => {
          const leagueId = league.response[0].league.id;
          this.standingService.selectedLeauge = leagueId;
          this.getStandings(leagueId);
        },
      });
  }

  private getStandings(leaugeId: number): void {
    const season = new Date().getFullYear();
    this.standingService
      .getStandings(leaugeId, season)
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (standings: IResponse<IStandings>) => {
          this.standings = standings.response[0].league.standings[0];
          this.standingService.standings.set(leaugeId, this.standings);
          this.showStandings = true;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
