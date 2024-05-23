import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  public getUnidadesOrganizativas(unidadOrganizativa: string = '', unidadPadre: boolean = false, unidadResp:boolean = false) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/UnidadesOrganizativas?unidadOrganizativa=${unidadOrganizativa}&unidadPadre=${unidadPadre}&unidadResponsable=${unidadResp}`, this.header))
  }

  public getUnidadesOrganizativasPeritos() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/UnidadesOrganizativas/peritos`, this.header))
  }

  public getUnidadesOrganizativasRecintos() {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/UnidadesOrganizativas/recintos`, this.header))
  }

  public getUnidadesOrganizativasRecintosById(id: number) {
    return this.helperHandler.handleRequest(() => this.http.get(`${this.baseURL}/UnidadesOrganizativas/recintos/${id}`, this.header))
  }
}
