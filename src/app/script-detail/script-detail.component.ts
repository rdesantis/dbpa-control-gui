import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ScriptsService }  from '../scripts.service';
import { Script } from '../script';

@Component({
  selector: 'app-script-detail',
  templateUrl: './script-detail.component.html',
  styleUrls: ['./script-detail.component.css']
})
export class ScriptDetailComponent implements OnInit {
  @Input() script: Script;
  originalName: string;
  isRenaming: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private scriptService: ScriptsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.originalName = decodeURIComponent(this.route.snapshot.paramMap.get('name'));
    this.get();
  }

  get(): void {
    this.script = new Script;
    this.script.name = this.originalName;
    this.scriptService.get(this.originalName)
      .subscribe(body => this.script.body = body);
  }

  delete(): void {
    this.scriptService.delete(this.script.name)
    .subscribe(() => this.goBack());
 }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you strt typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    this.scriptService.rename(this.originalName, this.script.name)
    .subscribe(() => this.goBack());
 }

  cancelRename(): void {
    this.isRenaming = false;
    this.script.name = this.originalName;
  }

  goBack(): void {
    this.location.back();
  }
}
