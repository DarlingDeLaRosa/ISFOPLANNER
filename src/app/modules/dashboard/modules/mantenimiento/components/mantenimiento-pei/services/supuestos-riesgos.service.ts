import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';

@Injectable({providedIn: 'root'})
export class SupuestosRiesgosService {
  private token = Token.token
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      getSupuestosRiesgos(): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.get<ResponseI>(`${this.baseUrl}/SupuestosRiesgos`, {headers})
      }

      psotSupuestosRiesgos(supuestosriesgos:SupuestosRiesgosI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/SupuestosRiesgos`,supuestosriesgos, {headers})
      }

      deleteSupuestiRiesgos(id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.delete<ResponseI>(`${this.baseUrl}/SupuestosRiesgos/${id}`, {headers})
      }

}
