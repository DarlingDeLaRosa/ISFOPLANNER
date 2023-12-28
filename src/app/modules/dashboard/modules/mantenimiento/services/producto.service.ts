import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment, header } from '../../../../../../environments/environments';
import { ProductoI } from '../interfaces/mantenimientoPOA.interface';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  token: string = Token.token
  baseURL: string = environment.api2

  constructor(private http: HttpClient) { }

  public getProducto(eje?: number, estrategia?: number, resultadoEfecto?: number) {
    const getProducto = `${this.baseURL}/Productos?eje=${eje ?? ''}&estrategia=${estrategia ?? ''}&resultadoEfecto=${resultadoEfecto ?? ''}`
    return this.http.get(getProducto, header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public getByIdProducto(id: number) {
    const getByIdProducto = `${this.baseURL}/Productos/${id}`
    return this.http.get(getByIdProducto, header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public postProducto(productoData: ProductoI) {
    const postProducto = `${this.baseURL}/Productos`
    return this.http.post(postProducto, productoData, header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public putProducto(productoData: ProductoI) {
    const putProducto = `${this.baseURL}/Productos?id=${productoData.id}`
    return this.http.put(putProducto, productoData, header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public removeProducto(id: number) {
    const removeProducto = `${this.baseURL}/Productos/${id}`
    return this.http.delete(removeProducto, header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
