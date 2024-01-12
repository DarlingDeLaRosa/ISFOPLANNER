import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class FormulacionService {

  token: string = Token.token
  baseURL: string = environment.api2

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }

  public getFormulacion() {
    const getFormulacion = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.get(getFormulacion, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
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
