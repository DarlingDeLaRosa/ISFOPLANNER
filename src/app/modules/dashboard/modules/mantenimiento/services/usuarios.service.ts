import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, sistema } from '../../../../../../environments/environments';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  constructor(private http: HttpClient) { }

  public getUsuario() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const usuarioHeader = {headers: headers}

    const getUsuario = `${this.baseURL}/Usuario/getall/1/1/200`
    return this.http.get(getUsuario, usuarioHeader)
  }

  public postUsuario(usuarioData: any) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const usuarioHeader = {headers: headers}

    const postUsuario = `${this.baseURL}/Usuario`
    return this.http.post(postUsuario , usuarioData, usuarioHeader)
  }

  public putUsuario(usuarioData: UsuarioI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const usuarioHeader = {headers: headers}

    const putUsuario = `${this.baseURL}/Usuario?id=${usuarioData.id}`
    return this.http.put(putUsuario, usuarioData, usuarioHeader)
  }

  public removeUsuario(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const  usuarioHeader = {headers: headers}

    const removeUsuario = `${this.baseURL}/Usuario/${id}`
    return this.http.delete(removeUsuario,  usuarioHeader)
  }

  // get todos los recintos

  public getAllRecintos() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const recintosHeader = {headers: headers}

    const getRecintos = `${this.baseURL}/Usuario/getallrecintos`
    return this.http.get(getRecintos, recintosHeader)
  }

  //get todos los cargos
  
  public getAllCargos() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const cargosHeader = {headers: headers}

    const getCargos = `${this.baseURL}/Usuario/getallcargos`
    return this.http.get(getCargos, cargosHeader)
  }

  // get todos los roles

  public getAllRoles() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const rolesHeader = {headers: headers}

    const getRol = `${this.baseURL}/Usuario/getallroles/${this.idSistema}`
    return this.http.get(getRol , rolesHeader)
  }
}
