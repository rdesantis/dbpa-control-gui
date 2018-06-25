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
  isRenaming: boolean = false;
  isDeleting: boolean = false;
  runs: JobRun[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobsService
  ) {}

  ngOnInit(): void {
    this.originalName = this.route.snapshot.paramMap.get('name');
    this.name = this.originalName;
    this.getRuns();
  }

  getRuns(): void {
    this.jobService.getRuns(this.originalName)
        .subscribe(runs => this.runs = runs);
  }

  formatDateTime(dateTime: number[]): string {
    return LocalDateTime.toString(dateTime);
  }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you strt typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    this.jobService.rename(this.originalName, this.name)
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
    this.jobService.delete(this.name)
        .subscribe(() => this.router.navigate(['/jobs']));
  }

  cancelDelete(): void {
    this.isDeleting = false;
  }
}
