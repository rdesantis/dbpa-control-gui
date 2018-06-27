import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';
import { ScheduleValidation } from './schedule-validation';

@Injectable()
export class SchedulesService extends DbpaService {

  private url: string = DbpaService.managerUrl + 'schedules';

  constructor(
			private http: HttpClient,
			messageService: MessageService) {
		super("SchedulesService", messageService);
	}

	/** GET schedules from the server */
	// Schedules are returned as a java Map<String, String> object mapping schedule name to schedule body.
	getAll(): Observable<Object> {
	  return this.http.get<Object>(this.url)
		.pipe(
		  tap(schedules => this.log(`fetched schedules`)),
		  catchError(this.handleError('schedules.getAll', {}))
		);
	}

	/** GET schedule body by name. Will 404 if name not found */
	get(name: string): Observable<string> {
	  const url = `${this.url}/${name}`;
	  return this.http.get(url, {responseType: 'text'}).pipe(
		tap(_ => this.log(`fetched schedule name=${name}`)),
		catchError(this.handleError<string>(`schedules.get name=${name}`, ``))
	  );
	}

	/* GET schedules whose name contains search term */
	search(term: string): Observable<Object> {
	  if (!term.trim()) {
			term="";
	  }
		return this.http.get<Object>(`${this.url}/?like=%25${term}%25`)
		.pipe(
			tap(_ => this.log(`found schedules matching "${term}"`)),
			catchError(this.handleError(`schedules.getAll like=%${term}%`, {}))
	  );
	}

	getNames(term: string): Observable<string[]> {
	  if (!term.trim()) {
			term="";
	  }
		return this.http.get<string[]>(`${this.url}/-/names?like=%25${term}%25`)
		.pipe(
			tap(_ => this.log(`fetching schedule names matching "${term}"`)),
			catchError(this.handleError(`schedules.getNames like=%${term}%`, []))
	  );
	}

	/** PUT: update the schedule on the server */
	update(name: string, body: string): Observable<any> {
	  return this.http.put(`${this.url}/${name}/body`, body, DbpaService.httpOptions).pipe(
		tap(_ => this.log(`updated schedule name=${name}`)),
		catchError(this.handleError<any>(`schedules.put name=${name}`))
	  );
	}

	/** PUT: add a new schedule to the server */
	add(name: string, body: string): Observable<any> {
      return this.http.put(`${this.url}/${name}`, body,DbpaService.httpOptions).pipe(
        tap(_ => this.log(`added schedule name=${name}`)),
        catchError(this.handleError<any>(`schedules.add name=${name}`))
      );
    }

	/** DELETE: delete the schedule from the server */
	delete(name: string): Observable<any> {
	  return this.http.delete<string>(`${this.url}/${name}`, DbpaService.httpOptions).pipe(
		tap(_ => this.log(`deleted schedule name=${name}`)),
		catchError(this.handleError<string>(`schedules.delete name=${name}`))
	  );
	}

	/** PUT:validate schedule body on server without storing it */
	validateBody(body: string): Observable<ScheduleValidation> {
		return this.http.put<ScheduleValidation>(`${this.url}/-/validate`, body, DbpaService.httpOptions).pipe(
			tap(_ => this.log(`validated schedule body`)),
			catchError(this.handleError<ScheduleValidation>(`schedules.validateBody`))
		);
	}

	rename(name: string, newName: string): Observable<any> {
	  return this.http.put(`${this.url}/${name}/rename`, newName, DbpaService.httpOptions).pipe(
		tap(_ => this.log(`renamed schedule name=${name} to newName=${newName}`)),
		catchError(this.handleError<any>(`schedules.rename name=${name} newName=${newName}`))
	  );
	}
}
