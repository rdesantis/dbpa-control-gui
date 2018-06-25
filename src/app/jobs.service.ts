import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';
import { Job } from './job';
import { JobRun } from './job-run';
import { ScriptArgument } from './script-argument';

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

	getRuns(term: string): Observable<JobRun[]> {
		return this.http.get<JobRun[]>(`${this.url}/-/runs?like=%25${term}%25&latest=false&ascending=false`)
		.pipe(
			tap(_ => this.log(`found jobs matching "${term}"`)),
			catchError(this.handleError(`jobs.getAll like=%${term}%`, []))
	  );
	}

	run(name: string, args: ScriptArgument[]): Observable<number> {
		return this.http.post<number>(`${this.url}/-/running/${name}`, args)
		.pipe(
			tap(_ => this.log(`starting job "${name}"`)),
			catchError(this.handleError(`jobs.run name=${name}`, 0))
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
