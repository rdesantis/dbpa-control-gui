import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';
import { Job } from './job';

@Injectable()
export class JobsService extends DbpaService {

  private url: string = DbpaService.managerUrl + 'jobs';

  constructor(
			private http: HttpClient,
			messageService: MessageService) {
		super("JobsService", messageService);
	}
  
	put(name: string, job: Job): Observable<number> {
		return this.http.put(`${this.url}/${name}`, job, DbpaService.httpOptions).pipe(
			tap(_ => this.log(`put job name=${name}`)),
			catchError(this.handleError<any>('jobs.put name=${name}'))
		);
	}

	get(name: string): Observable<Job> {
	  const url = `${this.url}/${name}`;
	  return this.http.get<Job>(url, DbpaService.httpOptions).pipe(
		tap(_ => this.log(`fetched job name=${name}`)),
		catchError(this.handleError<Job>(`jobs.get name=${name}`, Job.emptyJob()))
	  );
	}

	getAll(term: string): Observable<Object> {
	  if (!term.trim()) {
			term="";
	  }
		return this.http.get<Object>(`${this.url}?like=%25${term}%25`)
		.pipe(
			tap(_ => this.log(`found jobs matching "${term}"`)),
			catchError(this.handleError(`jobs.getAll like=%${term}%`, {}))
	  );
	}

  rename(name: string, newName: string): Observable<any> {
		return this.http.put(`${this.url}/${name}/rename`, newName, DbpaService.httpOptions).pipe(
			tap(_ => this.log(`renamed job name=${name} to newName=${newName}`)),
			catchError(this.handleError<any>(`jobs.rename name=${name} newName=${newName}`))
			);
	}

	delete(name: string): Observable<any> {
	  return this.http.delete<string>(`${this.url}/${name}`, DbpaService.httpOptions).pipe(
		tap(_ => this.log(`deleted job name=${name}`)),
		catchError(this.handleError<string>(`jobs.delete name=${name}`))
	  );
	}
}
