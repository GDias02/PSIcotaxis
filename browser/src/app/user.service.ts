import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = User.NAO_AUTENTICADO;
  
  setCurrentUser(newUser : User){
    this.currentUser = newUser;
  }
  
  getCurrentUser(): Observable<User> {
    return of(this.currentUser);
  }

  constructor() { }
}
