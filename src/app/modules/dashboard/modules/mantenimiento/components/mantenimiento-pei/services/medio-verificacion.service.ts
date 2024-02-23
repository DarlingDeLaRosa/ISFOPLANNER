import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable()
export class MedioVerificacionService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token})
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  getMedioVerificacion(): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/MediosVerificacione`, this.header))
  }

  postMedioVerificacion(medioVerificacion: MedioVerificacionI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/MediosVerificacione`, medioVerificacion, this.header))
  }

  DeleteMedioVerificacion(id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.delete<ResponseI>(`${this.baseUrl}/MediosVerificacione/${id}`, this.header))
  }

  updateMedioVerificacion(medioVerificacion: MedioVerificacionI, id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.put<ResponseI>(`${this.baseUrl}/MediosVerificacione/${id}`, medioVerificacion, this.header))
  }
}
