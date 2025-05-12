import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Motorista } from './main-page/motorista';
import { MessageService } from './main-page/message.service';
import { Gestor } from './main-page/gestor';
import { Cliente } from './main-page/cliente';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserType: User = User.NAO_AUTENTICADO;
  currentUserName: string = "";
  currentUser?: Motorista | Gestor | Cliente;
  private readonly gestorUrl = 'http://localhost:3000/gestor';
  private readonly clienteUrl = 'http://localhost:3000/cliente';
  private readonly motoristaUrl = 'http://localhost:3000/motorista';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} falhou: ${error.message}`);
      return of(result as T)
    }
  }

  setCurrentUserType(newUser: User) {
    this.currentUserType = newUser;
  }

  getCurrentUserType(): Observable<User> {
    return of(this.currentUserType);
  }

  setCurrentUserName(newUser: string) {
    this.currentUserName = newUser;
  }

  setCurrentUser(user: Motorista | Gestor | Cliente) {
    this.currentUser = user;
  }

  getCurrentUserName(): Observable<string> {
    return of(this.currentUserName);
  }


  getCurrentUser(): Observable<Motorista | Gestor | Cliente> {
    return of(this.currentUser!);
  }

  getMotorista(nif: Number): Observable<Motorista> {
    const url = `${this.motoristaUrl}/login/${nif}`;
    return this.http.get<Motorista>(url)
      .pipe(
        catchError(this.handleError<Motorista>(`getMotorista nif=${nif}`))
      );
  }

  getGestor(nif: Number): Observable<Gestor> {
    const url = `${this.gestorUrl}/login/${nif}`;
    return this.http.get<Gestor>(url)
      .pipe(
        catchError(this.handleError<Gestor>(`getGestor nif=${nif}`))
      );
  }

  getCliente(nif: Number): Observable<Cliente> {
    const url = `${this.clienteUrl}/login/${nif}`;
    return this.http.get<Cliente>(url)
      .pipe(
        catchError(this.handleError<Cliente>(`getCliente nif=${nif}`))
      );
  }
  
  private log(message: string) {
    this.messageService.add(`User Service: ${message}`);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService
  ) { }
}
