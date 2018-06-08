import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ScheduleService }  from '../schedule.service';
import { Schedule } from '../schedule';
import { RecurrenceMode, DateUnit, DateRecurrence, LogicalOrdinal, LogicalDay, TimeUnit, ScheduleConfig } from '../schedule-config';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  @Input() schedule: Schedule;
  @Input() config: ScheduleConfig;
  @Input() rendering: string;

  public recurrenceMode = RecurrenceMode;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSchedule();
    this.config = new ScheduleConfig();
    this.renderConfig();
  }

  getSchedule(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.schedule = new Schedule();
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

  clear(): void {
    this.schedule.body = "";
  }

  add(): void {

  }

  renderConfig(): void {
    this.rendering = this.config.render();
  }
}
