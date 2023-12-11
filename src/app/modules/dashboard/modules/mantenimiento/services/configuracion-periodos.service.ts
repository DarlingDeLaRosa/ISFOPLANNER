import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, sistema, Token } from '../../../../../../environments/environments';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionPeriodoServive {

  token: string = Token.token
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
