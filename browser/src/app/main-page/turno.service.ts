import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { catchError, Observable, of } from 'rxjs';
import { Taxi } from './taxi';
import { Turno } from './turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnoUrl = 'http://localhost:3000/gestor/turnos';

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

  getTaxisDisponiveis(inicio: string, fim: string): Observable<Taxi[]> {
    const params = new HttpParams()
      .set('inicio', `${inicio}`)
      .set('fim', `${fim}`);
    const url = this.turnoUrl;
    return this.http.get<Taxi[]>(url, { params })
      .pipe(
        catchError(this.handleError<Taxi[]>('getTaxisDisponiveis', []))
      );
  }

  getTurnosDeMotorista(id_motorista: string): Observable<Turno[]> {
    const url = this.turnoUrl + `/motorista/${id_motorista}`;
    return this.http.get<Turno[]>(url)
      .pipe(
        catchError(this.handleError<Turno[]>('getTurnosDeMotorista', []))
      );
  }

  addTurno(turno: Turno): Observable<Turno | any> {
    const url = this.turnoUrl + "/create";
    return this.http.post<Turno>(url, turno, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Turno>(`addTurno id=${turno.motorista}`));
        return of(error);
      })
    );
  }

  private log(message: string) {
    this.messageService.add(`Turno Service: ${message}`);
  }
}
