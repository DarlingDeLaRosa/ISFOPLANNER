import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class EstructuraProgramaticaService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjM3IiwibmJmIjoxNzAyMDUwMTU2LCJleHAiOjE3MDQ3Mjg1NTYsImlhdCI6MTcwMjA1MDE1Nn0.ivEDjzrCgResZe8IRQ2VuOBmWi1j3HLOG7FaA3YOox8.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
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
