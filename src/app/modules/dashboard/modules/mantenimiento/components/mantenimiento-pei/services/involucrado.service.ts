import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { InvolucradoI } from '../interfaces/involucrado.interface';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({ providedIn: 'root' })

export class involucradoService {
  private token = Token.token
  private baseUrl = environment.api2;

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
  ) { }

  getInvolucrado(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/Involucrados`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))

  }
  postInvolucrado(involucrado: InvolucradoI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/agregar-involucrado`, involucrado, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  deleteInvolucrado(idIndicadorEstrategico: number, idInvolucrado: number) {
    const headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    const requestBody = {
      idIndicadorEstrategico,
      idInvolucrado
    };
    return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-involucrado`, { headers, body: requestBody, })
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

}
