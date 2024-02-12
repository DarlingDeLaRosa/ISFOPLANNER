import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntaI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class preguntasFrecuentesService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token})
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ){}

  public getPreguntasFrecuentes() {
    return this.http.get(`${this.baseURL}/PreguntasFrecuentes`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postPreguntasFrecuentes(preguntaData: PreguntaI) {
    return this.http.post(`${this.baseURL}/PreguntasFrecuentes`, preguntaData, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putPreguntasFrecuentes(preguntaData: PreguntaI) {
    return this.http.put(`${this.baseURL}/PreguntasFrecuentes/${preguntaData.id}`, preguntaData, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public removePreguntasFrecuentes(id: number) {
    return this.http.delete(`${this.baseURL}/PreguntasFrecuentes/${id}`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

}
