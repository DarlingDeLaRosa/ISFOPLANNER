import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({ providedIn: 'root' })
export class EstrategiasService {
  private token = Token.token
  private baseUrl = environment.api2;

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
  ) { }

  getEstrategias(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/Estrategias`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  postEstrategias(estrategia: EstrategiaI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/Estrategias`, estrategia, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  DeleteEstrategias(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  updateEstrategias(estrategia: EstrategiaI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, estrategia, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
