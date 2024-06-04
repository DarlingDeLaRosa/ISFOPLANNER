import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { UserI } from '../interfaces/Response.interfaces';
import { UserSystemInformationService } from './user-system-information.service';
import { ActividadI, indicadorMetaRecintosGet } from '../modules/dashboard/modules/formulacion/interfaces/formulacion.interface';
import { alertIsSuccess, alertNoValidForm, alertServerDown, errorMessageAlert, infoMessageAlert, loading, warningMessageAlert } from '../alerts/alerts';
import { subUnidadI } from '../modules/dashboard/modules/mantenimiento/interfaces/mantenimientoPOA.interface';

@Injectable({
    providedIn: 'root'
})

export class HelperService {
    
    constructor(private userSystemService: UserSystemInformationService) {}
    userLogged: UserI = this.userSystemService.getUserLogged;

    //Manejar las respuestas del servidor

    handleResponse(response: any, onSuccess: () => void, formToReset?: FormGroup, onSecondSuccess?: () => void) {
        if (response.ok) {
            loading(false)
            alertIsSuccess(true);
            onSuccess();
            formToReset?.reset();
            if (onSecondSuccess != undefined) onSecondSuccess();
        } else {
            loading(false)
            alertIsSuccess(false);
        }
    }

    handleResponseGeneralServer(response: any, onSuccess: () => void, formToReset?: FormGroup, onSecondSuccess?: () => void) {
        if (response.status) {
            loading(false)
            alertIsSuccess(true);
            onSuccess();
            formToReset?.reset();
            if (onSecondSuccess != undefined) onSecondSuccess();
        } else {
            loading(false)
            alertIsSuccess(false);
        }
    }
    
    //Manejar la peticion y los errores

    handleRequest<T>(request: () => Observable<T>): Observable<T> {
        return request().pipe(
            catchError((error) => { loading(false); error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }),
        );
    }

    handleGeneralServiceRequest<T>(request: () => Observable<T>): Observable<T> {
        return request().pipe(
            catchError((error) => { loading(false); error.error.message ? errorMessageAlert(error.error.message) : alertServerDown(); return throwError(error) }),
        );
    }

    // Funcion para disparar las funciones de crear o editar 

    saveChanges(updateFunction: () => void, form: FormGroup, saveFunction: () => void) {
        if (form.valid) {
            loading(true)
            if (form.value.id > 0) updateFunction()
            else saveFunction()
        } else alertNoValidForm()
    }

    saveChangesIndicadores(updateFunction: () => void, form: FormGroup, saveFunction: () => void, lineaBase: number, meta: number) {
        if (form.valid) {
            if (lineaBase <= meta) {
                loading(true)
                if (form.value.id > 0) updateFunction()
                else saveFunction()
            } else infoMessageAlert(`Linea base no debe ser mayor a la meta (${meta})`)
        } else alertNoValidForm()
    }

    saveChangesSumValidation(updateFunction: () => void, form: FormGroup, saveFunction: () => void, meta: number, entidadSumar: any, alcance: number) {
        let noRec = 0
        if (form.valid) {
            if (alcance == 1) noRec = entidadSumar.REC
            if (meta == this.sumTotal(entidadSumar) - noRec) {
                loading(true)
                if (form.value.id > 0) updateFunction()
                else saveFunction()
            } else { warningMessageAlert(`La suma de los indicadores por recinto debe ser igual a la meta (<b>${meta}</b>).`) }
        } else alertNoValidForm()
    }

    saveChangesFlujoValidation(updateFunction: () => void, form: FormGroup, saveFunction: () => void, meta: number, entidadSame: any, message: string) {
        if (form.valid) {
            if (this.sameGoal(entidadSame, meta)) {
                loading(true)
                if (form.value.id > 0) updateFunction()
                else saveFunction()
            } else { warningMessageAlert(message) }
        } else alertNoValidForm()
    }

    // Validaciones para indicadores 

    //valida la suma total del objeto que se le envie
    sumTotal(objetoSuma: any): number {
        let suma = 0;
        Object.keys(objetoSuma).forEach(key => {
            if (!key.includes('id') && !isNaN(objetoSuma[key])) { suma += parseFloat(objetoSuma[key]); }
        });
        return suma;
    }

    //Valida que la meta exista al menos una vez
    
    sameGoal(objetSame: any, valor: number): boolean {
        let found: boolean = false; // Variable para indicar si se encontró al menos una vez el valor de la meta
        for (const key in objetSame) {
            if (objetSame.hasOwnProperty(key) && !key.includes('id')) {
                if (objetSame[key] === valor) {
                    found = true; // Si se encuentra el valor de la meta, cambia el estado de 'found' a true
                    break; // Termina la iteración, ya que se encontró el valor de la meta al menos una vez
                }
            }
        }
        return found;
    }

    sameLastGoal(metaT4: number = 0 , valor: number): boolean {
        if(metaT4 == valor) return true
        else return false
    }

    //Valida que la suma de un objeto sea igual a la suma de un objeto 
    validationGoal(meta: number, sumaTotal: number): boolean { return meta === sumaTotal && meta > 0 ? true : false; }

    //Valida que la unidad este dentro del array de responsables de los diferentes recintos
    validationResRecintos(unit: string, recintosResponsablesUnits: indicadorMetaRecintosGet[]): boolean {
        let unitRes = recintosResponsablesUnits.some((unidad: indicadorMetaRecintosGet ) => { return unit == unidad.responsable.nombre })
        return unitRes
    }  

    // Retorna el objeto del recinto especifico 

    getExactMetaRecinto(metasRecintos: indicadorMetaRecintosGet[]) : { metaRecinto: indicadorMetaRecintosGet | undefined, siglas: string | undefined} {
        let recintoSiglas  
        let metaActLogrosEsperado

        metaActLogrosEsperado = metasRecintos.find((logroEsperadoRecinto: indicadorMetaRecintosGet)=>{
            recintoSiglas = logroEsperadoRecinto.responsable.nombre.split(' ').pop()
            
            if (recintoSiglas == undefined) return
            if (recintoSiglas == this.userLogged.recinto.siglas) return logroEsperadoRecinto
            if (recintoSiglas.length > 4 && this.userLogged.recinto.siglas == 'REC'){
                recintoSiglas = 'REC'
                return logroEsperadoRecinto
            }
            return
        })

        return { metaRecinto: metaActLogrosEsperado, siglas: recintoSiglas}
    }

    // Retorna el array de arrays de actividades de diferentes recintos 

    getDiferentMetaRecinto(metasRecintos: indicadorMetaRecintosGet[]): {actividades: ActividadI[], sigla: string, montos: {mte: number, mtte: number}}[] {
        let actividadesRecintos: {actividades: ActividadI[], sigla: string, montos: {mte: number, mtte: number}}[] = []
        let sigla: string | undefined

        metasRecintos.filter((metaRec: indicadorMetaRecintosGet)=>{ 
            sigla = metaRec.responsable.nombre.split(' ').pop()
            if (sigla == undefined) return
            if (sigla.length > 4) sigla = 'REC'
            
            actividadesRecintos.push( {actividades: metaRec.actividades, sigla, montos: {mte: metaRec.montoTotalActividades, mtte: metaRec.montoTotalActividadesTransversales}}) 
        })

       return actividadesRecintos
    }

    // Busca dentro del array de recinto

    findUnitOrgRec(unit: string, unitArrayRec: subUnidadI[]): boolean{
        if( unitArrayRec.length == 0) return false       
        
        let unitRes = unitArrayRec.some((unidad: subUnidadI ) => { return unit == unidad.nombre })
        return unitRes
    }
}