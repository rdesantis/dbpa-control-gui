import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JobsService }  from '../jobs.service';
import { Job } from '../job';
import { JobRun } from '../job-run';
import { LocalDateTime } from '../local-date-time';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  originalName: string;
  name: string;
  job: Job;
  isRenaming: boolean = false;
  isDeleting: boolean = false;
  runs: JobRun[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService
  ) {}

  ngOnInit(): void {
    this.originalName = this.route.snapshot.paramMap.get('name');
    this.name = this.originalName;
    this.getJob();
    this.getRuns();
  }

  getJob(): void {
    this.name = "";
    this.job = Job.emptyJob();
    this.name = this.route.snapshot.paramMap.get('name');
    this.jobsService.get(this.name)
        .subscribe(job => this.job = job);
  }

  getRuns(): void {
    this.jobsService.getRuns(this.originalName)
        .subscribe(runs => this.runs = runs);
  }

  formatDateTime(dateTime: number[]): string {
    return LocalDateTime.toString(dateTime);
  }

  formatDuration(startDateTime: number[], endDateTime: number[]): string {
    return LocalDateTime.until(startDateTime, endDateTime);
  }

  run() {
    // TODO: pass arguments
    this.jobsService.run(this.name, [])
        .subscribe(_ => this.getRuns());
  }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you strt typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    this.jobsService.rename(this.originalName, this.name)
        .subscribe(() => this.router.navigate(['/job-detail', this.name]));
  }

  cancelRename(): void {
    this.isRenaming = false;
    this.name = this.originalName;
  }

  startDelete(): void {
    this.isDeleting = true;
  }

  doDelete(): void {
    this.jobsService.delete(this.name)
        .subscribe(() => this.router.navigate(['/jobs']));
  }

  cancelDelete(): void {
    this.isDeleting = false;
  }
}
