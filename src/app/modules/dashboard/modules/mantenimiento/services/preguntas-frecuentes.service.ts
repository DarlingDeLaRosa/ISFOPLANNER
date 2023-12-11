import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { PreguntaI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class preguntasFrecuentesService {

  token: string = Token.token
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getPreguntasFrecuentes() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const preguntasHeader = {headers: headers}

    const getPreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes`
    return this.http.get(getPreguntasFrecuentes, preguntasHeader)
  }

  public postPreguntasFrecuentes(preguntaData: PreguntaI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const preguntasHeader = {headers: headers}

    const postPreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes`
    return this.http.post(postPreguntasFrecuentes ,preguntaData, preguntasHeader)
  }

  public putPreguntasFrecuentes(preguntaData: PreguntaI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const preguntasHeader = {headers: headers}

    const putPreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes/${preguntaData.id}`
    return this.http.put(putPreguntasFrecuentes, preguntaData, preguntasHeader)
  }

  public removePreguntasFrecuentes(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const preguntasHeader = {headers: headers}

    const removePreguntasFrecuentes = `${this.baseURL}/PreguntasFrecuentes/${id}`
    return this.http.delete(removePreguntasFrecuentes, preguntasHeader)
  }

}
