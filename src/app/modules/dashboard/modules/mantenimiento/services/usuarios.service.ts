import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURLgeneralService
  idSistema: number = this.userSystemService.getSistema

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getUsuario() {
    return this.http.get(`${this.baseURL}/User/getusuariossistema/${this.idSistema}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postUsuario(usuarioData: UsuarioI) {
    return this.http.post(`${this.baseURL}/User`, usuarioData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putUsuario(usuarioData: UsuarioI) {
    return this.http.put(`${this.baseURL}/User`, usuarioData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public removeUsuario(id: number) {
    return this.http.delete(`${this.baseURL}/User/${id}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  // get todos los recintos
  public getAllRecintos() {
    return this.http.get(`${this.baseURL}/GenericService/getallrecintos`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  // get todos los departamentos
  public getAllDepartamento() {
    return this.http.get(`${this.baseURL}/GenericService/getalldepartamento`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
  
  // get todas las divisiones
  public getAllDivisiones() {
    return this.http.get(`${this.baseURL}/GenericService/getalldivisiones`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
  
  //get todos los cargos
  public getAllCargos() {
    return this.http.get(`${this.baseURL}/GenericService/getallcargos`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  // get todos los roles
  public getAllRoles() {
    return this.http.get(`${this.baseURL}/Rol/${this.idSistema}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
