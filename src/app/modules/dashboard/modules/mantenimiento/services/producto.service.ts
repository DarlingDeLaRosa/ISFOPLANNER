import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { ProductoI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  token: string = Token.token
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getProducto() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const productoHeader = {headers: headers}

    const getProducto = `${this.baseURL}/Productos`
    return this.http.get(getProducto, productoHeader)
  }

  public postProducto(productoData: ProductoI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const productoHeader = {headers: headers}

    const postProducto = `${this.baseURL}/Productos`
    return this.http.post(postProducto , productoData, productoHeader)
  }

  public putProducto(productoData: ProductoI ) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const productoHeader = {headers: headers}

    const putProducto = `${this.baseURL}/Productos?id=${productoData.id}`
    return this.http.put(putProducto, productoData, productoHeader)
  }

  public removeProducto(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const  productoHeader = {headers: headers}

    const removeProducto = `${this.baseURL}/Productos/${id}`
    return this.http.delete(removeProducto,  productoHeader)
  }

}
