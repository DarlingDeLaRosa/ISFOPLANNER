import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodoConfigI } from '../interfaces/mantenimientoPOA.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionPeriodoServive {

  baseURL: string = this.userSystemService.getURL
  token: string = this.userSystemService.getToken
  idSistema: number =  this.userSystemService.getSistema

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) {}

  public getPeriodoConfig() {
    return this.helperHandler.handleRequest(()=> this.http.get(`${this.baseURL}/Configuraciones`, this.header))
  } 
  
  public postPeriodoConfig(periodoConfigData: PeriodoConfigI) {
    return this.helperHandler.handleRequest(()=> this.http.post(`${this.baseURL}/Configuraciones`, periodoConfigData, this.header))
  }

  public putPeriodoConfig(periodoConfigData: PeriodoConfigI) {
    return this.helperHandler.handleRequest(()=> this.http.put(`${this.baseURL}/Configuraciones/${periodoConfigData.id}`, periodoConfigData, this.header))
  }
}
