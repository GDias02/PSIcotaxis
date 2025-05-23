import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs';

import { Pedido } from './pedido';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly motoristaUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/motorista/pedidos' //pedidos
  private readonly clienteUrl = 'http://appserver.alunos.di.fc.ul.pt:3052/cliente/pedidos' //pedidos
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    }
  }

  getPedidosPendentes(): Observable<Pedido[]> {
      const url = this.motoristaUrl;
      return this.http.get<Pedido[]>(url)
        .pipe(
          catchError(this.handleError<Pedido[]>('getPedidosPendentes', []))
        )
  }

  getPedido(id: string): Observable<Pedido> {
    const url = this.clienteUrl + "/" + id;
    return this.http.get<Pedido>(url)
      .pipe(
        catchError(this.handleError<Pedido>(`getPedido ${id}`))
      )
  }

  getPedidoMotorista(id_motorista: string): Observable<Pedido> {
    const url = this.motoristaUrl + "/eu/" + id_motorista;
    return this.http.get<Pedido[]>(url)
      .pipe(
        catchError(this.handleError<Pedido[]>(`getPedido ${id_motorista}`)),
        map(x => x[0])
      )
  }

  postPedido(pedido: Pedido): Observable<Pedido> {
    const url = this.clienteUrl + "/create";
    return this.http.post<Pedido>(url, pedido, this.httpOptions)
      .pipe(
        catchError(this.handleError<Pedido>('postPedido'))
      );
  }

  deletePedido(id: string): Observable<Pedido>{
    const url = this.motoristaUrl +"/"+ id;
    return this.http.delete<Pedido>(url)
      .pipe(
        catchError(this.handleError<Pedido>(`deletePedido ${id}`))
      );
  }

  putPedido(pedido:Pedido): Observable<Pedido>{
    const url = `${this.motoristaUrl}/${pedido._id}`;
    return this.http.put<Pedido>(url, pedido,this.httpOptions)
            .pipe(
              catchError(this.handleError<Pedido>(`putPedido ${pedido._id}`))
            );
  }

  private log(message: string){
    this.messageService.add(`Pedido Service: ${message}`);
  }
}
