import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Motorista } from './motorista';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  private motoristaUrl = 'http://localhost:3000/motorista';
  private gestorUrl = 'http://localhost:3000/gestor';

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
      return throwError(()=>error);
    }
  }

  getMotoristas(): Observable<Motorista[]> {
    const url = this.gestorUrl + "/motoristas";
    return this.http.get<Motorista[]>(url)
      .pipe(
        catchError(this.handleError<Motorista[]>('getMotoristas', []))
      );
  }

  getMotorista(id: string): Observable<Motorista> {
    const url = `${this.motoristaUrl}/id/${id}`;
    return this.http.get<Motorista>(url)
      .pipe(
        catchError(this.handleError<Motorista>(`getMotorista id=${id}`))
      );
  }

  updateMotorista(motorista: Motorista): Observable<Motorista> {
    const url = `${this.motoristaUrl}/id/${motorista._id}`;
    return this.http.put<Motorista>(url, motorista, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('updateMotorista'))
    );
  }

  addMotorista(motorista: Motorista): Observable<Motorista | any> {
    const url = this.motoristaUrl + "/create";
    return this.http.post<Motorista>(url, motorista, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Motorista>(`addMotorista ${motorista.nome}`));
        return of(error);
      })
    );
  }

  deleteMotorista(id: string): Observable<Motorista> {
    const url = `${this.motoristaUrl}/id/${id}`;

    return this.http.delete<Motorista>(url, this.httpOptions).pipe(
      catchError(this.handleError<Motorista>('deleteMotorista'))
    );
  }

  //TODO - refatorizar para ir para loc.service.ts
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
