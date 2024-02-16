import { Injectable } from '@angular/core';
import { alertIsSuccess, alertNoValidForm } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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

    saveChanges(updateFunction: () => void, form: FormGroup, saveFunction: () => void) {
        if (form.valid) {
        
            if (form.value.id > 0) updateFunction()
            else saveFunction()
        
        } else alertNoValidForm()
    }
}