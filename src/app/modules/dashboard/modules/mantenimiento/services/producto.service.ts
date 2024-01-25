import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  token: string | number ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE0IiwiRmlyc3RuYW1lIjoiRnJhbmNpc2NvIEphdmllciIsIkxhc3RuYW1lIjoiTWVkaW5hIE1hdG9zIiwiVXNlcm5hbWUiOiJmcmFuY2lzY29qLm1lZGluYSIsIlBvc2l0aW9uIjoiUHJvZ3JhbWFkb3IiLCJJZFVuaWRhZCI6IjEwIiwibmJmIjoxNzAyMDYxNzAyLCJleHAiOjE3MDQ3NDAxMDIsImlhdCI6MTcwMjA2MTcwMn0.-jVvwTU9rnXCk-Q7PPpXJk6BDb7NaHTFF9SvVUhNgRM"
  // token: string | number = this.userSystemService.getToken 
  baseURL: string = this.userSystemService.getURL

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) {}
  
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  public getProducto(eje?: number, estrategia?: number, resultadoEfecto?: number) {
    return this.http.get(`${this.baseURL}/Productos?eje=${eje ?? ''}&estrategia=${estrategia ?? ''}&resultadoEfecto=${resultadoEfecto ?? ''}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public getByIdProducto(id: number) {
    return this.http.get(`${this.baseURL}/Productos/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public postProducto(productoData: ProductoI) {
    return this.http.post(`${this.baseURL}/Productos`, productoData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }

  public putProducto(productoData: ProductoI) {
    return this.http.put(`${this.baseURL}/Productos?id=${productoData.id}`, productoData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }

  public removeProducto(id: number) {
    return this.http.delete(`${this.baseURL}/Productos/${id}`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
