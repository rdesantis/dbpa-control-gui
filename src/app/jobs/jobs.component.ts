import { Component, OnInit } from '@angular/core';

import { JobWithName } from '../job-with-name';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobsWithNames: JobWithName[];
  filter: string = "";

  maxArguments: number = 0;

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.getJobs();
  }

  setFilter(filter: string) {
    this.filter = filter.trim();;
    this.getJobs();
  }

  getJobs() {
    this.jobsService.getAll(this.filter)
        .subscribe(map => {
          this.jobsWithNames = [];
          for (let property in map) {
            this.jobsWithNames.push(new JobWithName(property, map[property]));
          }
          this.setMaxArguments();
        });
  }

  private setMaxArguments(): void {
    let result: number = 0;
    for (let jobWithName of this.jobsWithNames) {
      result = Math.max(result, jobWithName.getArguments().length);
    }
    this.maxArguments = result;
  }

  getArgumentNumbers(): number[] {
    return Array.from(Array(this.maxArguments).keys());
  }
}
