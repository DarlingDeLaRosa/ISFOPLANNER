import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { ProductoI } from '../interfaces/mantenimientoPOA.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJGaXJzdG5hbWUiOiJmcmFuY2lzY28iLCJMYXN0bmFtZSI6Im1lZGluYSIsIlVzZXJuYW1lIjoiZnJhbmNpc2Nvai5tZWRpbmEiLCJQb3NpdGlvbiI6IlByb2dyYW1hZG9yIiwibmJmIjoxNzAwNjc0MTE4LCJleHAiOjE3MDMyNjYxMTgsImlhdCI6MTcwMDY3NDExOH0.ITHgy4EsIbYvSwZfPjsZp-5VdielvzUGJPa9vawb2No"
  baseURL: string = environment.api
  constructor(private http: HttpClient) { }

  public getProducto() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const productoHeader = {headers: headers}

    const getProducto = `${this.baseURL}/Producto`
    return this.http.get(getProducto, productoHeader)
  }

  public postProducto(productoData: ProductoI) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`, })
    const productoHeader = {headers: headers}

    const postProducto = `${this.baseURL}/Producto`
    return this.http.post(postProducto , productoData, productoHeader)
  }

  public putProducto(productoData: ProductoI ) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const productoHeader = {headers: headers}

    const putProducto = `${this.baseURL}/Producto?id=${productoData.id}`
    return this.http.put(putProducto, productoData, productoHeader)
  }

  public removeProducto(id: number) {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const  productoHeader = {headers: headers}

    const removeProducto = `${this.baseURL}/Producto/${id}`
    return this.http.delete(removeProducto,  productoHeader)
  }

}
