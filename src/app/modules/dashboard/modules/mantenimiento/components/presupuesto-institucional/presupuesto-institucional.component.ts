import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { alertNoValidForm } from 'src/app/alerts/alerts';
import { format } from 'date-fns';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';
import { PresupuestoInstiGetI } from '../../interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-presupuesto-institucional',
  templateUrl: './presupuesto-institucional.component.html',
  styleUrls: ['./presupuesto-institucional.component.css']
})
export class PresupuestoInstitucionalComponent implements OnInit {

  presupuestoInstiForm: FormGroup;
  presupuestosInst: PresupuestoInstiGetI[] = []

  constructor(
    public fb: FormBuilder,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
    private responseHandler: ResponsesHandlerService
  ) {
    this.presupuestoInstiForm = this.fb.group({
      id: 0,
      montoTotal: new FormControl('', Validators.required),
      justicarModificacion: new FormControl(''),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(false)
      .subscribe((res: any) => { this.presupuestosInst = res.data; console.log(res)})
  }

  putUnidadOrganizativa() {
    this.apiPresupuestoInstitucional.putPresupuestoInstitucional(this.presupuestoInstiForm.value)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getPresupuestoInstitucional(), this.presupuestoInstiForm) })
  }

  postUnidadOrganizativa() {
    this.apiPresupuestoInstitucional.postPresupuestoInstitucional(this.presupuestoInstiForm.value)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getPresupuestoInstitucional(), this.presupuestoInstiForm) })
  }

  postActivarPresupuesto(presupuesto: PresupuestoInstiGetI) {
    this.apiPresupuestoInstitucional.postActivarPresupuesto(presupuesto.id)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getPresupuestoInstitucional(), this.presupuestoInstiForm) })
  }

  setValueEditPreInst(presupuestoInstiForm: any) {
    this.presupuestoInstiForm.reset(presupuestoInstiForm)
  }

  saveChangesButton() {
    this.presupuestoInstiForm.value.fechaInicio = format(this.presupuestoInstiForm.value.fechaInicio, 'yyyy-MM-dd');
    this.presupuestoInstiForm.value.fechaFin = format(this.presupuestoInstiForm.value.fechaFin, 'yyyy-MM-dd');

    if (this.presupuestoInstiForm.valid) {
      if (this.presupuestoInstiForm.value.id > 0) this.putUnidadOrganizativa()
      else this.postUnidadOrganizativa()
    } else alertNoValidForm()
  }
}
