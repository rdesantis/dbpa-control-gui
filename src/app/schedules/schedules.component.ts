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
