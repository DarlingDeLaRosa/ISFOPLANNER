import { Injectable } from '@angular/core';
import { UnidadDataI, UserI } from '../interfaces/Response.interfaces';

@Injectable({ providedIn: 'root' })

export class UserSystemInformationService {

    private userLogged!: UserI
    private userToken!: string
    private sistema: number = 2
    private niveles: { [key: string]: number } = {
        "VICERRECTORIA": 4,
        "DIRECCION": 3,
        "DEPARTAMENTO": 2,
        "DIVISION": 1
    };

    private URLremoteDesarrollo = "http://isfoplaner.somee.com"
    private URLdesarrollo = "http://172.25.4.24:3000"
    private URLgeneralServerURL = "http://172.25.4.24"

    constructor() { }

    get getUserLogged(): UserI { return this.userLogged }
    get getToken(): string { return this.userToken }
    get getSistema(): number { return this.sistema }
    get getURL(): string { return this.URLdesarrollo }
    get getURLgeneralService(): string { return this.URLgeneralServerURL }
    get isUnidadOrgFather(): UnidadDataI {
        let userLevel;
        let exactUnit: string = this.userLogged.unidad.split(" ")[0]

        userLevel = exactUnit in this.niveles ? this.niveles[exactUnit] : 0;
        let dataUnidad: UnidadDataI = { userLevel, unidad: this.userLogged.unidad, subUnidad: false }

        switch (userLevel) {
            case 2:
                dataUnidad.subUnidad = !!this.userLogged.departamento.divisiones
                break;
            case 3:
                dataUnidad.subUnidad = !!this.userLogged.direccion.departamentos
                break;

            case 4:
                dataUnidad.subUnidad = !!this.userLogged.viceRectoria.direcciones
                break;

            default:
                break;
        }

        return dataUnidad
    }

    set setUserLogged(user: UserI) { this.userLogged = user }

    set setUserToken(token: string) {
        let tokenT: string = token.replace(/^"(.*)"$/, '$1');
        this.userToken = `Bearer ${tokenT}`
    };

    saveDataLocalStorage(key: string, data: any): void {
        const authUserData = JSON.stringify(data);
        localStorage.setItem(key, authUserData);
    }

    getDataLocalStorage(key: string): any {
        const authUserData = localStorage.getItem(key);
        if (authUserData !== null) return JSON.parse(authUserData);
    }
}