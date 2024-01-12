import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from 'src/environments/environments';
import { PresupuestoInstitucionalI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PresupuestoInstitucionalService {

  token: string = Token.token
  baseURL: string = environment.api2

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }
  
  public getPresupuestoInstitucional(presupuestoYear: number | string ) {
    const getPresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucional?year=${presupuestoYear}`
    return this.http.get(getPresupuestoInstitucional, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public postPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI ) {
    const postPresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucional`
    return this.http.post(postPresupuestoInstitucional , PresupuestoInstitucionalData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI ) {
    const putPresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucional/${PresupuestoInstitucionalData.id}`
    return this.http.put(putPresupuestoInstitucional, PresupuestoInstitucionalData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

//   public removePresupuestoInstitucional(id: number) {
//     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
//     const  PresupuestoInstitucionalHeader = {headers: headers}

//     const removePresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucionals/${id}`
//     return this.http.delete(removePresupuestoInstitucional,  PresupuestoInstitucionalHeader)
//   }

}
