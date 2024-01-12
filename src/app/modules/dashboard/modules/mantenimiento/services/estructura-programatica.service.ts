import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Injectable({
  providedIn: 'root'
})

export class EstructuraProgramaticaService {

  token: string = Token.token
  baseURL: string = environment.api2

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }

  public getEstructurasProgramaticas() {
    const getEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas`
    return this.http.get(getEstructurasProgramaticas, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public postEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    const postEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas`
    return this.http.post(postEstructurasProgramaticas , estructuraProData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public putEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    const putEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas?id=${estructuraProData.id}`
    return this.http.put(putEstructurasProgramaticas, estructuraProData, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public removeEstructurasProgramaticas(id: number) {
    const removeEstructurasProgramaticas = `${this.baseURL}/EstructurasProgramaticas/${id}`
    return this.http.delete(removeEstructurasProgramaticas,  this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

}
