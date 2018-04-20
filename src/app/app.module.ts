import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { ScheduleDetailComponent }  from './schedule-detail/schedule-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HeroService }          from './hero.service';
import { ScheduleService }          from './schedule.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';

import { AppRoutingModule }     from './app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  imports: [
    BrowserModule,
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
    DashboardComponent,
    HeroesComponent,
    SchedulesComponent,
    HeroDetailComponent,
    ScheduleDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [ HeroService, ScheduleService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }