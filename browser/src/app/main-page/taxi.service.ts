import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, throwError } from 'rxjs';
import { Taxi } from './taxi';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  private clienteUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/cliente';
  private motoristaUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/motorista';
  private gestorUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/gestor';

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
      return throwError(() => error);
    }
  }

  getTaxis(): Observable<Taxi[]> {
    const url = this.gestorUrl + "/taxis";
    return this.http.get<Taxi[]>(url)
      .pipe(
        catchError(this.handleError<Taxi[]>('getTaxis', []))
      );
  }

  getMarcasEModelos(): Observable<any> {
    const url = `${this.gestorUrl}/taxis/marcas_e_modelos`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>('getMarcasEModelos', []))
      );
  }

  getTaxi(id: string): Observable<Taxi> {
    const url = `${this.motoristaUrl}/taxis/${id}`;
    return this.http.get<Taxi>(url)
      .pipe(
        catchError(this.handleError<Taxi>(`getTaxi id=${id}`))
      );
  }

  updateTaxi(taxi: Taxi): Observable<Taxi> {
    const url = `${this.gestorUrl}/taxis/${taxi._id}`;
    return this.http.put<Taxi>(url, taxi, this.httpOptions).pipe(
      catchError(this.handleError<Taxi>('updateTaxi'))
    );
  }

  addTaxi(taxi: Taxi): Observable<Taxi | any> {
    const url = this.gestorUrl + "/taxis/create";
    return this.http.post<Taxi>(url, taxi, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Taxi>(`addTaxi id=${taxi.matricula}`));
        return of(error);
      })
    );
  }

  deleteTaxi(id: string): Observable<Taxi> {
    const url = `${this.gestorUrl}/taxis/${id}`;

    return this.http.delete<Taxi>(url, this.httpOptions).pipe(
      catchError(this.handleError<Taxi>('deleteTaxi'))
    );
  }

  private log(message: string) {
    this.messageService.add(`Taxi Service: ${message}`);
  }
}