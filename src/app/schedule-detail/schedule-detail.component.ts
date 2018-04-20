import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ScheduleService }  from '../schedule.service';
import { Schedule } from '../schedule';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  @Input() schedule: Schedule;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.schedule = new Schedule;
    this.schedule.name = name;
    this.scheduleService.getSchedule(name)
      .subscribe(body => this.schedule.body = body);
  }

	save(): void {
	   this.scheduleService.updateSchedule(this.schedule.name, this.schedule.body)
		 .subscribe(() => this.goBack());
//		 .subscribe(() => {});	// Works; saves and does not go back
//		 .subscribe();			// Also works; saves and does not go back
	 }

  goBack(): void {
    this.location.back();
  }

}
