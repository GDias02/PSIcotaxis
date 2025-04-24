import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Motorista } from './motorista';
import { MessageService } from './message.service';



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
    private messageService: MessageService
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

  updateMotorista(motorista: Motorista): Observable<Motorista> {
    const url = `${this.motoristasUrl}/motoristas/${motorista._id}`;
    return this.http.put<Motorista>(url, motorista, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('updateMotorista'))
    );
  }

  addMotorista(motorista: Motorista): Observable<Motorista | any> {
    const url = this.motoristasUrl + "/motoristas/create";
    return this.http.post<Motorista>(url, motorista, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Motorista>(`addMotorista id=${motorista.nif}`));
        return of(error);
      })
    );
  }
/*
  addMotorista(motorista: Motorista): Observable<Motorista> {
    const url = this.motoristasUrl + "/motoristas/create";
    return this.http.post<Motorista>(url, motorista, { ...this.httpOptions, observe: 'response' }).pipe(
      tap(response => {
        if (response.status === 409) {
          console.log('Status 201: Resource created successfully.');
          return response
        }
      }),
      map(response => response.body as Motorista), // Extract the body from the response
      catchError(this.handleError<Motorista>('addMotorista'))
    );
  }*/


  deleteMotorista(id: string): Observable<Motorista> {
    const url = `${this.motoristasUrl}/motoristas/${id}`;

    return this.http.delete<Motorista>(url, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('deleteMotorista'))
    );
  }

  getLocalidadeByCodigoPostal(codPostal: string): Observable<string> {
    const url = `http://localhost:3000/servicos/localidade/${codPostal}`;
     
    return this.http.get(url, {responseType: 'text'})
      .pipe(
        catchError(this.handleError<string>(`getLocalidadeByCodigoPostal codPostal=${codPostal}`))
      );
  }

  private log(message: string) {
    this.messageService.add(`Motorista Service: ${message}`);
  }
}
