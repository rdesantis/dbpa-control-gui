import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';
import { ScriptValidation } from './script-validation';
import { ScriptParameter } from './script-parameter';

@Injectable()
export class ScriptsService extends DbpaService {

  private url: string = DbpaService.managerUrl + 'scripts';

  constructor(
			private http: HttpClient,
			messageService: MessageService) {
		super("ScriptsService", messageService);
	}
  
	put(name: string, body: string): Observable<any> {
		return this.http.put(`${this.url}/${encodeURIComponent(name)}`,body, DbpaService.httpOptions).pipe(
			tap(_ => this.log(`put script name=${name}`)),
			catchError(this.handleError<any>('scripts.put name=${name}'))
		);
	}

	get(name: string): Observable<string> {
	  const url = `${this.url}/${encodeURIComponent(name)}`;
	  return this.http.get(url, {responseType: 'text'}).pipe(
		tap(_ => this.log(`fetched script name=${name}`)),
		catchError(this.handleError<string>(`scripts.get name=${name}`, ''))
	  );
	}

	rename(name: string, newName: string): Observable<any> {
		return this.http.put(`${this.url}/${encodeURIComponent(name)}/rename`, newName, DbpaService.httpOptions).pipe(
			tap(_ => this.log(`renamed script name=${name} to newName=${newName}`)),
			catchError(this.handleError<any>(`scripts.rename name=${name} newName=${newName}`))
			);
	}

	delete(name: string): Observable<any> {
	  return this.http.delete<string>(`${this.url}/${encodeURIComponent(name)}`, DbpaService.httpOptions).pipe(
		tap(_ => this.log(`deleted script name=${name}`)),
		catchError(this.handleError<string>(`scripts.delete name=${name}`))
	  );
	}

	/** PUT:validate schedule body on server without storing it */
	validateBody(body: string): Observable<ScriptValidation> {
		return this.http.put<ScriptValidation>(`${this.url}/validate`, body, DbpaService.httpOptions).pipe(
			tap(_ => this.log(`validated script body`)),
			catchError(this.handleError<ScriptValidation>(`scripts.validateBody`))
		);
	}

	validateAll(directory: string, likeName: string): Observable<Object> {
		let prefix: string = (directory) ? directory + `/` : ``;
		let wildName: string = (likeName) ? `*${likeName.trim()}*` : `*`;
		return this.http.get<Object>(`${this.url}/-/validations?like=${prefix + wildName}`)
		.pipe(
			tap(_ => this.log(`validated scripts matching "${likeName}"`)),
			catchError(this.handleError(`scripts.validateAll like=${likeName}`, {}))
	  );
	}
}
