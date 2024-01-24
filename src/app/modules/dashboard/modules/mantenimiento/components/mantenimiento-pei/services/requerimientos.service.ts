import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { RequerimientoI } from '../interfaces/requerimientos.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({ providedIn: 'root' })
export class RequerimientosService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  getRequerimientos(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.baseUrl}/Requerimientos`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  postRequerimientos(requerimiento: RequerimientoI): Observable<ResponseI> {
    return this.http.post<ResponseI>(`${this.baseUrl}/Requerimientos`, requerimiento, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  deleteRequerimientos(id: number): Observable<ResponseI> {
    return this.http.delete<ResponseI>(`${this.baseUrl}/Requerimientos/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  updateRequerimientos(requerimiento: RequerimientoI, id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.baseUrl}/Requerimientos/${id}`, requerimiento, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
