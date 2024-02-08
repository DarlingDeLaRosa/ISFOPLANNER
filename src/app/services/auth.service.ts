import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UserLogInI } from '../interfaces/Response.interfaces';
import { UserSystemInformationService } from './user-system-information.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    baseURL: string = this.userSystemService.getURLgeneralService
     
    constructor(
        private http: HttpClient,
        private userSystemService: UserSystemInformationService,    
    ){}

    public postLogIn(userData: UserLogInI) {
        return this.http.post(`${this.baseURL}/User/login`, userData)
            .pipe(catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }))
    }
}