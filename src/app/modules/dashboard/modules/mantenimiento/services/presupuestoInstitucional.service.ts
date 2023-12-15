import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from 'src/environments/environments';
import { PresupuestoInstitucionalI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class PresupuestoInstitucionalService {

  token: string = Token.token
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getPresupuestoInstitucional() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const PresupuestoInstitucionalHeader = {headers: headers}

    const getPresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucional`
    return this.http.get(getPresupuestoInstitucional, PresupuestoInstitucionalHeader)
  }

  public postPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI ) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const PresupuestoInstitucionalHeader = {headers: headers}

    const postPresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucional`
    return this.http.post(postPresupuestoInstitucional , PresupuestoInstitucionalData, PresupuestoInstitucionalHeader)
  }

  public putPresupuestoInstitucional(PresupuestoInstitucionalData: PresupuestoInstitucionalI ) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const PresupuestoInstitucionalHeader = {headers: headers}
    
    const putPresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucional/${PresupuestoInstitucionalData.id}`
    return this.http.put(putPresupuestoInstitucional, PresupuestoInstitucionalData, PresupuestoInstitucionalHeader)
  }

//   public removePresupuestoInstitucional(id: number) {
//     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
//     const  PresupuestoInstitucionalHeader = {headers: headers}

//     const removePresupuestoInstitucional = `${this.baseURL}/PresupuestoInstitucionals/${id}`
//     return this.http.delete(removePresupuestoInstitucional,  PresupuestoInstitucionalHeader)
//   }

}
