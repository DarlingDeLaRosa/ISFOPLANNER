import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';

@Injectable()
export class MedioVerificacionService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token})
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getMedioVerificacion(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/MediosVerificacione`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  postMedioVerificacion(medioVerificacion: MedioVerificacionI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/MediosVerificacione`, medioVerificacion, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  DeleteMedioVerificacion(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/MediosVerificacione/${id}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  updateMedioVerificacion(medioVerificacion: MedioVerificacionI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/MediosVerificacione/${id}`, medioVerificacion, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
