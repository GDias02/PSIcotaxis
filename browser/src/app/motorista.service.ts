import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Motorista } from './motorista';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  private motoristasUrl = 'http://localhost:3000/gestor';

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

  getMotoristas(): Observable<Motorista[]> {
    const url = this.motoristasUrl + "/motoristas";
    return this.http.get<Motorista[]>(url)
      .pipe(
        catchError(this.handleError<Motorista[]>('getMotoristas', []))
      );
  }

  getMotorista(id: string): Observable<Motorista> {
    const url = `${this.motoristasUrl}/motoristas/${id}`;
    return this.http.get<Motorista>(url)
      .pipe(
        catchError(this.handleError<Motorista>(`getMotorista id=${id}`))
      );
  }

  updateHero(motorista: Motorista): Observable<Motorista> {
    const url = `${this.motoristasUrl}/motoristas/${motorista._id}`;
    return this.http.put<Motorista>(url, motorista, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('updateMotorista'))
    );
  }

  addMotorista(motorista: Motorista): Observable<Motorista> {
    const url = this.motoristasUrl + "/motoristas/create";
    return this.http.post<Motorista>(url, motorista, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('addMotorista'))
    );
  }

  deleteHero(id: string): Observable<Motorista> {
    const url = `${this.motoristasUrl}/motoristas/${id}`;

    return this.http.delete<Motorista>(url, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('deleteMotorista'))
    );
  }
}
