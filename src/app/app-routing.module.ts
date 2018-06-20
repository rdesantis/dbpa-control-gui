import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScriptsComponent }      from './scripts/scripts.component';
import { SchedulesComponent }      from './schedules/schedules.component';
import { ScheduleDetailComponent }  from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent }  from './schedule-edit/schedule-edit.component';

// TODO: Delete these
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'scripts', component: ScriptsComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'schedule-detail/:name', component: ScheduleDetailComponent },
  { path: 'schedule-edit', component: ScheduleEditComponent },
  { path: 'schedule-edit/:name', component: ScheduleEditComponent },

  // TODO: Delete these; fix redirect at top of this list
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
