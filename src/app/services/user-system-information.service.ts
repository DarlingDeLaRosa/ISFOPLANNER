import { EventEmitter, Injectable } from '@angular/core';
import { UnidadDataI, UserI, subUnit } from '../interfaces/Response.interfaces';

@Injectable({ providedIn: 'root' })

export class UserSystemInformationService {

    unitChange = new EventEmitter<any>();
    private userLogged!: UserI
    private userToken!: string
    private sistema: number = 80
    private exatUnitOrg!: subUnit
    private niveles: { [key: string]: number } = {
        "VICERRECTORIA": 4,
        "DIRECCION": 3,
        "DEPARTAMENTO": 2,
        "DIVISION": 1
    };

    public modulosSis = {
        panel_de_control: 49,
        formulacion: 50,
        monitoreo: 51,
        planes_transversales: 52,
        material_de_apoyo: 53,
        ayuda: 54,
        mantenimiento: 55,
        asignacion_de_presupuesto: 56
    }

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
        let dataUnidad: UnidadDataI = { userLevel, unidad: this.userLogged.unidad, subUnidad: []}

        switch (userLevel) {
            case 2:
                this.exatUnitOrg = { id: this.userLogged.departamento.idDepartamento, nombre: this.userLogged.departamento.nombre }
                dataUnidad.subUnidad = this.userLogged.departamento.divisiones
                dataUnidad.subUnidad.push(this.exatUnitOrg)
                break;
            case 3:
                this.exatUnitOrg = { id: this.userLogged.direccion.idDireccion, nombre: this.userLogged.direccion.nombre }
                dataUnidad.subUnidad = this.userLogged.direccion.departamentos
                dataUnidad.subUnidad.push(this.exatUnitOrg)
                break;

            case 4:
                this.exatUnitOrg = { id: this.userLogged.viceRectoria.idViceRectoria, nombre: this.userLogged.viceRectoria.nombre}
                dataUnidad.subUnidad = this.userLogged.viceRectoria.direcciones
                dataUnidad.subUnidad.push(this.exatUnitOrg)
                break;

            default:
                break;
        }

        return dataUnidad
    }

    get getUnitOrg(): subUnit { 
        let unitData = localStorage.getItem('unidadOrganizativa') 

        if ( unitData == null) { return this.exatUnitOrg }
        else{ this.exatUnitOrg = JSON.parse(unitData) ; return this.exatUnitOrg }
    }

    set setUserLogged(user: UserI) { this.userLogged = user }
    set setUnitOrg(unit: subUnit ) { 
        this.exatUnitOrg = unit
        this.saveDataLocalStorage('unidadOrganizativa', unit)
    }

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