import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { ResponsableI } from '../interfaces/responsable.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable()
export class ResponsableService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getResponsable(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/UnidadesOrganizativas`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  postResponsable(responsable: ResponsableI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/agregar-responsable`, responsable, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public deleteResponsable(idIndicadorEstrategico: number, idUnidadOrganizativa: number) {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    const requestBody = { idIndicadorEstrategico, idUnidadOrganizativa };
    return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-responsable`, { headers, body: requestBody, })
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
  
  // deleteResponsable(responsable:ResponsableI): Observable<removerResponsableI> {
  //   const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  //   return this.http.delete<removerResponsableI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-responsable`, {headers})
  // }
}
