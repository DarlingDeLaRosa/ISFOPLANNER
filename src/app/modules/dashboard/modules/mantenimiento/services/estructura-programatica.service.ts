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

  public getEstructuraProgramatica() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const estructuraProHeader = {headers: headers}

    const getEstructuraProgramatica = `${this.baseURL}/EstructuraProgramatica`
    return this.http.get(getEstructuraProgramatica, estructuraProHeader)
  }

  public postEstructuraProgramatica(estructuraProData: EstructuraProgramaticaI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const estructuraProHeader = {headers: headers}

    const postEstructuraProgramatica = `${this.baseURL}/EstructuraProgramatica`
    return this.http.post(postEstructuraProgramatica , estructuraProData, estructuraProHeader)
  }

  public putEstructuraProgramatica(estructuraProData: EstructuraProgramaticaI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const estructuraProHeader = {headers: headers}

    const putEstructuraProgramatica = `${this.baseURL}/EstructuraProgramatica?id=${estructuraProData.id}`
    return this.http.put(putEstructuraProgramatica, estructuraProData, estructuraProHeader)
  }

  public removeEstructuraProgramatica(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const  estructuraProHeader = {headers: headers}

    const removeEstructuraProgramatica = `${this.baseURL}/EstructuraProgramatica/${id}`
    return this.http.delete(removeEstructuraProgramatica,  estructuraProHeader)
  }

}
