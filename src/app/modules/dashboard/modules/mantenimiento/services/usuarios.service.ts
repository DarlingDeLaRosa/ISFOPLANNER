import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, sistema } from '../../../../../../environments/environments';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = Token .token
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }
  
  public getUsuario() {
    const getUsuario = `${this.baseURL}/Usuarios/getall/1/1/200`
    return this.http.get(getUsuario, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public postUsuario(usuarioData: UsuarioI) {
    const postUsuario = `${this.baseURL}/Usuarios`
    return this.http.post(postUsuario , usuarioData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putUsuario(usuarioData: UsuarioI) {
    const putUsuario = `${this.baseURL}/Usuarios?id=${usuarioData.id}`
    return this.http.put(putUsuario, usuarioData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public removeUsuario(id: number) {
    const removeUsuario = `${this.baseURL}/Usuarios/${id}`
    return this.http.delete(removeUsuario,  this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  // get todos los recintos

  public getAllRecintos() {
    const getRecintos = `${this.baseURL}/Usuarios/getallrecintos`
    return this.http.get(getRecintos, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  //get todos los cargos

  public getAllCargos() {
    const getCargos = `${this.baseURL}/Usuarios/getallcargos`
    return this.http.get(getCargos, this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  // get todos los roles

  public getAllRoles() {
    const getRol = `${this.baseURL}/Usuarios/getallroles/${this.idSistema}`
    return this.http.get(getRol , this.header)
    .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
