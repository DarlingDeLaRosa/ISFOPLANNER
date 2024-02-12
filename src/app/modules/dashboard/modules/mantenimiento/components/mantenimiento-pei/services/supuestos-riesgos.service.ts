import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({ providedIn: 'root' })

export class SupuestosRiesgosService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getSupuestosRiesgos(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/SupuestosRiesgos`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  postSupuestosRiesgos(supuestosriesgos: SupuestosRiesgosI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/SupuestosRiesgos`, supuestosriesgos, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  putSupuestosRiesgos(supuestosriesgos: SupuestosRiesgosI): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/SupuestosRiesgos/${supuestosriesgos.id}`, supuestosriesgos, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  deleteSupuestiRiesgos(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/SupuestosRiesgos/${id}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
