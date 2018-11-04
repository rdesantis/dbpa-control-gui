import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';
import { ScheduleValidation } from './schedule-validation';

@Injectable()
export class SchedulesService extends DbpaService {

  private url: string = DbpaService.getManagerUrl() + 'schedules';

  constructor(
			private http: HttpClient,
			messageService: MessageService) {
		super("SchedulesService", messageService);
	}

	/**
	 * Retrieve a set of schedule(s) from the server
	 * whose names match an optional SQL wildcard pattern
	 */
	getAll(likeName?: string): Observable<Object> {
		const url = this.url + (likeName ? `?like=${encodeURIComponent(likeName)}` : ``);
		return this.http.get<Object>(url).pipe(
				tap(_ => this.log(`found schedules matching "${likeName}"`)),
				catchError(this.handleError(`schedules.getAll like=${likeName}`, {}))
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

	getNames(likeName: string): Observable<string[]> {
		const url = this.url + `/-/names` + (likeName ? `like=${encodeURIComponent(likeName)}` : ``);
		return this.http.get<string[]>(url).pipe(
				tap(_ => this.log(`fetching schedule names matching "${likeName}"`)),
				catchError(this.handleError(`schedules.getNames like=%${likeName}%`, []))
		);
	}

	/** PUT: update the schedule on the server */
	update(name: string, body: string): Observable<any> {
	  const url = `${this.url}/${name}/body`;
	  return this.http.put(url, body, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`updated schedule name=${name}`)),
				catchError(this.handleError<any>(`schedules.put name=${name}`))
	  );
	}

	/** PUT: add a new schedule to the server */
	add(name: string, body: string): Observable<any> {
		const url = `${this.url}/${name}`;
		return this.http.put(url, body, DbpaService.httpOptions).pipe(
        tap(_ => this.log(`added schedule name=${name}`)),
        catchError(this.handleError<any>(`schedules.add name=${name}`))
		);
	}

	/** DELETE: delete the schedule from the server */
	delete(name: string): Observable<any> {
		const url = `${this.url}/${name}`;
	  return this.http.delete<string>(url, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`deleted schedule name=${name}`)),
				catchError(this.handleError<string>(`schedules.delete name=${name}`))
	  );
	}

	/** PUT:validate schedule body on server without storing it */
	validateBody(body: string): Observable<ScheduleValidation> {
		const url = `${this.url}/-/validate`;
		return this.http.put<ScheduleValidation>(url, body, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`validated schedule body`)),
				catchError(this.handleError<ScheduleValidation>(`schedules.validateBody`))
		);
	}

	rename(name: string, newName: string): Observable<any> {
	  const url = `${this.url}/${name}/rename`;
	  return this.http.put(url, newName, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`renamed schedule name=${name} to newName=${newName}`)),
				catchError(this.handleError<any>(`schedules.rename name=${name} newName=${newName}`))
	  );
	}

	/**
	 * Return a list of the running schedules.
	 */
	getRunning(): Observable<string[]> {
	  const url = `${this.url}/-/running`;
		return this.http.get<string[]>(url).pipe(
				tap(_ => this.log(`fetched list of running schedules`)),
				catchError(this.handleError(`schedules.getRunning`, []))
	  );
	}

	/**
	 * Return the set of running schedules with state details.
	 */
	getRunningStates(): Observable<Object> {
	  const url = `${this.url}/-/running-state`;
		return this.http.get<Object>(url).pipe(
			tap(_ => this.log(`fetched list of running schedule states`)),
			catchError(this.handleError(`schedules.getRunningStates`, {}))
	  );
	}
}
