import { Injectable } from '@angular/core';
import { alertIsSuccess, alertNoValidForm, alertServerDown, errorMessageAlert, infoMessageAlert, loading, warningMessageAlert } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { indicadorMetaRecintosGet } from '../modules/dashboard/modules/formulacion/interfaces/formulacion.interface';

@Injectable({
    providedIn: 'root'
})

export class HelperService {
    
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
        let unitRes = recintosResponsablesUnits.some((unidad: indicadorMetaRecintosGet ) => { unit == unidad.responsable.nombre })
        return unitRes
    }  


    // indicadorMetaRecinto(recinto: string, indicadorRecintos: indicadorRecinto): number {
    //     switch (recinto) {
    //         case 'FEM':
    //             return indicadorRecintos.metaFem

    //         case 'LNNM':
    //             return indicadorRecintos.metaLnnm

    //         case 'REC':
    //             return indicadorRecintos.metaRec

    //         case 'JVM':
    //             return indicadorRecintos.metaJvm
 
    //         case 'UM':
    //             return indicadorRecintos.metaUm

    //         case 'EPH':
    //             return indicadorRecintos.metaEph

    //         case 'EMH':
    //             return indicadorRecintos.metaEmh

    //         default:
    //             return 0
    //     }
    // }
}