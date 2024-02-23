import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntaI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class preguntasFrecuentesService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token})
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ){}

  public getPreguntasFrecuentes() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/PreguntasFrecuentes`, this.header))
  }

  public postPreguntasFrecuentes(preguntaData: PreguntaI) {
    return this.helperHandler.handleRequest(() => this.http.post(`${this.baseURL}/PreguntasFrecuentes`, preguntaData, this.header))
  }

  public putPreguntasFrecuentes(preguntaData: PreguntaI) {
    return this.helperHandler.handleRequest(() => this.http.put(`${this.baseURL}/PreguntasFrecuentes/${preguntaData.id}`, preguntaData, this.header))
  }

  public removePreguntasFrecuentes(id: number) {
    return this.helperHandler.handleRequest(() => this.http.delete(`${this.baseURL}/PreguntasFrecuentes/${id}`, this.header))
  }

}
