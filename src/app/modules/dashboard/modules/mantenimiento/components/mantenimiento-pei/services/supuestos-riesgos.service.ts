import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({ providedIn: 'root' })

export class SupuestosRiesgosService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  getSupuestosRiesgos(page: number = 1): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/SupuestosRiesgos?CurrentPage=${page}&PageSize=10`, this.header))
  }

  postSupuestosRiesgos(supuestosriesgos: SupuestosRiesgosI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/SupuestosRiesgos`, supuestosriesgos, this.header))
  }

  putSupuestosRiesgos(supuestosriesgos: SupuestosRiesgosI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.put<ResponseI>(`${this.baseUrl}/SupuestosRiesgos/${supuestosriesgos.id}`, supuestosriesgos, this.header))
  }

  deleteSupuestiRiesgos(id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.delete<ResponseI>(`${this.baseUrl}/SupuestosRiesgos/${id}`, this.header))
  }
}
