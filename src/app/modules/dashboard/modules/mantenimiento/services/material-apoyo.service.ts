import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { MaterialApoyoI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class MaterialApoyoService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjM3IiwibmJmIjoxNzAyMDUwMTU2LCJleHAiOjE3MDQ3Mjg1NTYsImlhdCI6MTcwMjA1MDE1Nn0.ivEDjzrCgResZe8IRQ2VuOBmWi1j3HLOG7FaA3YOox8.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getMaterialApoyo() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const materialHeader = {headers: headers}

    const getMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.get(getMaterialApoyo, materialHeader)
  }

  public postMaterialApoyo(materialData: MaterialApoyoI | string) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const materialHeader = {headers: headers}

    const postMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.post(postMaterialApoyo , materialData, materialHeader)
  }

  public putMaterialApoyo(materialData: MaterialApoyoI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const materialHeader = {headers: headers}

    const putMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo/${materialData.id}`//
    return this.http.put(putMaterialApoyo, materialData, materialHeader)
  }

  public removeMaterialApoyo(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const materialHeader = {headers: headers}

    const removeMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo/${id}`
    return this.http.delete(removeMaterialApoyo, materialHeader)
  }

}
