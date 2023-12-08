import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { IndicadorGestionI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class IndicadorGestionService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjM3IiwibmJmIjoxNzAyMDUwMTU2LCJleHAiOjE3MDQ3Mjg1NTYsImlhdCI6MTcwMjA1MDE1Nn0.ivEDjzrCgResZe8IRQ2VuOBmWi1j3HLOG7FaA3YOox8.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getIndicadorGestion() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const indicadoresGestionHeader = {headers: headers}

    const getIndicadorGestion = `${this.baseURL}/IndicadoresGestion`
    return this.http.get(getIndicadorGestion, indicadoresGestionHeader)
  }

  public postIndicadorGestion(indicadoresGestionData: IndicadorGestionI | string) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const indicadoresGestionHeader = {headers: headers}

    const postIndicadorGestion = `${this.baseURL}/IndicadoresGestion`
    return this.http.post(postIndicadorGestion , indicadoresGestionData, indicadoresGestionHeader)
  }

  public putIndicadorGestion(indicadoresGestionData: IndicadorGestionI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const indicadoresGestionHeader = {headers: headers}

    const putIndicadorGestion = `${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`//
    return this.http.put(putIndicadorGestion, indicadoresGestionData, indicadoresGestionHeader)
  }

  public removeIndicadorGestion(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const indicadoresGestionHeader = {headers: headers}

    const removeIndicadorGestion = `${this.baseURL}/IndicadoresGestion/${id}`
    return this.http.delete(removeIndicadorGestion, indicadoresGestionHeader)
  }


  /// Tipo de alcance

  public getAlcance() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const alcanceHeader = {headers: headers}

    const getAlcance = `${this.baseURL}/TipoAlcance`
    return this.http.get(getAlcance, alcanceHeader)
  }

  //Frecuencia

  public getFrecuencia() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const frecuenciaHeader = {headers: headers}

    const getFrecuencia = `${this.baseURL}/Frecuencia`
    return this.http.get(getFrecuencia, frecuenciaHeader)
  }

}
