import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { environment } from 'src/environments/environments';
import { RequerimientoI } from '../interfaces/requerimientos.interface';

@Injectable({providedIn: 'root'})
export class RequerimientosService {

    token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No';
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
