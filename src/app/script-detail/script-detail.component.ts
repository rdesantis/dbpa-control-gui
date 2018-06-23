import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScriptsService }  from '../scripts.service';
import { Script } from '../script';

@Component({
  selector: 'app-script-detail',
  templateUrl: './script-detail.component.html',
  styleUrls: ['./script-detail.component.css']
})
export class ScriptDetailComponent implements OnInit {
  script: Script;
  originalEncodedName: string;
  originalName: string;
  isRenaming: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scriptService: ScriptsService
  ) {}

  ngOnInit(): void {
    this.originalEncodedName = this.route.snapshot.paramMap.get('name');
    this.originalName = decodeURIComponent(this.originalEncodedName);
    this.get();
  }

  get(): void {
    this.script = new Script;
    this.script.name = this.originalName;
    this.scriptService.get(this.originalName)
      .subscribe(body => this.script.body = body);
  }

  startRename(): void {
    this.isRenaming = true;
    document.getElementById("name").focus();
    // The element has the focus but on Edge it is not visually obvious until you start typing; on Chrome it is.
  }

  saveRename(): void {
    this.isRenaming = false;
    this.scriptService.rename(this.originalName, this.script.name)
    // The attempt to navigate to the new name doesn't actually re-initialize the page.
    // So all variables must be updated.
        .subscribe(() => {
          this.originalName = this.script.name;
          this.originalEncodedName = encodeURIComponent(this.originalName);
          this.router.navigate(['/script-detail', this.originalEncodedName]);
        });
  }

  cancelRename(): void {
    this.isRenaming = false;
    this.script.name = this.originalName;
  }

  startDelete(): void {
    this.isDeleting = true;
  }

  doDelete(): void {
    this.scriptService.delete(this.script.name)
        .subscribe(() => this.router.navigate(['/scripts']));
  }

  cancelDelete(): void {
    this.isDeleting = false;
  }
}
