import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { RolesI } from '../components/mantenimiento-pei/interfaces/RolesPermisos.interface';

@Injectable({
  providedIn: 'root'
})

export class RolesPermisosService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURLgeneralService

  headers: HttpHeaders = new HttpHeaders({'Authorization': this.token })
  header = {headers: this.headers}

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getRolesPermisos() {
    return this.http.get(`${this.baseURL}/Rol/getrolesbyidsistema/${this.userSystemService.getSistema}`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postRolesPermisos(rolPermisoData: RolesI) {
    return this.http.post(`${this.baseURL}/Rol/addroltransation` , rolPermisoData, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putRolesPermisos(rolPermisoData: RolesI) {
    return this.http.put(`${this.baseURL}/RolesPermisos/${rolPermisoData.idRol}`, rolPermisoData, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public removeRolesPermisos(id: number) {
    return this.http.delete(`${this.baseURL}/RolesPermisos/${id}`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
