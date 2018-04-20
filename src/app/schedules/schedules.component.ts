import { Component, OnInit } from '@angular/core';

import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules: Schedule[];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.getSchedules();
  }

  getSchedules(): void {
    this.scheduleService.getSchedules()
        .subscribe(schedules => {
          this.schedules = [];
          for (let property in schedules) {
            this.schedules.push({name: property, body: schedules[property]});
          }
        });
  }

	add(name: string, body: string): void {
	  name = name.trim();
	  if (!name) { return; }
	  this.scheduleService.addSchedule(name, body)
		.subscribe(_ => {
		  this.schedules.push({name: name, body: body});
		});
	}

	delete(name: string): void {
	  this.schedules = this.schedules.filter(s => s.name !== name);
	  this.scheduleService.deleteSchedule(name).subscribe();
	}
}
