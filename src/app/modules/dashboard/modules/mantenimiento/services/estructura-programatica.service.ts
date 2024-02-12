import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class EstructuraProgramaticaService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({'Authorization': this.token })
  header = {headers: this.headers}

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getEstructurasProgramaticas() {
    return this.http.get(`${this.baseURL}/EstructurasProgramaticas`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public postEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    return this.http.post(`${this.baseURL}/EstructurasProgramaticas` , estructuraProData, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public putEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    return this.http.put(`${this.baseURL}/EstructurasProgramaticas/${estructuraProData.id}`, estructuraProData, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }

  public removeEstructurasProgramaticas(id: number) {
    return this.http.delete(`${this.baseURL}/EstructurasProgramaticas/${id}`, this.header)
    .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
  }
}
