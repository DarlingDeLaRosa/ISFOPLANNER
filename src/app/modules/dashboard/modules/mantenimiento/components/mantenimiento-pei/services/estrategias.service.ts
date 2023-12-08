import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { EstrategiaI } from '../interfaces/estrategias.interface';

@Injectable({providedIn: 'root'})
export class EstrategiasService {
  private token = Token.token
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      getEstrategias(): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.get<ResponseI>(`${this.baseUrl}/Estrategias`, {headers})
      }

      postEstrategias(estrategia:EstrategiaI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/Estrategias`,estrategia, {headers})
      }

      DeleteEstrategias(id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.delete<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, {headers})
      }

      updateEstrategias(estrategia:EstrategiaI, id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.put<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, estrategia, {headers})
      }
}
