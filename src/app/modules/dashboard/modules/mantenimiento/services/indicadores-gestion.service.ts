import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token, environment } from '../../../../../../environments/environments';
import { IndicadorGestionI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { indicadorRecinto } from '../../formulacion/interfaces/formulacion.interface';

@Injectable({
  providedIn: 'root'
})

export class IndicadorGestionService {

  token: string = Token.token 
  baseURL: string = environment.api2

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(private http: HttpClient) { }

  public getIndicadorGestion() {
    const getIndicadorGestion = `${this.baseURL}/IndicadoresGestion`
    return this.http.get(getIndicadorGestion, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public postIndicadorGestion(indicadoresGestionData: IndicadorGestionI | string) {
    const postIndicadorGestion = `${this.baseURL}/IndicadoresGestion`
    return this.http.post(postIndicadorGestion , indicadoresGestionData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public putIndicadorGestion(indicadoresGestionData: IndicadorGestionI) {
    const putIndicadorGestion = `${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`//
    return this.http.put(putIndicadorGestion, indicadoresGestionData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public removeIndicadorGestion(id: number) {
    const removeIndicadorGestion = `${this.baseURL}/IndicadoresGestion/${id}`
    return this.http.delete(removeIndicadorGestion, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public postIndicadorRecintos(idIndicadorGestion: number | undefined | null, indicadoresRecintos: indicadorRecinto) {
    const postIndicadorGestion = `${this.baseURL}/crear-indicador-recinto/${idIndicadorGestion}`
    return this.http.post(postIndicadorGestion , indicadoresRecintos, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  public putIndicadorRecintos(indicadoresGestionData: IndicadorGestionI) {
    const putIndicadorGestion = `${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`
    return this.http.put(putIndicadorGestion, indicadoresGestionData, this.header)
      .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  /// Tipo de alcance
  public getAlcance() {
    const getAlcance = `${this.baseURL}/TiposAlcances`
    return this.http.get(getAlcance, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }

  //Frecuencia
  public getFrecuencia() {
    const getFrecuencia = `${this.baseURL}/Frecuencias`
    return this.http.get(getFrecuencia, this.header)
    .pipe(catchError((error) => { alertServerDown(); return throwError(error)}))
  }
}
