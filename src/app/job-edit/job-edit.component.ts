import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JobsService }  from '../jobs.service';
import { Job } from '../job';
import { ScriptArgument } from '../script-argument';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  name: string;
  job: Job;
  editNotCreate: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    this.editNotCreate = (this.route.snapshot.paramMap.get('name') !== null);

    this.getJob();
  }

  getJob(): void {
    if (this.editNotCreate) {
      this.name = this.route.snapshot.paramMap.get('name');
      this.jobsService.get(name)
          .subscribe(job => this.job = job);
    }
    else {
      this.name = "";
      this.job = Job.emptyJob();
      document.getElementById("name").focus();
      // The element has the focus but on Edge it is not visually obvious until you start typing; on Chrome it is.
      }
  }

	save(): void {
    this.jobsService.put(this.name, this.job)
        .subscribe(() => this.router.navigate(["/job-detail", this.name]));
  }

  reset(): void {
    this.getJob();
  }
}
