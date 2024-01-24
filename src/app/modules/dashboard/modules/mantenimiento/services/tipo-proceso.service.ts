import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
  providedIn: 'root'
})

export class TipoProcesosService {

  token?: string = this.userSystemService.getToken 
  baseURL: string = this.userSystemService.getURL
  idSistema: number = this.userSystemService.getSistema

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  header = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private userSystemService: UserSystemInformationService,
  ) { }

  public getTipoProcesos() {
    return this.http.get(`${this.baseURL}/Configuraciones/tipos-de-procesos`, this.header)
      .pipe(catchError((error) => { alertServerDown(); return error }))
  }
}
