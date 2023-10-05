import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IResponse } from 'src/app/shared/modals/response.interface';
import { IFixtures } from 'src/app/team/shared/modals/fixture.interface';
import { TeamsService } from 'src/app/team/shared/services/teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnDestroy {
  public fixtures: IFixtures[] = [];
  private subscription$ = new Subject<void>();
  constructor(route: ActivatedRoute, private teamService: TeamsService) {
    const teamId = route.snapshot.paramMap.get('id') ?? '0';
    const teamResult = this.teamService.teamResults.get(parseInt(teamId));
    if (teamResult) {
      this.fixtures = teamResult;
    } else {
      this.getFixtures(parseInt(teamId));
    }
  }

  private getFixtures(team: number): void {
    this.teamService
      .getFixtures(team)
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (resp: IResponse<IFixtures>) => {
          this.fixtures = resp.response;
          this.teamService.teamResults.set(team, this.fixtures);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
