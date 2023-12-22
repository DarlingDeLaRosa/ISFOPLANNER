import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';

@Injectable({
  providedIn: 'root'
})

export class FormulacionService {

  token: string = Token.token
  baseURL: string = environment.api2
  constructor(private http: HttpClient) { }

  public getFormulacion() {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    const formulacionHeader = {headers: headers}

    const getFormulacion = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.get(getFormulacion, formulacionHeader)
  }

  getMeses(): Observable<ResponseI> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
    return this.http.get<ResponseI>(`${this.baseURL}/Meses`, {headers})
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
