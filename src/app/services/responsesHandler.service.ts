import { Injectable } from '@angular/core';
import { alertIsSuccess } from '../alerts/alerts';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ResponsesHandlerService {

    constructor() { }

    handleResponse(response: any, onSuccess: () => void,  formToReset?: FormGroup) {
        if (response.ok) {
            alertIsSuccess(true);
            onSuccess();
            formToReset?.reset();
        } else {
            alertIsSuccess(false);
        }
    }
}