import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, header } from '../../../../../../environments/environments';
import { PreguntaI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class preguntasFrecuentesService {

  token: string = Token.token
  baseURL: string = environment.api2

  constructor(private http: HttpClient) { }

  public getPreguntasFrecuentes() {
    const getPreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes`
    return this.http.get(getPreguntasFrecuentes, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public postPreguntasFrecuentes(preguntaData: PreguntaI) {
    const postPreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes`
    return this.http.post(postPreguntasFrecuentes ,preguntaData, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putPreguntasFrecuentes(preguntaData: PreguntaI) {
    const putPreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes/${preguntaData.id}`
    return this.http.put(putPreguntasFrecuentes, preguntaData, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public removePreguntasFrecuentes(id: number) {
    const removePreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes/${id}`
    return this.http.delete(removePreguntasFrecuentes, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

}
