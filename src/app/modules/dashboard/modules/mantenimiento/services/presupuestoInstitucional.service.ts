import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresupuestoInstitucionalI, asignarUnidadOrgI } from '../interfaces/mantenimientoPOA.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class PresupuestoInstitucionalService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getPresupuestoInstitucional(page:number = 1,enUso?: boolean ) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/PresupuestoInstitucional?CurrentPage=${page}&PageSize=10&enUso=${enUso ?? ''}`, this.header))
  }

  public getPresupuestoUnidad(unit: string) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/PresupuestoInstitucional/unidad-presupuesto?unidad=${unit}`, this.header))
  }

  public postPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/PresupuestoInstitucional`, PresupuestoInstitucionalData, this.header))
  }

  public putPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/PresupuestoInstitucional/${PresupuestoInstitucionalData.id}`, PresupuestoInstitucionalData, this.header))
  }
  
  public postActivarPresupuesto(idPresupuesto: number) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/activar-presupuesto/${idPresupuesto}`,'',this.header))
  }

  public getUnidadesPresupuestoAsignado(page: number = 1) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/PresupuestoInstitucional/presupuestos-asignados?CurrentPage=${page}&PageSize=10`, this.header))
  }

  public getSubUnidadesPresupuestoAsignado() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/PresupuestoInstitucional/unidad-presupuestos-asignados`, this.header))
  }

  public postAsignarPresupuesto(unidadOrg: asignarUnidadOrgI){
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/asignar-presupuesto`, unidadOrg, this.header))
  }
  
  public putAsignarPresupuesto(unidadOrg: asignarUnidadOrgI){
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/actualizar-presupuesto`, unidadOrg, this.header))
  }

  public deleteAsignacionPresupuesto(unidadOrg?: number){
    return this.helperHandler.handleRequest(() => this.http.delete(`${this.baseURL}/eliminar-presupuesto/${unidadOrg}`, this.header))
  }
}
