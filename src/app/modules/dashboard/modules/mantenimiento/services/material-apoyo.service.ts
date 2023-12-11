import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { MaterialApoyoI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class MaterialApoyoService {

  token: string = Token.token
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
