import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cliente } from './cliente';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/clientes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getCliente(id: string): Observable<Cliente> {
    const url = this.clientesUrl + `/cliente/:${id}`;
    return this.http.get<Cliente>(url)
      .pipe(
        catchError(this.handleError<Cliente>(`getClientes ${id}`))
      );
  }

  getClienteByNif(nif: string): Observable<Cliente> {
    const url = this.clientesUrl + `/cliente/nif/${nif}`;
    return this.http.get<Cliente>(url)
      .pipe(
        catchError(this.handleError<Cliente>(`getClienteByNif ${nif}`))
      );
  }

  postCliente(cliente: Cliente): Observable<Cliente> {
    const url = this.clientesUrl + "/cliente";
    return this.http.post<Cliente>(url, cliente, this.httpOptions)
      .pipe(
        catchError(this.handleError<Cliente>('postCliente'))
      );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    const url = this.clientesUrl + `/cliente/:${cliente._id}`;
    return this.http.put<Cliente>(url, cliente, this.httpOptions)
      .pipe(
        catchError(this.handleError<Cliente>('updateCliente'))
      );
  } 

  deleteCliente(cliente: Cliente): Observable<Cliente> {
    const url = this.clientesUrl + `/cliente/:${cliente._id}`;
    return this.http.delete<Cliente>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Cliente>('deleteCliente'))
      );
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clientesUrl)
      .pipe(
        catchError(this.handleError<Cliente[]>('getClientes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`ClienteService: ${message}`);
  }

}
