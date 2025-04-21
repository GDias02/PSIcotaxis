import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserType: User = User.NAO_AUTENTICADO;
  currentUserName: string = "";

  
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
  constructor() { }
}
