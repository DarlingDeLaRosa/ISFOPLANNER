import { Injectable } from '@angular/core';
import { alertIsSuccess, alertNoValidForm, alertServerDown, errorMessageAlert, loading } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HelperService {

    constructor(
    ) { }

    handleResponse(response: any, onSuccess: () => void, formToReset?: FormGroup, onSecondSuccess?: () => void) {
        if (response.ok) {
            alertIsSuccess(true);
            onSuccess();
            formToReset?.reset();
            if (onSecondSuccess != undefined) onSecondSuccess();
        } else {
            alertIsSuccess(false);
        }
    }

    handleResponseGeneralServer(response: any, onSuccess: () => void, formToReset?: FormGroup, onSecondSuccess?: () => void) {
        if (response.status) {
            alertIsSuccess(true);
            onSuccess();
            formToReset?.reset();
            if (onSecondSuccess != undefined) onSecondSuccess();
        } else {
            alertIsSuccess(false);
        }
    }

    saveChanges(updateFunction: () => void, form: FormGroup, saveFunction: () => void) {
        if (form.valid) {
            if (form.value.id > 0) updateFunction()
            else saveFunction()
        } else alertNoValidForm()
    }

    handleRequest<T>(request: () => Observable<T>): Observable<T> {
        return request().pipe(
            catchError((error) => { error.error.detail ? errorMessageAlert(error.error.detail) : alertServerDown(); return throwError(error) }),
        );
    }

    handleGeneralServiceRequest<T>(request: () => Observable<T>): Observable<T> {
        return request().pipe(
            catchError((error) => { error.error.message ? errorMessageAlert(error.error.message) : alertServerDown(); return throwError(error) }),
        );
    }
}