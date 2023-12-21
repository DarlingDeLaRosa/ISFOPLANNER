
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class ActividadesService {

  private token = Token.token
  private baseUrl = environment.api2;
  headers!: HttpHeaders;

  constructor(
    public http:HttpClient,
    ){}

    getRegiones(): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.get<ResponseI>(`${this.baseUrl}/Regiones`, {headers})
    }

    getProvincias(): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.get<ResponseI>(`${this.baseUrl}/Provincias`, {headers})
    }

    getMunicipios(): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.get<ResponseI>(`${this.baseUrl}/Municipios`, {headers})
    }
    getEstados(): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.get<ResponseI>(`${this.baseUrl}/Estados`, {headers})
    }
    getFrecuencias(): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.get<ResponseI>(`${this.baseUrl}/Frecuencias`, {headers})
    }


}
