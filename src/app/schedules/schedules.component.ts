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

  getSchedules(): void {
    this.scheduleService.getAll()
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
	  this.scheduleService.add(name, body)
		.subscribe(_ => {
		  this.schedules.push({name: name, body: body});
		});
	}

	delete(name: string): void {
	  this.schedules = this.schedules.filter(s => s.name !== name);
	  this.scheduleService.delete(name).subscribe();
	}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    this.scheduleService.search(filterValue)
        .subscribe(schedules => {
          this.schedules = [];
          for (let property in schedules) {
            this.schedules.push({name: property, body: schedules[property]});
          }
        });
  }
}
