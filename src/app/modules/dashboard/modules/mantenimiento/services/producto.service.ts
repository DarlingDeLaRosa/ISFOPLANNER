import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { ProductoI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  token: string = Token.token
  baseURL: string = environment.api2

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }

  public getProducto(eje?: number, estrategia?: number, resultadoEfecto?: number) {
    const getProducto = `${this.baseURL}/Productos?eje=${eje ?? ''}&estrategia=${estrategia ?? ''}&resultadoEfecto=${resultadoEfecto ?? ''}`
    return this.http.get(getProducto, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public getByIdProducto(id: number) {
    const getByIdProducto = `${this.baseURL}/Productos/${id}`
    return this.http.get(getByIdProducto, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public postProducto(productoData: ProductoI) {
    const postProducto = `${this.baseURL}/Productos`
    return this.http.post(postProducto, productoData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public putProducto(productoData: ProductoI) {
    const putProducto = `${this.baseURL}/Productos?id=${productoData.id}`
    return this.http.put(putProducto, productoData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public removeProducto(id: number) {
    const removeProducto = `${this.baseURL}/Productos/${id}`
    return this.http.delete(removeProducto, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
