import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class EstructuraProgramaticaService {

  token: string = Token.token
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getEstructurasProgramaticas() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const estructuraProHeader = {headers: headers}

    const getEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas`
    return this.http.get(getEstructurasProgramaticas, estructuraProHeader)
  }

  public postEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const estructuraProHeader = {headers: headers}

    const postEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas`
    return this.http.post(postEstructurasProgramaticas , estructuraProData, estructuraProHeader)
  }

  public putEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const estructuraProHeader = {headers: headers}

    const putEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas?id=${estructuraProData.id}`
    return this.http.put(putEstructurasProgramaticas, estructuraProData, estructuraProHeader)
  }

  public removeEstructurasProgramaticas(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const  estructuraProHeader = {headers: headers}

    const removeEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas/${id}`
    return this.http.delete(removeEstructurasProgramaticas,  estructuraProHeader)
  }

}
