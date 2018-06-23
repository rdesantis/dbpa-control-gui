import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SchedulesService }  from '../schedules.service';
import { Schedule } from '../schedule';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  @Input() schedule: Schedule;
  originalName: string;
  isRenaming: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: SchedulesService
  ) {}

  ngOnInit(): void {
    this.originalName = this.route.snapshot.paramMap.get('name');
    this.get();
  }

  get(): void {
    this.schedule = new Schedule;
    this.schedule.name = this.originalName;
    this.scheduleService.get(this.originalName)
        .subscribe(body => this.schedule.body = body);
  }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you strt typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    this.scheduleService.rename(this.originalName, this.schedule.name)
        .subscribe(() => this.router.navigate(['/schedule-detail', this.schedule.name]));
  }

  cancelRename(): void {
    this.isRenaming = false;
    this.schedule.name = this.originalName;
  }

  startDelete(): void {
    this.isDeleting = true;
  }

  doDelete(): void {
    this.scheduleService.delete(this.schedule.name)
        .subscribe(() => this.router.navigate(['/schedules']));
  }

  cancelDelete(): void {
    this.isDeleting = false;
  }
}
