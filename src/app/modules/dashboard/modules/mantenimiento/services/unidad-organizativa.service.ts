import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadOrgI } from '../interfaces/mantenimientoPOA.interface';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
  providedIn: 'root'
})

export class UnidadOrganizativaService {

  token: string = this.userSystemService.getToken
  baseURL: string = this.userSystemService.getURL
  idSistema: number = this.userSystemService.getSistema

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getUnidadesOrganizativas() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/UnidadesOrganizativas`, this.header))
  }
}
