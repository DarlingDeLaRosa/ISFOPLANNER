import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, sistema } from '../../../../../../environments/environments';
import { UsuarioI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjM3IiwibmJmIjoxNzAyMDUwMTU2LCJleHAiOjE3MDQ3Mjg1NTYsImlhdCI6MTcwMjA1MDE1Nn0.ivEDjzrCgResZe8IRQ2VuOBmWi1j3HLOG7FaA3YOox8.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api2
  idSistema: number = sistema.idSistema

  constructor(private http: HttpClient) { }

  public getUsuario() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const usuarioHeader = {headers: headers}

    const getUsuario = `${this.baseURL}/Usuario/getall/1/1/200`
    return this.http.get(getUsuario, usuarioHeader)
  }

  public postUsuario(usuarioData: UsuarioI) {
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
