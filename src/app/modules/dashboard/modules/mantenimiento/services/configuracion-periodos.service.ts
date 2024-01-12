import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, sistema, Token } from '../../../../../../environments/environments';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionPeriodoServive {

  token: string = Token.token
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(private http: HttpClient) { }

  public getPeriodoConfig() {
    const periodoConfig = `${this.baseURL}/Configuraciones`
    return this.http.get(periodoConfig, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public putPeriodoConfig(periodoConfigData: PeriodoConfigI) {
    const putPeriodoConfig = `${this.baseURL}/Configuraciones/${periodoConfigData.id}`
    return this.http.put(putPeriodoConfig, periodoConfigData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
