import { Component, OnInit } from '@angular/core';

import { Schedule } from '../schedule';
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules: Schedule[];

  constructor(private scheduleService: SchedulesService) { }

  ngOnInit() {
    this.getSchedules();
  }

  getSchedules(filterValue?: string) {
	  if (filterValue) {
			filterValue = `%${filterValue.trim()}%`;  // Remove leading & trailing whitespace, add wildcards
	  }
    this.scheduleService.getAll(filterValue)
        .subscribe(schedules => {
          this.schedules = [];
          for (let property of Object.keys(schedules).sort()) {
            this.schedules.push({name: property, body: schedules[property]});
          }
        });
  }
}
