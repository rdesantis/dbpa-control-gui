import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JobsService }  from '../jobs.service';
import { Job } from '../job';
import { ScriptsService } from '../scripts.service';
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  editNotCreate: boolean;
  name: string;
  job: Job;
  numberOfSlashesInScriptName: number;
  selectedScriptNames: string[];
  allScheduleNames: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private scriptsService: ScriptsService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit() {
    this.editNotCreate = (this.route.snapshot.paramMap.get('name') !== null);
    this.numberOfSlashesInScriptName = -1;
    this.getJob();
    this.getAllScheduleNames();
  }

  getJob(): void {
    this.name = "";
    this.job = Job.emptyJob();
    if (this.editNotCreate) {
      this.name = this.route.snapshot.paramMap.get('name');
      this.jobsService.get(this.name)
          .subscribe(job => { this.job = job; this.changeScriptNameFilter(); });
    }
    else {
      this.changeScriptNameFilter();
      document.getElementById("name").focus();
      // The element has the focus but on Edge it is not visually obvious until you start typing; on Chrome it is.
      }
  }

  getAllScheduleNames(): void {
    this.schedulesService.getNames('')
        .subscribe(names => this.allScheduleNames = names);
  }

  save(): void {
    this.jobsService.put(this.name, this.job)
        .subscribe(() => this.router.navigate(["/job-detail", this.name]));
  }

  reset(): void {
    this.getJob();
  }

  changeScriptNameFilter(): void {
    let newNumberOfSlashesInScriptName: number = 0;
    if (this.job.scriptName !== null) {
      newNumberOfSlashesInScriptName = this.job.scriptName.split('/').length - 1;
    }
    if (newNumberOfSlashesInScriptName !== this.numberOfSlashesInScriptName) {
      this.numberOfSlashesInScriptName = newNumberOfSlashesInScriptName;

      let directory: string = '';
      if (this.job.scriptName !== null) {
        let slashIndex: number = this.job.scriptName.lastIndexOf('/');
        if (-1 < slashIndex) {
          directory = this.job.scriptName.substring(0, slashIndex).trim();
        }
      }
      this.scriptsService.getNames(directory, '')
          .subscribe(names => this.selectedScriptNames = names);
    }
  }

  getScheduleIndexes(): number[] {
    return Array.from(Array(this.job.scheduleNames.length).keys());
  }

  deleteSchedule(i: number): void {
    this.job.scheduleNames.splice(i, 1);
  }

  addSchedule(): void {
    this.job.scheduleNames.push('');
  }

  getArgumentIndexes(): number[] {
    return Array.from(Array(this.job["arguments"].length).keys());
  }

  deleteArgument(i: number): void {
    this.job["arguments"].splice(i, 1);
  }

  addArgument(): void {
    this.job["arguments"].push({name: "", value: ""});
  }
}
