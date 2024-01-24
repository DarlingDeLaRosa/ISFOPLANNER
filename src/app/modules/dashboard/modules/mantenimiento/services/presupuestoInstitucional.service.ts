import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresupuestoInstitucionalI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class PresupuestoInstitucionalService {

  token?: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getPresupuestoInstitucional(presupuestoYear: number | string) {
    return this.http.get(`${this.baseURL}/PresupuestoInstitucional?year=${presupuestoYear}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public postPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI) {
    return this.http.post(`${this.baseURL}/PresupuestoInstitucional`, PresupuestoInstitucionalData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI) {
    return this.http.put(`${this.baseURL}/PresupuestoInstitucional/${PresupuestoInstitucionalData.id}`, PresupuestoInstitucionalData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  //   public removePresupuestoInstitucional(id: number) {
  //     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  //     const  PresupuestoInstitucionalHeader = {headers: headers}

  //     const removePresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucionals/${id}`
  //     return this.http.delete(removePresupuestoInstitucional,  PresupuestoInstitucionalHeader)
  //   }

}
