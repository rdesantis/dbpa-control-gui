import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules: Schedule[];

  dataSource: MatTableDataSource<Schedule>;
  displayedColumns = ['name', 'body'];

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
          this.dataSource = new MatTableDataSource(this.schedules);
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
