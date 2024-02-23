import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { RolesI } from '../components/mantenimiento-pei/interfaces/RolesPermisos.interface';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class RolesPermisosService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURLgeneralService

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getRolesPermisos() {
    return this.helperHandler.handleGeneralServiceRequest(() => this.http.get(`${this.baseURL}/Rol/getrolesbyidsistema/${this.userSystemService.getSistema}`, this.header))
  }

  public postRolesPermisos(rolPermisoData: RolesI) {
    return this.helperHandler.handleGeneralServiceRequest(() => this.http.post(`${this.baseURL}/Rol/addroltransation`, rolPermisoData, this.header))
  }

  public removeRolesPermisos(id: number) {
    return this.helperHandler.handleGeneralServiceRequest(() => this.http.delete(`${this.baseURL}/Rol/${id}`, this.header))
  }
}
