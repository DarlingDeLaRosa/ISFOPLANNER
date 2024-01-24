import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { InvolucradoI } from '../interfaces/involucrado.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({ providedIn: 'root' })

export class involucradoService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
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
    const requestBody = { idIndicadorEstrategico, idInvolucrado };
    return this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/remover-involucrado`, { headers, body: requestBody, })
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
