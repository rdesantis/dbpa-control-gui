import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { DbpaService } from './dbpa-service';

@Injectable()
export class ServiceService extends DbpaService {

  private url: string = DbpaService.getManagerUrl() + 'service';

  constructor(
			private http: HttpClient,
			messageService: MessageService) {
		super("ServiceService", messageService);
	}

	kill(): Observable<any> {
	  return this.http.delete(this.url, DbpaService.httpOptions).pipe(
				tap(_ => this.log(`killed service`)),
				catchError(this.handleError<any>(`service.kill`))
	  );
	}
}
