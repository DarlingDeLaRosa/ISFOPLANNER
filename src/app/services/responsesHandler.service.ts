import { Injectable } from '@angular/core';
import { alertIsSuccess } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ResponsesHandlerService {

    constructor() { }

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
}