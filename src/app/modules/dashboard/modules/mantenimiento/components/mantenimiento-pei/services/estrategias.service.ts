import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({ providedIn: 'root' })

export class EstrategiasService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getEstrategias(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/Estrategias`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  postEstrategias(estrategia: EstrategiaI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/Estrategias`, estrategia, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  DeleteEstrategias(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  updateEstrategias(estrategia: EstrategiaI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, estrategia, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
