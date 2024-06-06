import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndicadorGestionI, IndicadoresGestionGetI } from '../interfaces/mantenimientoPOA.interface';
import { indicadorMetaRecintos} from '../../formulacion/interfaces/formulacion.interface';
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

  public getIndicadorGestion(page:number = 1, pageSize:number = 10) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/IndicadoresGestion?CurrentPage=${page}&PageSize=${pageSize}`, this.header))
  }

  public getIndicadorByIdGestion(id: number) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/IndicadoresGestion/${id}`, this.header))
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

  public postIndicadorRecintos(idIndicadorGestion: number, indicadoresRecintos: indicadorMetaRecintos[]) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/IndicadoresGestion/crear-indicadores-recintos/${idIndicadorGestion}` , indicadoresRecintos, this.header))
  }

  public putResultadoEsperadoIndicadorRecintos( idIndicadorGestion: number, indicadorResultadoEsperado: any ) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/IndicadoresGestion/logros-esperados-recintos/${idIndicadorGestion}` , indicadorResultadoEsperado, this.header))
  }

  public putResultadoEsperadoIndicador( idIndicadorGestion: number, indicadorResultadoEsperado: any ) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/IndicadoresGestion/logros-esperados/${idIndicadorGestion}` , indicadorResultadoEsperado, this.header))
  }

  public putIndicadorRecintos(indicadoresGestionData: indicadorMetaRecintos[]) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/IndicadoresGestion/indicador-recinto`, indicadoresGestionData, this.header))
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
