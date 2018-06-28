import { HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class DbpaService {
    // If web service is hosted on the same server as static content, managerUrl = 'api'
    protected static managerUrl: string = 'http://localhost:8080/api/';  // URL to web api

    protected static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private serviceName: string,
        private messageService: MessageService) {}

    protected log(message: string, isError: boolean = false) {
        this.messageService.add(`${this.serviceName}: ${message}`, isError);
      }

    /**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	protected handleError<T>(operation = 'operation', result?: T) {
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
