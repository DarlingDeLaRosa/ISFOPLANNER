import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class EstructuraProgramaticaService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
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
