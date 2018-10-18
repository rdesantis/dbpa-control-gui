import { Component, OnInit } from '@angular/core';

import { Script } from '../script';
import { ScriptsService } from '../scripts.service';
import { ScriptValidation } from '../script-validation';
import { ScriptParameter } from '../script-parameter';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent implements OnInit {

  scripts: Script[];
  directory: string = "";
  filter: string = "";

  maxParameters: number = 0;

  constructor(private scriptsService: ScriptsService) { }

  ngOnInit() {
    this.getScripts();
  }

  setDirectory(directory: string) {
    this.directory = directory.trim();
    this.getScripts();
  }

  setFilter(filter: string) {
    this.filter = filter.trim();;
    this.getScripts();
  }

  getScripts() {
    this.scriptsService.validateAll(this.directory, this.filter)
        .subscribe(scripts => {
          this.scripts = [];
          for (let property in scripts) {
            this.scripts.push({name: property, body: null, validation: scripts[property]});
          }
          this.setMaxParameters();
        });
  }

  private setMaxParameters(): void {
    let result: number = 0;
    for (let script of this.scripts) {
      result = Math.max(result, script.validation.parameters.length);
    }
    this.maxParameters = result;
  }

  getParameterNumbers(): number[] {
    return Array.from(Array(this.maxParameters).keys());
  }

  getParameters(validation: ScriptValidation, fillTo: number): ScriptParameter[] {
    let result: ScriptParameter[] = validation.parameters.slice(0);
    let actualLength: number = result.length;
    result.length = fillTo;
    result.fill({name: "", typeName: ""}, actualLength, fillTo);
    return result;
  }

  getEncodedName(name: string): string {
    return encodeURIComponent(name);
  }

}
