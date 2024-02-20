import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Injectable({
    providedIn: 'root'
})

export class modulosService {

    token: string = this.userSystemService.getToken
    baseURL: string = this.userSystemService.getURLgeneralService
    idSistema: number = this.userSystemService.getSistema

    headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })
    header = { headers: this.headers }

    constructor(
        private http: HttpClient,
        private userSystemService: UserSystemInformationService,
    ) { }

    public getModulosByIdSistema() {
        return this.http.get(`${this.baseURL}/Modulo/getbyidsistema/${this.idSistema}`, this.header)
            .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }
}
