import { Component, OnInit } from '@angular/core';

import { JobWithName } from '../job-with-name';
import { JobsService } from '../jobs.service';
import { ScriptArgument } from '../script-argument';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobsWithNames: JobWithName[];

  maxArguments: number = 0;

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs(filterValue?: string) {
	  if (filterValue) {
			filterValue = `%${filterValue.trim()}%`;  // Remove leading & trailing whitespace, add wildcards
	  }
    this.jobsService.getAll(filterValue)
        .subscribe(map => {
          this.jobsWithNames = [];
          for (let property of Object.keys(map).sort()) {
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

  getArgumentsPadded(jobWithName: JobWithName): ScriptArgument[] {
      let result: ScriptArgument[] = jobWithName.job["arguments"].slice(0);
      let actualLength: number = result.length;
      result.length = this.maxArguments;
      result.fill({name: "", value: ""}, actualLength, this.maxArguments);
      return result;
    }
}
