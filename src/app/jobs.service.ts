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

  private url: string = DbpaService.getManagerUrl() + 'jobs';

  constructor(
			private http: HttpClient,
			messageService: MessageService) {
		super("JobsService", messageService);
	}
  
	put(name: string, job: Job): Observable<number> {
		const url = `${this.url}/${name}`;
		return this.http.put(url, job, DbpaService.httpOptions).pipe(
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

	/**
	 * Retrieve a set of job(s) from the server
	 * whose names match an optional SQL wildcard pattern
	 *
	 * This calls the Java endpoint JobsResource.getJobs(String)
	 */
	getAll(likeName?: string): Observable<Object> {
		const url = this.url + (likeName ? `?like=${encodeURIComponent(likeName)}` : ``);
		return this.http.get<Object>(url).pipe(
				tap(_ => this.log(`found jobs matching "${likeName}"`)),
				catchError(this.handleError(`jobs.getJobs like=${likeName}`, {}))
	  );
	}

	/**
	 * Retrieve a list of job runs from the server
	 * whose job names match an optional SQL wildcard pattern
	 */
	getRuns(likeName?: string): Observable<JobRun[]> {
		const url = this.url + `/-/runs?`
				+ (likeName ? `like=${encodeURIComponent(likeName)}&` : ``)
				+ `latest=false&ascending=false`;
		return this.http.get<JobRun[]>(url).pipe(
				tap(_ => this.log(`found job runs matching "${likeName}"`)),
				catchError(this.handleError(`jobs.getRuns like=${likeName}`, []))
	  );
	}

	/**
	 * Retrieve a list of running jobs
	 */
	getRunning(): Observable<JobRun[]> {
	  const url = `${this.url}/-/running`;
		return this.http.get<JobRun[]>(url).pipe(
				tap(_ => this.log(`fetched list of running jobs`)),
				catchError(this.handleError(`jobs.getRunning`, null))
	  );
	}

	run(name: string, args: ScriptArgument[]): Observable<number> {
		const url = `${this.url}/-/running/${name}`;
		return this.http.post<number>(url, args).pipe(
				tap(_ => this.log(`starting job name=${name}`)),
				catchError(this.handleError(`jobs.run name=${name}`, 0))
	  );
	}

	rename(name: string, newName: string): Observable<any> {
		const url = `${this.url}/${name}/rename`;
		return this.http.put(url, newName, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`renamed job name=${name} to newName=${newName}`)),
				catchError(this.handleError<any>(`jobs.rename name=${name} newName=${newName}`))
		);
	}

	delete(name: string): Observable<any> {
	  const url = `${this.url}/${name}`;
	  return this.http.delete<string>(url, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`deleted job name=${name}`)),
				catchError(this.handleError<string>(`jobs.delete name=${name}`))
	  );
	}
}
