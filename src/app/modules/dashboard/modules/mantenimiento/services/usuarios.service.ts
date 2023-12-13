import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, sistema } from '../../../../../../environments/environments';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = Token .token
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema
 
  constructor(private http: HttpClient) { }

  public getUsuario() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const usuarioHeader = {headers: headers}

    const getUsuario = `${this.baseURL}/Usuarios/getall/1/1/200`
    return this.http.get(getUsuario, usuarioHeader)
  }

  public postUsuario(usuarioData: UsuarioI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const usuarioHeader = {headers: headers}

    const postUsuario = `${this.baseURL}/Usuarios`
    return this.http.post(postUsuario , usuarioData, usuarioHeader)
  }

  public putUsuario(usuarioData: UsuarioI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const usuarioHeader = {headers: headers}

    const putUsuario = `${this.baseURL}/Usuarios?id=${usuarioData.id}`
    return this.http.put(putUsuario, usuarioData, usuarioHeader)
  }

  public removeUsuario(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const  usuarioHeader = {headers: headers}

    const removeUsuario = `${this.baseURL}/Usuarios/${id}`
    return this.http.delete(removeUsuario,  usuarioHeader)
  }

  // get todos los recintos

  public getAllRecintos() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const recintosHeader = {headers: headers}

    const getRecintos = `${this.baseURL}/Usuarios/getallrecintos`
    return this.http.get(getRecintos, recintosHeader)
  }

  //get todos los cargos

  public getAllCargos() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const cargosHeader = {headers: headers}

    const getCargos = `${this.baseURL}/Usuarios/getallcargos`
    return this.http.get(getCargos, cargosHeader)
  }

  // get todos los roles

  public getAllRoles() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const rolesHeader = {headers: headers}

    const getRol = `${this.baseURL}/Usuarios/getallroles/${this.idSistema}`
    return this.http.get(getRol , rolesHeader)
  }
}
