import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { PreguntaI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class preguntasFrecuentesService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjM3IiwibmJmIjoxNzAyMDUwMTU2LCJleHAiOjE3MDQ3Mjg1NTYsImlhdCI6MTcwMjA1MDE1Nn0.ivEDjzrCgResZe8IRQ2VuOBmWi1j3HLOG7FaA3YOox8.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
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
