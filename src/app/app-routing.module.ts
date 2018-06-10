import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent }      from './heroes/heroes.component';
import { SchedulesComponent }      from './schedules/schedules.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { ScheduleDetailComponent }  from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent }  from './schedule-edit/schedule-edit.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'schedule-detail/:name', component: ScheduleDetailComponent },
  { path: 'schedule-edit/:name', component: ScheduleEditComponent },
  { path: 'schedules', component: SchedulesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}