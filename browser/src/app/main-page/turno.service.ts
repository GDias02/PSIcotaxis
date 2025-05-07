import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { catchError, Observable, of } from 'rxjs';
import { Taxi } from './taxi';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnoUrl = 'http://localhost:3000/gestor';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} falhou: ${error.message}`);
      return of(result as T)
    }
  }

  getTaxisDisponiveis(inicio: Date, fim: Date): Observable<Taxi[]> {
    const params = new HttpParams()
   .set('inicio', `${inicio}`)
   .set('fim', `${fim}`);
    const url = this.turnoUrl;
    return this.http.get<Taxi[]>(url, {params})
      .pipe(
        catchError(this.handleError<Taxi[]>('getTaxisDisponiveis', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`Turno Service: ${message}`);
  }
}
