import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { IndicadorGestionI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class IndicadorGestionService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api
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
