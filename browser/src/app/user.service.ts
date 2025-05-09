import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Motorista } from './main-page/motorista'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserType: User = User.NAO_AUTENTICADO;
  currentUserName: string = "";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ){}

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
  setCurrentUserType(newUser : User){
    this.currentUserType = newUser;
  }
  
  getCurrentUserType(): Observable<User> {
    return of(this.currentUserType);
  }

  setCurrentUserName(newUser : string){
    this.currentUserName = newUser;
  }

  getCurrentUserName(): Observable<string>{
    return of(this.currentUserName);
  }

  getMotoristaByNif(nif: string): Observable<string> {
    const url = `http://localhost:3000/gestor/motoristas/${nif}`;
    return this.http.get<string>(url)
      .pipe(
        catchError(this.handleError<string>(`geting motorista's nif`))
      );
  }
  
}
