
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { ActividadI } from '../interfaces/formulacion.interface';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({providedIn: 'root'})
export class ActividadesService {

  private token = this.userSystemService.getToken
  private baseUrl = this.userSystemService.getURL

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
  header = { headers: this.headers }

  constructor(
    public http:HttpClient,
    private helperHandler: HelperService,
    private userSystemService: UserSystemInformationService,
    ){}

    getRegiones(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Regiones`, this.header))
    }

    getCargos(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Cargos`, this.header))
    }

    getProvincias(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Provincias`, this.header))
    }

    getMunicipios(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Municipios`, this.header))
    }

    getEstados(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Estados`, this.header))
    }

    getFrecuencias(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Frecuencias`, this.header))
    }

    getMeses(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Meses`, this.header))
    }

    getCategoriasInsumo(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/CategoriasInsumos`, this.header))
    }

    getUnidadesMedida(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/UnidadesDeMedida`, this.header))
    }

    getInsumos(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Insumos`, this.header))
    }

    postActividades(actividad:ActividadI): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.post<ResponseI>(`${this.baseUrl}/Actividades`,actividad, this.header))
    }

    getActividades(): Observable<ResponseI> {
      return this.helperHandler.handleRequest(() => this.http.get<ResponseI>(`${this.baseUrl}/Actividades`, this.header))
    }
}
