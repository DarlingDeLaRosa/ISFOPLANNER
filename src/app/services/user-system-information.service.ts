import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/Response.interfaces';

@Injectable({
    providedIn: 'root'
})

export class UserSystemInformationService {

    private userLogged?: UserI
    private userToken!: string
    private sistema: number = 2

    private URLremoteDesarrollo = "http://isfoplaner.somee.com"
    private URLdesarrollo = "http://172.25.4.24:3000"
    private URLgeneralServerURL = "http://172.25.4.24"

    constructor() { }

    get getUserLogged(): UserI | undefined { return this.userLogged }
    get getToken(): string { return this.userToken }
    get getSistema(): number { return this.sistema }
    get getURL(): string { return this.URLdesarrollo }
    get getURLgeneralService(): string { return this.URLgeneralServerURL }

    set setUserLogged(user: UserI | undefined) { this.userLogged = user }
    set setUserToken(token: string ) { this.userToken = token };

    saveDataLocalStorage(key: string, data: any): void {
        const authUserData = JSON.stringify(data);
        localStorage.setItem(key, authUserData);
    }

    getDataLocalStorage(key: string): any {
        const authUserData = localStorage.getItem(key);
        if (authUserData !== null) return JSON.parse(authUserData);
    }
}