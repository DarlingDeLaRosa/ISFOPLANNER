import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, header, sistema } from '../../../../../../environments/environments';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TipoProcesosService {

  token: string = Token.token
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema
  
  constructor(private http: HttpClient) { }
  
  public getTipoProcesos() {
    const periodoConfig = `${this.baseURL}/Configuraciones/tipos-de-procesos`
    return this.http.get(periodoConfig, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
