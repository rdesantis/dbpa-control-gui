import { Component, OnInit } from '@angular/core';

import { Script } from '../script';
import { ScriptsService } from '../scripts.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent implements OnInit {

  scripts: Script[];
  directory: string = "";
  filter: string = "";

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
        });
  }
}
