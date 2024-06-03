import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({ providedIn: 'root' })

export class EstrategiasService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  getEstrategias(page:  number = 1): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Estrategias?CurrentPage=${page}&PageSize=10`, this.header))
  }

  postEstrategias(estrategia: EstrategiaI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/Estrategias`, estrategia, this.header))
  }

  DeleteEstrategias(id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.delete<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, this.header))
  }

  updateEstrategias(estrategia: EstrategiaI, id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.put<ResponseI>(`${this.baseUrl}/Estrategias/${id}`, estrategia, this.header))
  }
}
