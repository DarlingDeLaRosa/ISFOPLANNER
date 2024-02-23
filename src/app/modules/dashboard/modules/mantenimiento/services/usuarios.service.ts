import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = this.userSystemService.getToken
  idSistema: number = this.userSystemService.getSistema
  baseURL: string = this.userSystemService.getURLgeneralService

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getUsuario() {
    return this.helperHandler.handleGeneralServiceRequest(()=> this.http.get(`${this.baseURL}/User/getusuariossistema/${this.idSistema}`, this.header))
  }

  public postUsuario(usuarioData: UsuarioI) {
    return this.helperHandler.handleGeneralServiceRequest(()=> this.http.post(`${this.baseURL}/User`, usuarioData, this.header))
  }

  public putUsuario(usuarioData: UsuarioI) {
    return this.helperHandler.handleGeneralServiceRequest(()=>  this.http.put(`${this.baseURL}/User`, usuarioData, this.header))
  }

  public removeUsuario(id: number) {
    return this.helperHandler.handleGeneralServiceRequest(()=>  this.http.delete(`${this.baseURL}/User/${id}`, this.header))
  }

  // get todos los recintos
  public getAllRecintos() {
    return this.helperHandler.handleGeneralServiceRequest(()=>  this.http.get(`${this.baseURL}/GenericService/getallrecintos`, this.header))
  }

  // get todos los departamentos
  public getAllDepartamento() {
    return this.helperHandler.handleGeneralServiceRequest(()=> this.http.get(`${this.baseURL}/GenericService/getalldepartamento`, this.header))
  }
  
  // get todas las divisiones
  public getAllDivisiones() {
    return this.helperHandler.handleGeneralServiceRequest(()=> this.http.get(`${this.baseURL}/GenericService/getalldivisiones`, this.header))
  }
  
  //get todos los cargos
  public getAllCargos() {
    return this.helperHandler.handleGeneralServiceRequest(()=> this.http.get(`${this.baseURL}/GenericService/getallcargos`, this.header))
  }

  // get todos los roles
  public getAllRoles() {
    return this.helperHandler.handleGeneralServiceRequest(()=> this.http.get(`${this.baseURL}/Rol/${this.idSistema}`, this.header))
  }
}
