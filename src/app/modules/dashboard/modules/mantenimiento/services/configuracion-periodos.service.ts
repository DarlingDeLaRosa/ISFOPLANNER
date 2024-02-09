import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionPeriodoServive {

  token?: string = this.userSystemService.getToken
  idSistema: number =  this.userSystemService.getSistema
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) {}

  public getPeriodoConfig() {
    return this.http.get(`${this.baseURL}/Configuraciones`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  } 
  
  public postPeriodoConfig(periodoConfigData: PeriodoConfigI) {
    return this.http.post(`${this.baseURL}/Configuraciones`, periodoConfigData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putPeriodoConfig(periodoConfigData: PeriodoConfigI) {
    return this.http.put(`${this.baseURL}/Configuraciones/${periodoConfigData.id}`, periodoConfigData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
