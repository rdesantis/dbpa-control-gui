import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// TODO: delete these:
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { ScriptsService } from './scripts.service';
import { ScriptsComponent } from './scripts/scripts.component';
import { ScriptDetailComponent } from './script-detail/script-detail.component';
import { ScriptEditComponent } from './script-edit/script-edit.component';
import { SchedulesService } from './schedules.service';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true }
    )  
],
  declarations: [
    AppComponent,

    // TODO: Delete these:
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,

    MessagesComponent,
    ScriptsComponent,
    ScriptDetailComponent,
    ScriptEditComponent,
    SchedulesComponent,
    ScheduleDetailComponent,
    ScheduleEditComponent
  ],
  providers: [ MessageService, ScriptsService, SchedulesService, HeroService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }