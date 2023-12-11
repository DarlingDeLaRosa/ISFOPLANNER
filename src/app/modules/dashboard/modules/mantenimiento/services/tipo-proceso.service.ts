import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, sistema } from '../../../../../../environments/environments';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class TipoProcesosService {

  token: string = Token.token
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  constructor(private http: HttpClient) { }

  public getTipoProcesos() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const periodoConfigHeader = {headers: headers}

    const periodoConfig = `${this.baseURL}/Configuraciones/tipos-de-procesos`
    return this.http.get(periodoConfig, periodoConfigHeader)
  }
}
