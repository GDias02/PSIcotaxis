import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Config } from './config';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configsUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/gestor/configs';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

  getConfigs(): Observable<Config> {
    const url = this.configsUrl;
    return this.http.get<Config>(url)
      .pipe(
        catchError(this.handleError<Config>('getConfigs', {} as Config))
      );
  }

  updateConfig(config: Config): Observable<Config> {
    const url = this.configsUrl;
    return this.http.put<Config>(url, config, this.httpOptions).pipe(
      catchError(this.handleError<Config>('updateConfig'))
    );
  }

  private log(message: string) {
    this.messageService.add(`Configurações Service: ${message}`);
  }
}