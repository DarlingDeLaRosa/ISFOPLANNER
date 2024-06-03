import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({ providedIn: 'root' })

export class ResultadoEfectoService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  getResultadoEfecto(page:  number = 1): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/ResultadosEfectos?CurrentPage=${page}&PageSize=10`, this.header))
  }

  postResultadoEfecto(retultadoEfecto: ResultadoEfectoI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/ResultadosEfectos`, retultadoEfecto, this.header))
  }

  deleteResultadoEfecto(id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.delete<ResponseI>(`${this.baseUrl}/ResultadosEfectos/${id}`, this.header))
  }

  updateResultadoEfecto(retultadoEfecto: ResultadoEfectoI, id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.put<ResponseI>(`${this.baseUrl}/ResultadosEfectos/${id}`, retultadoEfecto, this.header))
  }
}
