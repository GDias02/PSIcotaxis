import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Viagem } from './viagem';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {

  constructor() { }

  getViagens(): Observable<Viagem[]> {
    return of([]);
  }

  deleteViagem(id: string): Observable<any> {
    return of({});
  }
}
