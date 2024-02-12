import { Component, OnInit } from '@angular/core';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { alertNoValidForm, alertRemoveSure} from 'src/app/alerts/alerts';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';

@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './supuestos-riesgos.component.html',
  styleUrls: ['./supuestos-riesgos.component.css']
})
export class SupuestosRiegosComponent implements OnInit {

  supuestosRiesgos: Array<SupuestosRiesgosI> = [];
  supuestoRiesgoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private supuestosRiesgosService: SupuestosRiesgosService,
    private responseHandler: ResponsesHandlerService
  ) {
    this.supuestoRiesgoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllSupuestosRiesgos();
  }

  getAllSupuestosRiesgos() {
    this.supuestosRiesgosService.getSupuestosRiesgos()
      .subscribe((resp: any) => { this.supuestosRiesgos = resp.data; console.log(this.supuestosRiesgos);
       })
  }

  postSupuestoRiesgo() {
    this.supuestosRiesgosService.postSupuestosRiesgos(this.supuestoRiesgoForm.value)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getAllSupuestosRiesgos(), this.supuestoRiesgoForm) })
  }

  putSupuestoRiesgo() {
    this.supuestosRiesgosService.putSupuestosRiesgos(this.supuestoRiesgoForm.value)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getAllSupuestosRiesgos(), this.supuestoRiesgoForm) })
  }

  async deleteSupuestoRiesgo(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el material de apoyo.")

    if (removeDecision) {
      this.supuestosRiesgosService.deleteSupuestiRiesgos(id)
        .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getAllSupuestosRiesgos(), this.supuestoRiesgoForm) })
    }
  }

  setValueEditSupuestoRiesgo(supuestoRiesgo: SupuestosRiesgosI) {
    this.supuestoRiesgoForm.reset(supuestoRiesgo)
  }

  saveChangesButton() {
    if (this.supuestoRiesgoForm.valid) {
      if (this.supuestoRiesgoForm.value.id > 0) this.putSupuestoRiesgo()
      else this.postSupuestoRiesgo()
    } else {
      alertNoValidForm()
    }
  }
}
