import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndicadorGestionI, IndicadoresGestionGetI } from '../interfaces/mantenimientoPOA.interface';
import { indicadorRecinto } from '../../formulacion/interfaces/formulacion.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class IndicadorGestionService {

  token: string = this.userSystemService.getToken 
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({'Authorization': this.token })
  header = {headers: this.headers}

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
    ){}

  public getIndicadorGestion() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/IndicadoresGestion`, this.header))
  }

  public postIndicadorGestion(indicadoresGestionData: IndicadorGestionI | string) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/IndicadoresGestion` , indicadoresGestionData, this.header))
  }

  public putIndicadorGestion(indicadoresGestionData: IndicadoresGestionGetI) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`, indicadoresGestionData, this.header))
  }

  public removeIndicadorGestion(id: number) {
    return this.helperHandler.handleRequest(() => this.http.delete(`${this.baseURL}/IndicadoresGestion/${id}`, this.header))
  }

  public postIndicadorRecintos(idIndicadorGestion: number | undefined | null, indicadoresRecintos: indicadorRecinto) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/IndicadoresGestion/crear-indicador-recinto/${idIndicadorGestion}` , indicadoresRecintos, this.header))
  }

  public postResultadoEsperadoIndicador( idIndicadorGestion: number | undefined | null, indicadorResultadoEsperado: any ) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/IndicadoresGestion/logros-esperados/${idIndicadorGestion}` , indicadorResultadoEsperado, this.header))
  }

  public putIndicadorRecintos(indicadoresGestionData: IndicadoresGestionGetI) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`, indicadoresGestionData, this.header))
  }

  /// Tipo de alcance
  public getAlcance() {
    return this.helperHandler.handleRequest(() => this.http.get( `${this.baseURL}/TiposAlcances`, this.header))
  }

  //Frecuencia
  public getFrecuencia() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/Frecuencias`, this.header))
  }
}
