import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, sistema } from '../../../../../../environments/environments';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionPeriodoServive {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  constructor(private http: HttpClient) { }
  

  public getPeriodoConfig() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const periodoConfigHeader = {headers: headers}

    const periodoConfig = `${this.baseURL}/Configuraciones`
    return this.http.get(periodoConfig, periodoConfigHeader)
  }

  
  public putPeriodoConfig(periodoConfigData: PeriodoConfigI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const periodoConfigHeader = {headers: headers}

    const putPeriodoConfig = `${this.baseURL}/Configuraciones/${periodoConfigData.id}`
    return this.http.put(putPeriodoConfig, periodoConfigData, periodoConfigHeader)
  } 
}
