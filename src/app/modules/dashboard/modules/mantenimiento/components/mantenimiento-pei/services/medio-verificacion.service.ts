import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable()
export class MedioVerificacionService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getMedioVerificacion(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/MediosVerificacion`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  postMedioVerificacion(medioVerificacion: MedioVerificacionI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/MediosVerificacion`, medioVerificacion, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  DeleteMedioVerificacion(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/MediosVerificacion/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  updateMedioVerificacion(medioVerificacion: MedioVerificacionI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/MediosVerificacion/${id}`, medioVerificacion, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
