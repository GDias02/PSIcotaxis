import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { Taxi } from './taxi';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  private taxisUrl = 'http://localhost:3000/gestor';

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

  getTaxis(): Observable<Taxi[]> {
    const url = this.taxisUrl + "/taxis";
    return this.http.get<Taxi[]>(url)
      .pipe(
        catchError(this.handleError<Taxi[]>('getTaxis', []))
      );
  }

  getMarcasEModelos(): Observable<any> {
    const url = `${this.taxisUrl}/taxis/marcas_e_modelos`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>('getMarcasEModelos', []))
      );
  }

  getTaxi(id: string): Observable<Taxi> {
    const url = `${this.taxisUrl}/taxis/${id}`;
    return this.http.get<Taxi>(url)
      .pipe(
        catchError(this.handleError<Taxi>(`getTaxi id=${id}`))
      );
  }

  updateTaxi(taxi: Taxi): Observable<Taxi> {
    const url = `${this.taxisUrl}/taxis/${taxi._id}`;
    return this.http.put<Taxi>(url, taxi, this.httpOptions).pipe(
      catchError(this.handleError<Taxi>('updateTaxi'))
    );
  }

  addTaxi(taxi: Taxi): Observable<Taxi | any> {
    const url = this.taxisUrl + "/taxis/create";
    return this.http.post<Taxi>(url, taxi, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Taxi>(`addTaxi id=${taxi.matricula}`));
        return of(error);
      })
    );
  }

  deleteTaxi(id: string): Observable<Taxi> {
    const url = `${this.taxisUrl}/taxis/${id}`;

    return this.http.delete<Taxi>(url, this.httpOptions).pipe(
      catchError(this.handleError<Taxi>('deleteTaxi'))
    );
  }

  private log(message: string) {
    this.messageService.add(`Taxi Service: ${message}`);
  }
}