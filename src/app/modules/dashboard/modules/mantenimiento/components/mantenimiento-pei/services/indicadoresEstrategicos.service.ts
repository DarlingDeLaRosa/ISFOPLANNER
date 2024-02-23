import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({ providedIn: 'root' })

export class IndicadorEstrategicoService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  getIndicadoresEstrategicos(): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos`, this.header))
  }

  postIndicadoresEstrategicos(indicadoresestrategicos: IndicadoresEstrategicosI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos`, indicadoresestrategicos, this.header))
  }

  deleteIndicadoresEstrategicos(id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.delete<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/${id}`, this.header))
  }

  putIndicadoresEstrategicos(indicadoresestrategicos: IndicadoresEstrategicosI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.put<ResponseI>(`${this.baseUrl}/IndicadoresEstrategicos/${indicadoresestrategicos.id}`, indicadoresestrategicos, this.header))
  }
}
