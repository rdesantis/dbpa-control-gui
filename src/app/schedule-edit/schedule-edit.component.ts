import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SchedulesService }  from '../schedules.service';
import { Schedule } from '../schedule';
import { ScheduleValidation } from '../schedule-validation';
import { RecurrenceMode, DateUnit, DateRecurrence, LogicalOrdinal, LogicalDay, TimeUnit, ScheduleConfig } from '../schedule-config';
import { ScheduleConfigBindable } from '../schedule-config-bindable';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  schedule: Schedule;
  editNotCreate: boolean;
  validation: ScheduleValidation;
  config: ScheduleConfig;
  configBindable: ScheduleConfigBindable;
  rendering: string;

  public recurrenceMode = RecurrenceMode;
  public dateRecurrence = DateRecurrence;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: SchedulesService
  ) {}

  ngOnInit(): void {
    this.editNotCreate = (this.route.snapshot.paramMap.get('name') !== null);

    this.getSchedule();
    this.validation = {valid: true, validationMessage: ``};
    this.config = new ScheduleConfig();
    this.configBindable = new ScheduleConfigBindable();
    this.configBindable.from(this.config);
    this.renderConfig();
  }

  getSchedule(): void {
    this.schedule = new Schedule();
    if (this.editNotCreate) {
      const name = this.route.snapshot.paramMap.get('name');
      this.schedule.name = name;
      this.scheduleService.get(name)
          .subscribe(body => this.schedule.body = body);
    }
    else {
      this.schedule.name = "";
      this.schedule.body = "";
      document.getElementById("name").focus();
      // The element has the focus but on Edge it is not visually obvious until you start typing; on Chrome it is.
      }
  }

	save(): void {
    let service = this.editNotCreate ? this.scheduleService.update : this.scheduleService.add;
    service.call(this.scheduleService, this.schedule.name, this.schedule.body)
        .subscribe(() => this.router.navigate(["/schedule-detail", this.schedule.name]));
  }

  reset(): void {
    this.clear();
    this.getSchedule();
  }

  clear(): void {
    this.schedule.body = ``;
    this.validate();
  }

  add(): void {
    if (this.schedule.body !== ``) {
      this.schedule.body += ",\r\n";
    }
    this.schedule.body += this.rendering;
    this.validate();
  }

  validate(): void {
    if (this.schedule.body === "") {
      this.validation.valid = true;
    }
    else {
      this.scheduleService.validateBody(this.schedule.body)
      .subscribe(validation => this.validation = validation);
    }
  }

  renderConfig(): void {
    this.configBindable.to(this.config);
    this.rendering = this.config.render();
  }

  changeDateMode(recurrenceMode: RecurrenceMode): void  {
    this.configBindable.setDateMode(recurrenceMode);
    this.renderConfig();
  }

  changeDateRecurrence(dateRecurrence: DateRecurrence): void  {
    this.configBindable.setDateRecurrence(dateRecurrence);
    this.configBindable.setDateUnit((dateRecurrence === DateRecurrence.daysOfWeek) ? DateUnit.week : DateUnit.month);
    this.configBindable.setDateMode(RecurrenceMode.recurring);
    this.renderConfig();
  }

  changeDateUnit(): void {
    this.configBindable.setDateRecurrence(null);
    this.configBindable.setDateMode(RecurrenceMode.recurring);
    this.renderConfig();
  }

  changeTimeMode(recurrenceMode: RecurrenceMode): void  {
    this.configBindable.setTimeMode(recurrenceMode);
    this.renderConfig();
  }
}
