import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, sistema } from '../../../../../../environments/environments';
import { UnidadOrgI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class UnidadOrganizativaService {

  token: string =  Token.token 
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  constructor(private http: HttpClient) { }


  public getUnidadesOrganizativas() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const unidadOrgHeader = {headers: headers}

    const getUnidadOrg = `${this.baseURL}/UnidadesOrganizativas`
    return this.http.get(getUnidadOrg, unidadOrgHeader)
  }


  public putUnidadesOrganizativas(unidadOrg: UnidadOrgI, presupuestoInsti: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const unidadOrgHeader = {headers: headers}

    const getUnidadOrg = `${this.baseURL}/UnidadesOrganizativas/${unidadOrg.id}/presupuesto/${presupuestoInsti}`
    return this.http.put(getUnidadOrg, unidadOrg, unidadOrgHeader)
  }

}
