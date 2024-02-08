import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { EjesI } from '../interfaces/ejes.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({ providedIn: 'root' })

export class EjesService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getEjes(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/EjesEstrategicos`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
  postEjes(eje: EjesI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/EjesEstrategicos`, eje, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  DeleteEjes(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/EjesEstrategicos/${id}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  updateEjes(eje: EjesI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/EjesEstrategicos/${id}`, eje, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
