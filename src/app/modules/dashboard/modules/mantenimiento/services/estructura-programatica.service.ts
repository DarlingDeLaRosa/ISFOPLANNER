import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstructuraProgramaticaI } from '../interfaces/mantenimientoPOA.interface';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class EstructuraProgramaticaService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getEstructurasProgramaticas(page:number = 1, pageSize:number = 10) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/EstructurasProgramaticas?CurrentPage=${page}&PageSize=${pageSize}`, this.header))
  }

  public postEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/EstructurasProgramaticas`, estructuraProData, this.header))
  }

  public putEstructurasProgramaticas(estructuraProData: EstructuraProgramaticaI) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/EstructurasProgramaticas/${estructuraProData.id}`, estructuraProData, this.header))
  }

  public removeEstructurasProgramaticas(id: number) {
    return this.helperHandler.handleRequest(() => this.http.delete(`${this.baseURL}/EstructurasProgramaticas/${id}`, this.header))
  }
}
