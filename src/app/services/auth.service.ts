import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogInI } from '../interfaces/Response.interfaces';
import { UserSystemInformationService } from './user-system-information.service';
import { HelperService } from './appHelper.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    baseURL: string = this.userSystemService.getURLgeneralService

    constructor(
        private http: HttpClient,
        private helperHandler: HelperService,
        private userSystemService: UserSystemInformationService,
    ) { }

    public postLogIn(userData: UserLogInI) {
        return this.helperHandler.handleGeneralServiceRequest(()=> this.http.post(`${this.baseURL}/User/login`, userData))
    }
}