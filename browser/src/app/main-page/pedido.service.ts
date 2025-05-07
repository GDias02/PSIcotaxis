import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { Pedido } from './pedido';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidosUrl = 'https://localhost:3000/clientes' //pedidos
   
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    }
  }

  getPedidos(): Observable<Pedido[]> {
      const url = this.pedidosUrl + "/pedidos";
      return this.http.get<Pedido[]>(url)
        .pipe(
          catchError(this.handleError<Pedido[]>('getPedidos', []))
        )
  }

  getPedido(id: string): Observable<Pedido> {
    const url = this.pedidosUrl + "/pedidos/" + id;
    return this.http.get<Pedido>(url)
      .pipe(
        catchError(this.handleError<Pedido>(`getPedido ${id}`))
      )
  }

  deletePedido(id: string): Observable<Pedido>{
    const url = this.pedidosUrl + "/pedidos/" + id;
    return this.http.delete<Pedido>(url)
      .pipe(
        catchError(this.handleError<Pedido>(`deletePedido ${id}`))
      );
  }

  //Puts don't make sense for pedido

  private log(message: string){
    this.messageService.add(`Pedido Service: ${message}`);
  }
}
