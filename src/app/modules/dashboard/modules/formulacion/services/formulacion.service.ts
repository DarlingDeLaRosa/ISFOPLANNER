import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class FormulacionService {

  token?: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getFormulacion() {
    return this.http.get(`${this.baseURL}/MaterialesDeApoyo`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error) }))
  }
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

