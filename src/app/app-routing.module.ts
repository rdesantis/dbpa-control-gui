import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScriptsComponent } from './scripts/scripts.component';
import { ScriptDetailComponent } from './script-detail/script-detail.component';
import { ScriptEditComponent } from './script-edit/script-edit.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobEditComponent } from './job-edit/job-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },

  { path: 'scripts', component: ScriptsComponent },
  { path: 'script-detail/:name', component: ScriptDetailComponent },
  { path: 'script-edit', component: ScriptEditComponent },
  { path: 'script-edit/:name', component: ScriptEditComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'schedule-detail/:name', component: ScheduleDetailComponent },
  { path: 'schedule-edit', component: ScheduleEditComponent },
  { path: 'schedule-edit/:name', component: ScheduleEditComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'job-detail/:name', component: JobDetailComponent },
  { path: 'job-edit', component: JobEditComponent },
  { path: 'job-edit/:name', component: JobEditComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
