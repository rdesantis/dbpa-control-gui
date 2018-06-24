import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScriptsComponent } from './scripts/scripts.component';
import { ScriptDetailComponent } from './script-detail/script-detail.component';
import { ScriptEditComponent } from './script-edit/script-edit.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'scripts', component: ScriptsComponent },
  { path: 'script-detail/:name', component: ScriptDetailComponent },
  { path: 'script-edit', component: ScriptEditComponent },
  { path: 'script-edit/:name', component: ScriptEditComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'schedule-detail/:name', component: ScheduleDetailComponent },
  { path: 'schedule-edit', component: ScheduleEditComponent },
  { path: 'schedule-edit/:name', component: ScheduleEditComponent },
  { path: 'jobs', component: JobsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
