import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';

@Injectable({providedIn: 'root'})
export class ResultadoEfectoService {

  private token = Token.token
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      getResultadoEfecto(): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.get<ResponseI>(`${this.baseUrl}/ResultadosEfectos`, {headers})
      }

      postResultadoEfecto(retultadoEfecto:ResultadoEfectoI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/ResultadosEfectos`,retultadoEfecto, {headers})
      }

      deleteResultadoEfecto(id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.delete<ResponseI>(`${this.baseUrl}/ResultadosEfectos/${id}`, {headers})
      }

      updateResultadoEfecto(retultadoEfecto:ResultadoEfectoI, id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.put<ResponseI>(`${this.baseUrl}/ResultadosEfectos/${id}`, retultadoEfecto, {headers})
      }
}
