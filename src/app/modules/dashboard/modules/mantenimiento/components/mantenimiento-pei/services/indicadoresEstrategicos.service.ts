import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({ providedIn: 'root' })

export class IndicadorEstrategicoService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getIndicadoresEstrategicos(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  postIndicadoresEstrategicos(indicadoresestrategicos: IndicadoresEstrategicosI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos`, indicadoresestrategicos, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  deleteIndicadoresEstrategicos(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/${id}`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  updateIndicadoresEstrategicos(indicadoresestrategicos: IndicadoresEstrategicosI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/${id}`, indicadoresestrategicos, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
