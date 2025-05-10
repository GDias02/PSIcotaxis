import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Morada } from './morada';
import { catchError, first, Observable, of, switchMap, tap } from 'rxjs';

interface Address {
  address:{
    house_number: string, //numeroDePorta
    road: string,         //rua
    neighbourhood: string,
    hamlet: string,
    town: string,         //localidade
    municipality: string,
    county: string,
    //ISO3166-2-lvl6: String,
    postcode: string,     //codigoPostal
    country: string,
    country_code: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocService {

  morada: Morada | null = null;
  duration: number | null = null;
  distance: number | null = null;
  loc?: GeolocationPosition;

  constructor(private http: HttpClient) { }

  /////// IMPORTANT METHODS ///////
  setLocWatcher(): number {
    if (!("geolocation" in navigator)) return -1;
    return navigator.geolocation.watchPosition((position: GeolocationPosition) => this.loc = position);
  }

  isActive(): boolean {
    return "geolocation" in navigator;
  }

  getMorada(): Observable<Morada> {
    if (!("geolocation" in navigator)) return of({} as Morada);
    return this.locToMorada(this.loc!);
  }

  getMoradaWithLoc(loc: GeolocationPosition): Observable<Morada> {
    if (!("geolocation" in navigator)) return of({} as Morada);
    return this.locToMorada(loc);
  }

  getCoords(morada: Morada): Observable<GeolocationCoordinates> {
    if (!("geolocation" in navigator)) return of({latitude: 38.756734, longitude: -9.155412} as GeolocationCoordinates); //Default FCUL
    return this.moradaToLoc(morada);
  }

  getDuration(morada1: Morada, morada2: Morada): Observable<number> {
    if (!("geolocation" in navigator)) return of(-1);
    return this.computeDuration(morada1, morada2)
  }

  getDurationDistance(morada1: Morada, morada2: Morada): Observable<number[]> {
    if (!("geolocation" in navigator)) return of([0, 0]);
    return this.computeDistanceDuration(morada1, morada2)
  }

  //haversine formula
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let dlat: number, dlon: number, a: number, c: number, R: number;

    R = 6372.8; // km
    dlat = this.radians(lat2 - lat1);
    dlon = this.radians(lon2 - lon1);
    lat1 = this.radians(lat1);
    lat2 = this.radians(lat2);
    a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2)
    c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
  }
  //////////////////////////////

  locToMorada(loc: GeolocationPosition): Observable<Morada> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&zoom=18&addressdetails=1`;
    return this.http.get<Address>(url)
      .pipe(
        catchError(this.handleError<Address>('getAddress', {} as Address)),
        tap((address: Address) => this.morada =
          {rua: address.address.road, codigoPostal: address.address.postcode, localidade: address.address.town, numeroDePorta: address.address.house_number} as Morada),
        switchMap(() => of(this.morada!))
      );
  }

  moradaToLoc(morada: Morada): Observable<GeolocationCoordinates> {
    const url = `https://nominatim.openstreetmap.org/search?q=${morada.localidade}%20${morada.codigoPostal}%20${morada.rua}&format=json`;
    return this.http.get<GeolocationCoordinates>(url)
      .pipe(
        catchError(this.handleError<GeolocationCoordinates>('getAddress', {} as GeolocationCoordinates)),
        first()
      )
  }

  computeDuration(morada1: Morada, morada2: Morada): Observable<number> {
    let loc1: GeolocationCoordinates, loc2: GeolocationCoordinates;

    return this.getCoords(morada1)
      .pipe(
        tap((loc: GeolocationCoordinates) => loc1 = loc),
        switchMap(() => this.getCoords(morada2)
          .pipe(
            tap((loc: GeolocationCoordinates) => {
              loc2 = loc;
              let distance = this.getDistance(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude);
              this.duration = 4 * distance;
            }),
            switchMap(() => of(this.duration!))
          )
        )
      );
  }

  computeDistanceDuration(morada1: Morada, morada2: Morada): Observable<number[]> {
    let loc1: GeolocationCoordinates, loc2: GeolocationCoordinates;

    return this.getCoords(morada1)
      .pipe(
        tap((loc: GeolocationCoordinates) => loc1 = loc),
        switchMap(() => this.getCoords(morada2)
          .pipe(
            tap((loc: GeolocationCoordinates) => {
              loc2 = loc;
              this.distance = this.getDistance(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude);
              this.duration = 4 * this.distance;
            }),
            switchMap(() => of([this.distance!, this.duration!]))
          )
        )
      );
  }

  radians(degree: number): number {
    // degrees to radians
    let rad: number = degree * Math.PI / 180;
    return rad;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }
}
