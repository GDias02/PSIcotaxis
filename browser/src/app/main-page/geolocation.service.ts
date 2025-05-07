 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of, tap } from 'rxjs';

import { Morada } from './morada';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private geoLocationApiUrl = "";

  constructor(
    private http: HttpClient,
  ) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    }
  }

  getTranslationForCoordinate(coord: string): Observable<JSON>{
    const lat = coord.split(',')[0];
    const lon = coord.split(',')[1];
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
     
    return this.http.get<JSON>(url).pipe(
      catchError(this.handleError<JSON>(`getting the tranlation for ${coord}`))
    );
  }

  getTranslationForMorada(morada: Morada): Observable<JSON>{
    const url = `https://nominatim.openstreetmap.org/search?`;
    const query = `country=Portugal&city=${morada.localidade}&street=${morada.rua}&postalcode=${morada.codigoPostal}`;
    const settings = `&format=json`;
    return this.http.get<JSON>(url+query+settings).pipe(
      catchError(this.handleError<JSON>(`getting the translation for ${morada}`))
    )
  }

}
