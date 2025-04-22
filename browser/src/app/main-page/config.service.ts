import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configsUrl = 'http://localhost:3000/gestor';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

  getConfigs(): Observable<Config> {
    const url = this.configsUrl + "/configs";
    return this.http.get<Config>(url)
      .pipe(
        catchError(this.handleError<Config>('getConfigs', {} as Config))
      );
  }

  updateConfig(config: Config): Observable<Config> {
    const url = `${this.configsUrl}/config`;
    return this.http.put<Config>(url, config, this.httpOptions).pipe(
      catchError(this.handleError<Config>('updateConfig'))
    );
  }
}