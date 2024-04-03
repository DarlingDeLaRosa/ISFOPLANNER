import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoI } from '../interfaces/mantenimientoPOA.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  token: string | number = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  public getProducto(unidad?: string, eje?: number, estrategia?: number, resultadoEfecto?: number,) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/Productos?unidad=${unidad ?? ''}&eje=${eje ?? ''}&estrategia=${estrategia ?? ''}&resultadoEfecto=${resultadoEfecto ?? ''}`, this.header))
  }

  public getByIdProducto(id: number) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/Productos/${id}`, this.header))
  }

  public postProducto(productoData: ProductoI) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/Productos`, productoData, this.header))
  }

  public putProducto(productoData: ProductoI) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/Productos/${productoData.id}`, productoData, this.header))
  }

  public removeProducto(id: number) {
    return this.helperHandler.handleRequest(() => this.http.delete(`${this.baseURL}/Productos/${id}`, this.header))
  }
}
