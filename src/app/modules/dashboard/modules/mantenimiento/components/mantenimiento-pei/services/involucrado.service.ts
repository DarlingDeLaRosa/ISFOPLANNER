import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { InvolucradoI } from '../interfaces/involucrado.interface';

@Injectable({providedIn: 'root'})

export class involucradoService {
  private token = Token.token
  private baseUrl = environment.api2;
  headers!: HttpHeaders;

  constructor(
    public http:HttpClient,
    ){}

    getInvolucrado(): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.get<ResponseI>(`${this.baseUrl}/Involucrados`, {headers})
    }
    postInvolucrado(involucrado:InvolucradoI): Observable<ResponseI> {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/agregar-involucrado`, involucrado, {headers})
    }

    deleteInvolucrado(idIndicadorEstrategico:number,idInvolucrado:number ) {
      const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      const requestBody = {
        idIndicadorEstrategico,
        idInvolucrado
      };
     return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-involucrado`, {headers, body:requestBody, })
    }

}
