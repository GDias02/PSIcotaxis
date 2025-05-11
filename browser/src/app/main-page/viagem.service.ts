import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Viagem } from './viagem';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {

  private viagensUrl = 'http://localhost:3000/motoristas';

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

  getViagens(): Observable<Viagem[]> {
    return of([]);
  }

  getViagensMotorista(id_motorista: string): Observable<Viagem[]> {
    const url = this.viagensUrl + `/viagens/motorista/${id_motorista}`;
    return this.http.get<Viagem[]>(url)
      .pipe(
        catchError(this.handleError<Viagem[]>('getViagens', []))
      );
  }

  getViagem(id: string): Observable<Viagem> {
    const url = `${this.viagensUrl}/viagens/${id}`;
    return this.http.get<Viagem>(url)
      .pipe(
        catchError(this.handleError<Viagem>(`getViagem id=${id}`))
      );
  }

  addViagem(viagem: Viagem): Observable<Viagem | any> {
    const url = this.viagensUrl + "/viagens/create";
    return this.http.post<Viagem>(url, viagem, this.httpOptions).pipe(
      catchError((error) => {
        this.log(error);
        catchError(this.handleError<Viagem>(`addViagem ${viagem._id}`));
        return of(error);
      })
    );
  }

  deleteViagem(id: string): Observable<any> {
    return of({});
  }

  private log(message: string) {
    this.messageService.add(`Viagem Service: ${message}`);
  }
}
