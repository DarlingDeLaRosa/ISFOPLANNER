import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { MaterialApoyoI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class MaterialApoyoService {

  token: string = Token.token
  baseURL: string = environment.api2

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { } 

  public getMaterialApoyo() {
    const getMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.get(getMaterialApoyo, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public postMaterialApoyo(materialData: MaterialApoyoI | string) {
    const postMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo`
    return this.http.post(postMaterialApoyo , materialData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public putMaterialApoyo(materialData: MaterialApoyoI) {

    const putMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo/${materialData.id}`//
    return this.http.put(putMaterialApoyo, materialData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public removeMaterialApoyo(id: number) {

    const removeMaterialApoyo = `${this.baseURL}/MaterialesDeApoyo/${id}`
    return this.http.delete(removeMaterialApoyo, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

}
