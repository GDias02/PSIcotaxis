import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { Taxi } from './taxi';

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
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
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

  addTaxi(taxi: Taxi): Observable<Taxi> {
    const url = this.taxisUrl + "/taxis/create";
    return this.http.post<Taxi>(url, taxi, this.httpOptions).pipe(
      catchError(this.handleError<Taxi>('addTaxi'))
    );
  }

  deleteTaxi(id: string): Observable<Taxi> {
    const url = `${this.taxisUrl}/taxis/${id}`;

    return this.http.delete<Taxi>(url, this.httpOptions).pipe(
      catchError(this.handleError<Taxi>('deleteTaxi'))
    );
  }
}