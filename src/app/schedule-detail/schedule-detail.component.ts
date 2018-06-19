import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SchedulesService }  from '../schedules.service';
import { Schedule } from '../schedule';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  @Input() schedule: Schedule;
  isRenaming: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: SchedulesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.schedule = new Schedule;
    this.schedule.name = name;
    this.scheduleService.get(name)
      .subscribe(body => this.schedule.body = body);
  }

	save(): void {
	   this.scheduleService.update(this.schedule.name, this.schedule.body)
		 .subscribe(() => this.goBack());
//		 .subscribe(() => {});	// Works; saves and does not go back
//		 .subscribe();			// Also works; saves and does not go back
	 }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    this.scheduleService.delete(this.schedule.name)
    .subscribe(() => this.goBack());
 }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you strt typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    const name = this.route.snapshot.paramMap.get('name');
    this.scheduleService.rename(name, this.schedule.name)
    .subscribe(() => this.goBack());
 }

  cancelRename(): void {
    this.isRenaming = false;
    this.schedule.name = this.route.snapshot.paramMap.get('name');
  }
}
