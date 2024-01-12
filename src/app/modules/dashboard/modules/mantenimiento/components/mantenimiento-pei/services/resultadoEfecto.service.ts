import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { Token, environment } from 'src/environments/environments';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({ providedIn: 'root' })
export class ResultadoEfectoService {

  private token = Token.token
  private baseUrl = environment.api2;

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
  ) { }

  getResultadoEfecto(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/ResultadosEfectos`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  postResultadoEfecto(retultadoEfecto: ResultadoEfectoI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/ResultadosEfectos`, retultadoEfecto, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  deleteResultadoEfecto(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/ResultadosEfectos/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  updateResultadoEfecto(retultadoEfecto: ResultadoEfectoI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/ResultadosEfectos/${id}`, retultadoEfecto, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
