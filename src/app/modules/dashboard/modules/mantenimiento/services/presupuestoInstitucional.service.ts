import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresupuestoInstitucionalI, asignarUnidadOrgI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

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
    private userSystemService: UserSystemInformationService,
  ) { }

  public getPresupuestoInstitucional(enUso?: boolean ) {
    return this.http.get(`${this.baseURL}/PresupuestoInstitucional?enUso=${enUso ?? ''}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI) {
    return this.http.post(`${this.baseURL}/PresupuestoInstitucional`, PresupuestoInstitucionalData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI) {
    return this.http.put(`${this.baseURL}/PresupuestoInstitucional/${PresupuestoInstitucionalData.id}`, PresupuestoInstitucionalData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
  
  public postActivarPresupuesto(idPresupuesto: number) {
    return this.http.post(`${this.baseURL}/activar-presupuesto/${idPresupuesto}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public getUnidadesPresupuestoAsignado() {
    return this.http.get(`${this.baseURL}/PresupuestoInstitucional/presupuestos-asignados`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postAsignarPresupuesto(unidadOrg: asignarUnidadOrgI){
    return this.http.post(`${this.baseURL}/asignar-presupuesto`, unidadOrg, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
  
  public putAsignarPresupuesto(unidadOrg: asignarUnidadOrgI){
    return this.http.put(`${this.baseURL}/actualizar-presupuesto`, unidadOrg, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
