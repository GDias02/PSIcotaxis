import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Motorista } from './main-page/motorista';
import { MessageService } from './main-page/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserType: User = User.NAO_AUTENTICADO;
  currentUserName: string = "";
  currentUser?: Motorista;
  private motoristasUrl = 'http://localhost:3000/gestor';

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

  setCurrentUser(user: Motorista) {
    this.currentUser = user;
  }

  getCurrentUserName(): Observable<string> {
    return of(this.currentUserName);
  }


  getCurrentUser(): Observable<Motorista> {
    return of(this.currentUser!);
  }

  getMotorista(nif: Number): Observable<Motorista> {
    const url = `${this.motoristasUrl}/motoristas/login/${nif}`;
    return this.http.get<Motorista>(url)
      .pipe(
        catchError(this.handleError<Motorista>(`getMotorista nif=${nif}`))
      );
  }
  
  private log(message: string) {
    this.messageService.add(`Motorista Service: ${message}`);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService
  ) { }
}
