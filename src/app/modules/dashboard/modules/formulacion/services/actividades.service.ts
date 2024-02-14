
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { ActividadI } from '../interfaces/formulacion.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({providedIn: 'root'})
export class ActividadesService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    public http:HttpClient,
    private userSystemService: UserSystemInformationService,
    ){}

    getRegiones(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Regiones`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getProvincias(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Provincias`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getMunicipios(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Municipios`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getEstados(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Estados`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getFrecuencias(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Frecuencias`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getMeses(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Meses`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getCategoriasInsumo(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/CategoriasInsumos`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getUnidadesMedida(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/UnidadesDeMedida`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getInsumos(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Insumos`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    postActividades(actividad:ActividadI): Observable<ResponseI> {
      return this.http.post<ResponseI>(`${this.baseUrl}/Actividades`,actividad, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }

    getActividades(): Observable<ResponseI> {
      return this.http.get<ResponseI>(`${this.baseUrl}/Actividades`, this.header)
      .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }
}