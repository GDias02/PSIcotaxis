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

  constructor(
    private messageService: MessageService
  ) { }

  getViagens(): Observable<Viagem[]> {
    return of([]);
  }

  deleteViagem(id: string): Observable<any> {
    return of({});
  }

  private log(message: string) {
    this.messageService.add(`Viagem Service: ${message}`);
  }
}
