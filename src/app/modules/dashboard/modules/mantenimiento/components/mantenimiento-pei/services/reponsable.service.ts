import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { environment } from 'src/environments/environments';
import { ResponsableI } from '../interfaces/responsable.interface';
import { ResponseResponsableI } from '../interfaces/ResponseAccion';

@Injectable()
export class ResponsableService {
    
    token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No';
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      
      postResponsable(responsable:ResponsableI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/agregar-responsable`, responsable, {headers})
      }

    //   DeleteResponsable(responsable:ResponsableI): Observable<ResponseResponsableI> {
    //     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    //     return this.http.delete<ResponseResponsableI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-responsable`, responsable, {headers})
    //   }


}