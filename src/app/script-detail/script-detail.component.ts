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
  isRenaming: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private scriptService: ScriptsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getScript();
  }

  getScript(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.script = new Script;
    this.script.name = name;
    this.scriptService.get(name)
      .subscribe(body => this.script.body = body);
  }

	save(): void {
	   this.scriptService.put(this.script.name, this.script.body)
		 .subscribe(() => this.goBack());
//		 .subscribe(() => {});	// Works; saves and does not go back
//		 .subscribe();			// Also works; saves and does not go back
	 }

  goBack(): void {
    this.location.back();
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
    const name = this.route.snapshot.paramMap.get('name');
    this.scriptService.rename(name, this.script.name)
    .subscribe(() => this.goBack());
 }

  cancelRename(): void {
    this.isRenaming = false;
    this.script.name = this.route.snapshot.paramMap.get('name');
  }
}
