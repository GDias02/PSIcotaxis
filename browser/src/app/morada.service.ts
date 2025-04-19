import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of} from 'rxjs';

import { Morada } from './morada';

@Injectable({
  providedIn: 'root'
})
export class MoradaService {
  private moradasUrl = 'http://localhost:3000/gestor';

  httpOptions = {
    headers: new HttpHeaders( {'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getMoradas(): Observable<Morada[]> {
    const url = this.moradasUrl + "/moradas";
    return this.http.get<Morada[]>(url)
      .pipe(
        catchError(this.handleError<Morada[]>('getMoradas', []))
      );
  }

  getMorada(moradaId: string): Observable<Morada> {
    const url = `${this.moradasUrl}/moradas/${moradaId}`;
    return this.http.get<Morada>(url)
      .pipe(
        catchError(this.handleError<Morada>(`getMorada id=${moradaId}`))
      );
  }

  updateMorada(morada: Morada): Observable<Morada> {
    const url = `${this.moradasUrl}/moradas/${morada._id}`;
    return this.http.put<Morada>(url, morada, this.httpOptions).pipe(
      catchError(this.handleError<Morada>('updateMorada'))
    );
  }

  addMorada(morada: Morada): Observable<Morada>{
    const url = `${this.moradasUrl}/moradas/create`;
    return this.http.post<Morada>(url,morada,this.httpOptions).pipe(
      catchError(this.handleError<Morada>('addMorada'))
    )
  }

  deleteMorada(moradaId: string): Observable<Morada> {
    const url = `${this.moradasUrl}/moradas/${moradaId}`;
    return this.http.delete<Morada>(url, this.httpOptions).pipe(
      catchError(this.handleError<Morada>('deleteMorada'))
    )
  }
}

