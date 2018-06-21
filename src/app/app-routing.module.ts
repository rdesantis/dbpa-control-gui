import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO: Delete these:
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { ScriptsComponent } from './scripts/scripts.component';
import { ScriptDetailComponent } from './script-detail/script-detail.component';
import { ScriptEditComponent } from './script-edit/script-edit.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // TODO: Delete these; fix redirect at top of this list
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },

  { path: 'scripts', component: ScriptsComponent },
  { path: 'script-detail/:name', component: ScriptDetailComponent },
  { path: 'script-edit', component: ScriptEditComponent },
  { path: 'script-edit/:name', component: ScriptEditComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'schedule-detail/:name', component: ScheduleDetailComponent },
  { path: 'schedule-edit', component: ScheduleEditComponent },
  { path: 'schedule-edit/:name', component: ScheduleEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
