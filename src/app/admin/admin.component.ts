import { Component, OnInit } from '@angular/core';

import { JobsService }  from '../jobs.service';
import { JobRun } from '../job-run';
import { ScheduleStateWithName } from '../schedule-state-with-name';
import { SchedulesService } from '../schedules.service';
import { LocalDateTime } from '../local-date-time';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  runningJobs: JobRun[];
  runningSchedulesWithStates: ScheduleStateWithName[];

  constructor(
    private jobsService: JobsService,
    private schedulesService: SchedulesService,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.getRunning();
  }

  getRunning(): void {
    this.jobsService.getRunning()
        .subscribe(running => this.runningJobs = running);
    this.schedulesService.getRunningStates()
        .subscribe(map => {
          this.runningSchedulesWithStates = [];
          for (let property in map) {
            this.runningSchedulesWithStates.push(new ScheduleStateWithName(property, map[property]));
          }
          this.runningSchedulesWithStates.sort(this.compareByNextJobTime);
        });
  }

  compareByNextJobTime(a: ScheduleStateWithName, b: ScheduleStateWithName): number {
    return LocalDateTime.toDate(a.state.nextJobTime).getTime() - LocalDateTime.toDate(b.state.nextJobTime).getTime();
  }

  formatNow(): string {
    return LocalDateTime.toString(LocalDateTime.now());
  }

  formatDateTime(dateTime: number[]): string {
    return LocalDateTime.toString(dateTime);
  }

  formatElapsed(startDateTime: number[]): string {
    let endDateTime: number[] = LocalDateTime.now();
    return LocalDateTime.until(startDateTime, endDateTime);
  }

  formatRemaining(endDateTime: number[]): string {
    let startDateTime: number[] = LocalDateTime.now();
    return LocalDateTime.until(startDateTime, endDateTime);
  }

  kill() {
    let confirmed: boolean = confirm(
"Stopping the service will stop any running jobs, " +
"prevent any other jobs from starting, " +
"and prevent access to all ManageDbp resources " +
"(jobs, scripts, schedules). " +
"The service cannot be restarted here; " +
"it must be restarted by a system administrator " +
"with access to the service host computer." + `

Are you sure you want to stop the service?`);

    if (confirmed) {
      this.serviceService.kill().subscribe(() => {this.runningJobs = null; this.runningSchedulesWithStates = null;});
    }
  }
}
