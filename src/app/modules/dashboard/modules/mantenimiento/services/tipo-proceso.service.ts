import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, sistema } from '../../../../../../environments/environments';
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
  
  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }
  
  public getTipoProcesos() {
    const periodoConfig = `${this.baseURL}/Configuraciones/tipos-de-procesos`
    return this.http.get(periodoConfig, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
