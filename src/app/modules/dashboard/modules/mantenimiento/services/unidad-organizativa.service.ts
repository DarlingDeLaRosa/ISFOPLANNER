import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, header, sistema } from '../../../../../../environments/environments';
import { UnidadOrgI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UnidadOrganizativaService {

  token: string = Token.token
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  constructor(private http: HttpClient) { }

  public getUnidadesOrganizativas() {
    const getUnidadOrg = `${this.baseURL}/UnidadesOrganizativas`
    return this.http.get(getUnidadOrg, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putUnidadesOrganizativas(unidadOrg: UnidadOrgI, presupuestoInsti: number) {
    const getUnidadOrg = `${this.baseURL}/UnidadesOrganizativas/${unidadOrg.id}/presupuesto/${presupuestoInsti}`
    return this.http.put(getUnidadOrg, unidadOrg, header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

}
