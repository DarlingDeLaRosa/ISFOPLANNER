import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialApoyoI } from '../interfaces/mantenimientoPOA.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class MaterialApoyoService {

  token : string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getMaterialApoyo(page:number = 1,materialName: string = '') {
    return  this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/MaterialesDeApoyo?CurrentPage=${page}&PageSize=10&buscar=${materialName}`, this.header))
  }

  public postMaterialApoyo(materialData: MaterialApoyoI | string) {
    return  this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/MaterialesDeApoyo`, materialData, this.header))
  }

  public putMaterialApoyo(materialData: MaterialApoyoI) {
    return  this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/MaterialesDeApoyo/${materialData.id}`, materialData, this.header))
  }

  public removeMaterialApoyo(id: number) {
    return  this.helperHandler.handleRequest(() => this.http.delete(`${this.baseURL}/MaterialesDeApoyo/${id}`, this.header))
  }
}
