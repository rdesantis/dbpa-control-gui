import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
    HttpClientModule
  ],
  declarations: [
    AppComponent,

    MessagesComponent,
    ScriptsComponent,
    ScriptDetailComponent,
    ScriptEditComponent,
    SchedulesComponent,
    ScheduleDetailComponent,
    ScheduleEditComponent
  ],
  providers: [ MessageService, ScriptsService, SchedulesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }