import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { catchError, Observable, of } from 'rxjs';
import { Taxi } from './taxi';
import { Turno, TurnoCompleto } from './turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnoUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/motorista/turnos';

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

  getTurnoAtual(m: string, agora: string): Observable<Turno[]> {
    const params = new HttpParams()
      .set('id', `${m}`)
      .set('agora', `${agora}`);
    const url = this.turnoUrl + `/atual`;
    return this.http.get<Turno[]>(url, { params })
      .pipe(
        catchError(this.handleError<Turno[]>('getTurnoAtual', []))
      );
  }

  getTurnosDeMotorista(id_motorista: string): Observable<TurnoCompleto[]> {
    const url = this.turnoUrl + `/motorista/${id_motorista}`;
    return this.http.get<TurnoCompleto[]>(url)
      .pipe(
        catchError(this.handleError<TurnoCompleto[]>('getTurnosDeMotorista', []))
      );
  }

  getTurno(id: string): Observable<Turno> {
    const url = this.turnoUrl + `/${id}`;
    return this.http.get<Turno>(url)
      .pipe(
        catchError(this.handleError<Turno>('getTurnosDeMotorista', {} as Turno))
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

  updateTurno(turno: Turno): Observable<Turno | any> {
    const url = this.turnoUrl +`/${turno._id}`;
    return this.http.put<Turno>(url, turno, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Turno>(`update Turno id=${turno._id}`));
        return of(error);
      })
    );
  }

  private log(message: string) {
    this.messageService.add(`Turno Service: ${message}`);
  }
}
