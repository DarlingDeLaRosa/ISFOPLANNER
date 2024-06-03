import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { EjesI } from '../interfaces/ejes.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({ providedIn: 'root' })

export class EjesService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  getEjes(page:  number = 1): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/EjesEstrategicos?CurrentPage=${page}&PageSize=10`, this.header))
  }
  postEjes(eje: EjesI): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/EjesEstrategicos`, eje, this.header))
  }

  DeleteEjes(id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.delete<ResponseI>(`${this.baseUrl}/EjesEstrategicos/${id}`, this.header))
  }

  updateEjes(eje: EjesI, id: number): Observable<ResponseI> {
    return this.helperHandler.handleRequest(() => this.http.put<ResponseI>(`${this.baseUrl}/EjesEstrategicos/${id}`, eje, this.header))
  }
}
