import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from 'src/app/standings/standings.component';
import { TeamComponent } from 'src/app/team/team.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/standings',
  },
  {
    path: 'standings',
    component: StandingsComponent,
  },
  {
    path: 'team/:id',
    component: TeamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
