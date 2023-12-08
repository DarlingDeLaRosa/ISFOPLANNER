import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { EjesI } from '../interfaces/ejes.interface';

@Injectable({providedIn: 'root'})


export class EjesService {

  private token = Token.token
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      getEjes(): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.get<ResponseI>(`${this.baseUrl}/EjesEstrategicos`, {headers})
      }
      postEjes(eje:EjesI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/EjesEstrategicos`, eje, {headers})
      }

      DeleteEjes(id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.delete<ResponseI>(`${this.baseUrl}/EjesEstrategicos/${id}`, {headers})
      }

      updateEjes(eje:EjesI, id:number): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.put<ResponseI>(`${this.baseUrl}/EjesEstrategicos/${id}`, eje, {headers})
      }
}
