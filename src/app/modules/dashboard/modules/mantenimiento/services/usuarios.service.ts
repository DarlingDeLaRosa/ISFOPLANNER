import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL
  idSistema: number = this.userSystemService.getSistema

  headers: HttpHeaders = new HttpHeaders({'Authorization': this.token})
  header = {headers: this.headers}

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) {}
  
  public getUsuario() {
    console.log(this.header);
    
    return this.http.get(`${this.baseURL}/Usuarios/getall/1/1/200`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public postUsuario(usuarioData: UsuarioI) {
    return this.http.post(`${this.baseURL}/Usuarios`, usuarioData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public putUsuario(usuarioData: UsuarioI) {
    return this.http.put(`${this.baseURL}/Usuarios?id=${usuarioData.id}`, usuarioData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public removeUsuario(id: number) {
    return this.http.delete(`${this.baseURL}/Usuarios/${id}`,  this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  // get todos los recintos
  public getAllRecintos() {
    return this.http.get(`${this.baseURL}/Usuarios/getallrecintos`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  //get todos los cargos
  public getAllCargos() {
    return this.http.get(`${this.baseURL}/Usuarios/getallcargos`, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  // get todos los roles
  public getAllRoles() {
    return this.http.get(`${this.baseURL}/Usuarios/getallroles/${this.idSistema}` , this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
}
