import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstructuraProgramaticaService } from '../../services/estructura-programatica.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';


@Component({
  selector: 'app-estructura-programatica',
  templateUrl: './estructura-programatica.component.html',
  styleUrls: ['./estructura-programatica.component.css']
})
export class EstructuraProgramaticaComponent implements OnInit {

  estructuraProgramaticaForm: FormGroup;
  estructurasProgramaticas: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiEstructuraPro: EstructuraProgramaticaService,
    private responseHandler: ResponsesHandlerService
  ) {
    this.estructuraProgramaticaForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getEstructuraPro()
  }

  getEstructuraPro() {
    this.apiEstructuraPro.getEstructurasProgramaticas()
      .subscribe((res: any) => { this.estructurasProgramaticas = res.data })
  }

  postEstructuraPro() {
    this.apiEstructuraPro.postEstructurasProgramaticas(this.estructuraProgramaticaForm.value)
    .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getEstructuraPro(), this.estructuraProgramaticaForm) })
  }

  putEstructuraPro() {
    this.apiEstructuraPro.putEstructurasProgramaticas(this.estructuraProgramaticaForm.value)
    .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getEstructuraPro(), this.estructuraProgramaticaForm) })
  }

  async deleteEstructuraPro(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

    if (removeDecision) {
      this.apiEstructuraPro.removeEstructurasProgramaticas(id)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getEstructuraPro(), this.estructuraProgramaticaForm) })
    }
  }

  setValueEditEstructuraPro(estructuraPro: any) {
    this.estructuraProgramaticaForm.reset(estructuraPro)
  }

  saveChangesButton() {
    if (this.estructuraProgramaticaForm.valid) {
      if (this.estructuraProgramaticaForm.value.id > 0) this.putEstructuraPro()
      else this.postEstructuraPro()
    } else {
      alertNoValidForm()
    }
  }

}
