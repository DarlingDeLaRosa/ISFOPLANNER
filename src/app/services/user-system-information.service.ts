import { EventEmitter, Injectable, inject } from '@angular/core';
import { UnidadDataI, UserI, subUnit } from '../interfaces/Response.interfaces';
import { periodoConfig } from '../modules/dashboard/modules/mantenimiento/interfaces/mantenimientoPOA.interface';

@Injectable({ providedIn: 'root' })

export class UserSystemInformationService {

    unitChange = new EventEmitter<any>();
    private userLogged!: UserI
    private userToken!: string
    // private sistema: number = 30
    //dearrollo
    private sistema: number = 80
    private exatUnitOrg!: subUnit
    private niveles: { [key: string]: number } = {
        "VICERRECTORIA": 4,
        "DIRECCION": 3,
        "DEPARTAMENTO": 2,
        "DIVISION": 1
    };
    private peridoMonitoreo!: periodoConfig
    private peridoFormulacion!: periodoConfig
    private dataUnidad!: UnidadDataI 

    // public modulosSis = {
    //     panel_de_control: 32,
    //     formulacion: 33,
    //     monitoreo: 34,
    //     planes_transversales: 35,
    //     material_de_apoyo: 36,
    //     ayuda: 37,
    //     mantenimiento: 38,
    //     asignacion_de_presupuesto: 39
    // }

    //desarrollo
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


    // private URLremoteDesarrollo = "http://isfoplaner.somee.com"
    private URLdesarrollo = "http://172.25.0.12:5002/api"
    private URLProduccion = "https://isfoplanner.isfodosu.edu.do/api"
    private URLgeneralServerURL = "http://172.25.4.24"
    private URLgeneralServer12 = 'http://172.25.0.12:3003'
    private URLgeneralServerProduccion = 'https://intranet.isfodosu.edu.do/api'

    constructor() {}

    get getUserLogged(): UserI { return this.userLogged }
    get getToken(): string { return this.userToken }
    get getSistema(): number { return this.sistema }
    // get getURL(): string { return this.URLProduccion }
    //desarrollo
    get getURL(): string { return this.URLdesarrollo }
    // get getURLgeneralService(): string { return this.URLgeneralServerProduccion }
    //desarrollo
    get getURLgeneralService(): string { return this.URLgeneralServer12 }
    
    get isUnidadOrgFather(): UnidadDataI {
        let userLevel;
        let exactUnit: string = this.userLogged.unidad.split(" ")[0]

        userLevel = exactUnit in this.niveles ? this.niveles[exactUnit] : 0;
        this.dataUnidad = { userLevel, unidad: this.userLogged.unidad, subUnidad: []}

        switch (userLevel) {
            case 2:
                this.exatUnitOrg = { id: this.userLogged.departamento.idDepartamento, nombre: this.userLogged.departamento.nombre }
                this.dataUnidad.subUnidad = this.userLogged.departamento.divisiones
                if (!this.dataUnidad.subUnidad.some((subUnit: subUnit) => {return subUnit.nombre == this.exatUnitOrg.nombre })) this.dataUnidad.subUnidad.push(this.exatUnitOrg)
                
                break;
            case 3:
                this.exatUnitOrg = { id: this.userLogged.direccion.idDireccion, nombre: this.userLogged.direccion.nombre }
                this.dataUnidad.subUnidad = this.userLogged.direccion.departamentos
                if (!this.dataUnidad.subUnidad.some((subUnit: subUnit) => {return subUnit.nombre == this.exatUnitOrg.nombre })) this.dataUnidad.subUnidad.push(this.exatUnitOrg)

                break;

            case 4:
                this.exatUnitOrg = { id: this.userLogged.viceRectoria.idViceRectoria, nombre: this.userLogged.viceRectoria.nombre}
                this.dataUnidad.subUnidad = this.userLogged.viceRectoria.direcciones
                if (!this.dataUnidad.subUnidad.some((subUnit: subUnit) => {return subUnit.nombre == this.exatUnitOrg.nombre })) this.dataUnidad.subUnidad.push(this.exatUnitOrg)

                break;

            default:
                break;
        }
        return this.dataUnidad
    }

    get getUnitOrg(): subUnit { 
        let unitData = localStorage.getItem('unidadOrganizativa') 
        
        if ( unitData == null) { return this.exatUnitOrg }
        else{ this.exatUnitOrg = JSON.parse(unitData); return this.exatUnitOrg }
    }

    get getPeriod(): {formulacion: periodoConfig, monitoreo: periodoConfig}{
        return {formulacion: this.peridoFormulacion, monitoreo: this.peridoMonitoreo }
    }

    set addUnitsToSubUnits(subUnits: subUnit[]){ this.dataUnidad.subUnidad.push(...subUnits)}
    set setUserLogged(user: UserI) { this.userLogged = user }

    set setUnitOrg(unit: subUnit ) { 
        this.exatUnitOrg = unit
        this.saveDataLocalStorage('unidadOrganizativa', unit)
    }

    set setUserToken(token: string) {
        let tokenT: string = token.replace(/^"(.*)"$/, '$1');
        this.userToken = `Bearer ${tokenT}`
    };

    set setConfigPeriodFormulacion(periodFormulacion: periodoConfig){
        // this.saveDataLocalStorage('periodoFor', periodFormulacion)
        this.peridoFormulacion = periodFormulacion 
    }
    
    set setConfigPeriodMonitoreo(periodMonitoreo: periodoConfig){
        // this.saveDataLocalStorage('periodoMon', periodMonitoreo)
        this.peridoMonitoreo =  periodMonitoreo
    }

    saveDataLocalStorage(key: string, data: any): void {
        const authUserData = JSON.stringify(data);
        localStorage.setItem(key, authUserData);
    }

    getDataLocalStorage(key: string): any {
        const authUserData = localStorage.getItem(key);
        if (authUserData !== null) return JSON.parse(authUserData);
    }
}