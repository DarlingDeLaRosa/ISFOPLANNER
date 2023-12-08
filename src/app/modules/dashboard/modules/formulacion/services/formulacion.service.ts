import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class FormulacionService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjM3IiwibmJmIjoxNzAyMDUwMTU2LCJleHAiOjE3MDQ3Mjg1NTYsImlhdCI6MTcwMjA1MDE1Nn0.ivEDjzrCgResZe8IRQ2VuOBmWi1j3HLOG7FaA3YOox8
.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getFormulacion() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const formulacionHeader = {headers: headers}

    const getFormulacion = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.get(getFormulacion, formulacionHeader)
  }

//   public postFormulacion(materialData: FormulacionI | string) {
//     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
//     const formulacionHeader = {headers: headers}

//     const postFormulacion = `${this.baseURL}/MaterialesDeApoyo`
//     return this.http.post(postFormulacion , formulacionlData, materialHeader)
//   }

//   public putFormulacion(materialData: FormulacionI) {
//     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
//     const formulacionHeader = {headers: headers}

//     const putFormulacion = `${this.baseURL}/MaterialesDeApoyo/${materialData.id}`//
//     return this.http.put(putFormulacion, formulacionlData, materialHeader)
//   }

//   public removeFormulacion(id: number) {
//     const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
//     const formulacionHeader = {headers: headers}

//     const removeFormulacion = `${this.baseURL}/MaterialesDeApoyo/${id}`
//     return this.http.delete(formulacionacion, materialHeader)
//   }

}
