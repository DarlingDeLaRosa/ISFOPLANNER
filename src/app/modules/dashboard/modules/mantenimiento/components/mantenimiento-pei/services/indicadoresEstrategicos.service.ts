import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({ providedIn: 'root' })
export class IndicadorEstrategicoService {

  private token = Token.token
  private baseUrl = environment.api2;

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
  ) { }

  getIndicadoresEstrategicos(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  postIndicadoresEstrategicos(indicadoresestrategicos: IndicadoresEstrategicosI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos`, indicadoresestrategicos, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  deleteIndicadoresEstrategicos(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/${id}`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  updateIndicadoresEstrategicos(indicadoresestrategicos: IndicadoresEstrategicosI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/${id}`, indicadoresestrategicos, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

}
