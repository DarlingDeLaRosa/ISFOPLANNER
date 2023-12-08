import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { RequerimientoI } from '../interfaces/requerimientos.interface';

@Injectable({providedIn: 'root'})
export class RequerimientosService {

    private token = Token.token
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      getRequerimientos(): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.get<ResponseI>(`${this.baseUrl}/Requerimientos`, {headers})
      }

      postRequerimientos(requerimiento:RequerimientoI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/Requerimientos`,requerimiento, {headers})
      }

      deleteRequerimientos(id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.delete<ResponseI>(`${this.baseUrl}/Requerimientos/${id}`, {headers})
      }

      updateRequerimientos(requerimiento:RequerimientoI, id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.put<ResponseI>(`${this.baseUrl}/Requerimientos/${id}`, requerimiento, {headers})
      }
}
