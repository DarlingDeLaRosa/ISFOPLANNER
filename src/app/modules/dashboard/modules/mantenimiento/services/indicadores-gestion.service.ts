import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndicadorGestionI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { indicadorRecinto } from '../../formulacion/interfaces/formulacion.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class IndicadorGestionService {

  token?: string = this.userSystemService.getToken 
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`})
  header = {headers: this.headers}

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
    ){}

  public getIndicadorGestion() {
    return this.http.get(`${this.baseURL}/IndicadoresGestion`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postIndicadorGestion(indicadoresGestionData: IndicadorGestionI | string) {
    return this.http.post(`${this.baseURL}/IndicadoresGestion` , indicadoresGestionData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putIndicadorGestion(indicadoresGestionData: IndicadorGestionI) {
    return this.http.put(`${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`, indicadoresGestionData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public removeIndicadorGestion(id: number) {
    return this.http.delete(`${this.baseURL}/IndicadoresGestion/${id}`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postIndicadorRecintos(idIndicadorGestion: number | undefined | null, indicadoresRecintos: indicadorRecinto) {
    return this.http.post(`${this.baseURL}/crear-indicador-recinto/${idIndicadorGestion}` , indicadoresRecintos, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putIndicadorRecintos(indicadoresGestionData: IndicadorGestionI) {
    return this.http.put(`${this.baseURL}/IndicadoresGestion/${indicadoresGestionData.id}`, indicadoresGestionData, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  /// Tipo de alcance
  public getAlcance() {
    return this.http.get( `${this.baseURL}/TiposAlcances`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  //Frecuencia
  public getFrecuencia() {
    return this.http.get(`${this.baseURL}/Frecuencias`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
