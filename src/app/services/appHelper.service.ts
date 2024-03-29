import { Injectable } from '@angular/core';
import { alertIsSuccess, alertNoValidForm, alertServerDown, errorMessageAlert, loading, warningMessageAlert } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { indicadorRecinto } from '../modules/dashboard/modules/formulacion/interfaces/formulacion.interface';

@Injectable({
    providedIn: 'root'
})

export class HelperService {

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

    saveChanges(updateFunction: () => void, form: FormGroup, saveFunction: () => void) {
        if (form.valid) {
            loading(true)
            if (form.value.id > 0) updateFunction()
            else saveFunction()
        } else alertNoValidForm()
    }

    saveChangesSumValidation(updateFunction: () => void, form: FormGroup, saveFunction: () => void, meta: number, entidadSumar: any, alcance: number) {
        let noRec = 0
        if (form.valid) {
            if(alcance == 1) noRec = entidadSumar.metaRec
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

    sumTotal(objetoSuma: any): number {
        let suma = 0;
        Object.keys(objetoSuma).forEach(key => {
            if (!key.includes('id') && !isNaN(objetoSuma[key])) { suma += parseFloat(objetoSuma[key]); }
        });
        return suma;
    }

    sameGoal(objetoSame: any,  valor: number): boolean {
        for (const key in objetoSame) {
            if (objetoSame.hasOwnProperty(key) && !key.includes('id')) {
                if (objetoSame[key] !== valor && objetoSame[key] !== 0) {
                    return false; // Si algún valor no es igual a la variable y tampoco es 0, retorna false
                }
            }
        }
        return true; // Si todos los valores son iguales a la variable y ninguno es 0, retorna true
    }

    validationGoal(meta: number, sumaTotal: number): boolean { return meta === sumaTotal ? true : false; }

    indicadorMetaRecinto(recinto: string, indicadorRecintos: indicadorRecinto): number {
        switch (recinto) {
            case 'FEM':
                return indicadorRecintos.metaFem

            case 'LNNM':
                return indicadorRecintos.metaLnnm

            case 'REC':
                return indicadorRecintos.metaRec

            case 'JVM':
                return indicadorRecintos.metaJvm

            case 'UM':
                return indicadorRecintos.metaUm

            case 'EPH':
                return indicadorRecintos.metaEph

            case 'EMH':
                return indicadorRecintos.metaEmh

            default:
                return 0
        }
    }
}