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
  isRenaming: boolean = false;

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

  delete(): void {
    this.scheduleService.deleteSchedule(this.schedule.name)
    .subscribe(() => this.goBack());
 }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you strt typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    // TODO: save it
  }

  cancelRename(): void {
    this.isRenaming = false;
    this.schedule.name = this.route.snapshot.paramMap.get('name');
  }
}
