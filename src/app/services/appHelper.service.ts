import { Injectable } from '@angular/core';
import { alertIsSuccess, alertNoValidForm, alertServerDown, errorMessageAlert, loading } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';

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
            catchError((error) => { loading(false);  error.error.message ? errorMessageAlert(error.error.message) : alertServerDown(); return throwError(error) }),
        );
    }

    saveChanges(updateFunction: () => void, form: FormGroup, saveFunction: () => void) {
        if (form.valid) {
            loading(true)
            if (form.value.id > 0) updateFunction()
            else saveFunction()
        } else alertNoValidForm()
    }
}