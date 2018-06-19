import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { InMemoryDataService } from './in-memory-data.service';
import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';
import { ScheduleValidation } from './schedule-validation';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ScriptsService extends DbpaService {

  private scriptsUrl: string = DbpaService.managerUrl + 'scripts';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { super(); }
  
  /** Log a ScheduleService message with the MessageService */
  private log(message: string, isError: boolean = false) {
    this.messageService.add('ScheduleService: ' + message, isError);
  }

    /** GET schedules from the server */
    // Schedules are returned as a java Map<String, String> object mapping schedule name to schedule body.
	getAll(): Observable<Object> {
	  return this.http.get<Object>(this.scriptsUrl)
		.pipe(
		  tap(schedules => this.log(`fetched schedules`)),
		  catchError(this.handleError('getSchedules', {}))
		);
	}

	/** GET schedule body by name. Will 404 if name not found */
	get(name: string): Observable<string> {
	  const url = `${this.scriptsUrl}/${name}`;
	  return this.http.get(url, {responseType: 'text'}).pipe(
		tap(_ => this.log(`fetched schedule name=${name}`)),
		catchError(this.handleError<string>(`getSchedule name=${name}`, ''))
	  );
	}

	/* GET schedules whose name contains search term */
	search(term: string): Observable<Object> {
	  if (!term.trim()) {
			term="";
	  }
		return this.http.get<Object>(`${this.scriptsUrl}/?like=%25${term}%25`)
		.pipe(
			tap(_ => this.log(`found schedules matching "${term}"`)),
			catchError(this.handleError('searchSchedules', {}))
	  );
	}

	/** PUT: update the schedule on the server */
	update(name: string, body: string): Observable<any> {
	  return this.http.put(`${this.scriptsUrl}/${name}/body`, body, httpOptions).pipe(
		tap(_ => this.log(`updated schedule name=${name}`)),
		catchError(this.handleError<any>('updateSchedule'))
	  );
	}

	/** PUT: add a new schedule to the server */
	add(name: string, body: string): Observable<any> {
      return this.http.put(`${this.scriptsUrl}/${name}`, body, httpOptions).pipe(
        tap(_ => this.log(`added schedule name=${name}`)),
        catchError(this.handleError<any>('addSchedule'))
      );
    }

	/** DELETE: delete the schedule from the server */
	delete(name: string): Observable<any> {
	  return this.http.delete<string>(`${this.scriptsUrl}/${name}`, httpOptions).pipe(
		tap(_ => this.log(`deleted schedule name=${name}`)),
		catchError(this.handleError<string>('deleteSchedule'))
	  );
	}

	/** PUT:validate schedule body on server without storing it */
	validateBody(body: string): Observable<ScheduleValidation> {
		return this.http.put<ScheduleValidation>(`${this.scriptsUrl}/validate`, body, httpOptions).pipe(
			tap(_ => this.log(`validated schedule body`)),
			catchError(this.handleError<ScheduleValidation>('validateSchedule'))
		);
	}

	rename(name: string, newName: string): Observable<any> {
	  return this.http.put(`${this.scriptsUrl}/${name}/rename`, newName, httpOptions).pipe(
		tap(_ => this.log(`updated schedule name=${name} to newName=${newName}`)),
		catchError(this.handleError<any>('rename'))
	  );
	}

/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		this.log(`${operation} failed: ${error.message}`, true);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	  };
	}
}
