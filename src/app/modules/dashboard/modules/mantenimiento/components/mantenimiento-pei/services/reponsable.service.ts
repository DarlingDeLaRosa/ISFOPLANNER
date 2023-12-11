import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { ResponsableDeleteI, ResponsableI } from '../interfaces/responsable.interface';
import { ResponseResponsableI, removerResponsableI } from '../interfaces/ResponseAccion';

@Injectable()
export class ResponsableService {

  private token = Token.token
    private baseUrl = environment.api2;
    headers!: HttpHeaders;

    constructor(
      public http:HttpClient,
      ){}

      getResponsable(): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.get<ResponseI>(`${this.baseUrl}/UnidadesOrganizativas`, {headers})
      }

      postResponsable(responsable:ResponsableI): Observable<ResponseI> {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/agregar-responsable`, responsable, {headers})
      }

      // deleteResponsable(responsable:ResponsableI): Observable<removerResponsableI> {
      //   const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
      //   return this.http.delete<removerResponsableI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-responsable`, {headers})
      // }

      public deleteResponsable(idIndicadorEstrategico:number,idUnidadOrganizativa:number ) {
        const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
        const requestBody = {
          idIndicadorEstrategico,
          idUnidadOrganizativa
        };
       return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-responsable`, {headers, body:requestBody, })
      }

}
