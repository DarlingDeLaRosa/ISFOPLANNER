import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Injectable({
    providedIn: 'root'
})

export class modulosService {

    token: string = this.userSystemService.getToken
    idSistema: number = this.userSystemService.getSistema
    baseURL: string = this.userSystemService.getURLgeneralService

    headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
    header = { headers: this.headers }

    constructor(
        private http: HttpClient,
        private helperHandler: HelperService,
        private userSystemService: UserSystemInformationService,
    ) { }

    public getModulosByIdSistema() {
        return this.helperHandler.handleGeneralServiceRequest(() => this.http.get(`${this.baseURL}/Modulo/getbyidsistema/${this.idSistema}`, this.header))
    }
}
