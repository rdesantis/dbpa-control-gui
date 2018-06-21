import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ScriptsService }  from '../scripts.service';
import { Script } from '../script';
import { ScriptValidation } from '../script-validation';

@Component({
  selector: 'app-script-edit',
  templateUrl: './script-edit.component.html',
  styleUrls: ['./script-edit.component.css']
})
export class ScriptEditComponent implements OnInit {
  @Input() script: Script;
  originalEncodedName: string;
  editNotCreate: boolean;

  constructor(
    private route: ActivatedRoute,
    private scriptService: ScriptsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.originalEncodedName = this.route.snapshot.paramMap.get('name');
    this.editNotCreate = (this.originalEncodedName !== null);
    this.get();
  }

  get(): void {
    this.script = new Script();
    this.script.validation = new ScriptValidation();
    this.script.validation.valid = true;
    if (this.editNotCreate) {
      this.script.name = decodeURIComponent(this.originalEncodedName);
      this.scriptService.get(this.script.name)
        .subscribe(body => this.script.body = body);
    }
    else {
      this.script.name = "";
      this.script.body = "";
    }
  }

	save(): void {
    this.scriptService.put(this.script.name, this.script.body)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  reset(): void {
    this.clear();
    this.get();
  }

  clear(): void {
    this.script.body = ``;
    this.validate();
  }

  validate(): void {
    if (this.script.body === "") {
      this.script.validation.valid = true;
    }
    else {
      this.scriptService.validateBody(this.script.body)
      .subscribe(validation => this.script.validation = validation);
    }
  }

  key(event: any): void {
    // Allow tab character.
    if (event.key === "Tab" && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      let element = event.target;
      let start = element.selectionStart;
      let end = element.selectionEnd;
      element.value = element.value.substring(0, start) + '\t' + element.value.substring(end);
      element.selectionStart = element.selectionEnd = start + 1;
    }
  }
}
