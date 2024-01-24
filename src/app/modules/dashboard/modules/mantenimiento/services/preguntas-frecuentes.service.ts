import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntaI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class preguntasFrecuentesService {

  token?: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ){}

  public getPreguntasFrecuentes() {
    return this.http.get(`${this.baseURL}/PreguntasFrecuentes`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public postPreguntasFrecuentes(preguntaData: PreguntaI) {
    return this.http.post(`${this.baseURL}/PreguntasFrecuentes`, preguntaData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putPreguntasFrecuentes(preguntaData: PreguntaI) {
    return this.http.put(`${this.baseURL}/PreguntasFrecuentes/${preguntaData.id}`, preguntaData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public removePreguntasFrecuentes(id: number) {
    return this.http.delete(`${this.baseURL}/PreguntasFrecuentes/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

}
