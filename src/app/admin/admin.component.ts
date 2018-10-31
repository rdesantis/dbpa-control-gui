import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JobsService }  from '../jobs.service';
import { JobRun } from '../job-run';
import { SchedulesService } from '../schedules.service';
import { LocalDateTime } from '../local-date-time';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  runningJobs: JobRun[];
  runningSchedules: string[];

  constructor(
    private jobsService: JobsService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit() {
    this.getRunning();
  }

  getRunning(): void {
    this.jobsService.getRunning()
        .subscribe(running => this.runningJobs = running);
    this.schedulesService.getRunning()
        .subscribe(running => this.runningSchedules = running);
  }

  formatDateTime(dateTime: number[]): string {
    return LocalDateTime.toString(dateTime);
  }

  formatElapsed(startDateTime: number[]): string {
    let endDateTime: number[] = LocalDateTime.now();
    return LocalDateTime.until(startDateTime, endDateTime);
  }
}
