import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { ConfiguracionPeriodoServive } from '../../services/configuracion-periodos.service';
import { TipoProcesosService } from '../../services/tipo-proceso.service';
import { format } from 'date-fns';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';


@Component({
  selector: 'app-configuracion-periodos',
  templateUrl: './configuracion-periodos.component.html',
  styleUrls: ['./configuracion-periodos.component.css']
})
export class ConfiguracionPeriodosComponent implements OnInit {

  periodosConfigForm: FormGroup;
  periodosConfig: any[] = []
  tipoProcesos: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiTipoProceso: TipoProcesosService,
    private apiPeriodosConfig: ConfiguracionPeriodoServive,
    private responseHandler: ResponsesHandlerService
  ) {
    this.periodosConfigForm = this.fb.group({
      id: 0,
      idTipoProceso: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      prorroga: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getProceso()
    this.getPeriodoConfig()
  }

  getProceso() {
    this.apiTipoProceso.getTipoProcesos()
      .subscribe((res: any) => { this.tipoProcesos = res.data })
  }

  getPeriodoConfig() {
    this.apiPeriodosConfig.getPeriodoConfig()
      .subscribe((res: any) => { this.periodosConfig = res.data })
  }

  postPeriodoConfig() {
    this.apiPeriodosConfig.postPeriodoConfig(this.periodosConfigForm.value)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getPeriodoConfig(), this.periodosConfigForm) })
  }

  putPeriodoConfig() {
    this.apiPeriodosConfig.putPeriodoConfig(this.periodosConfigForm.value)
    .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getPeriodoConfig(), this.periodosConfigForm) })
  }

  // async deleteEstructuraPro(id: number) {
  //   let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

  //   if (removeDecision) {
  //     this.apiPeriodosConfig.remgetEstructuraPro(id)
  //       .pipe(
  //         catchError((error) => {
  //           alertServerDown()
  //           return error
  //         })
  //       )
  //       .subscribe((res: any) => {
  //         console.log(res);

  //         if (res.ok) {

  //           alertRemoveSuccess()
  //           this.getEstructuraPro()

  //         } else {
  //           errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
  //         }
  //       })
  //   }
  // }

  setValueEditEstructuraPro(estructuraPro: any) {
    this.periodosConfigForm.reset(estructuraPro)
    this.periodosConfigForm.patchValue({ idTipoProceso: estructuraPro.tipoProceso.id})
  }

  saveChangesButton() {
    this.periodosConfigForm.value.fechaInicio = format(this.periodosConfigForm.value.fechaInicio, 'yyyy-MM-dd');
    this.periodosConfigForm.value.fechaFin = format(this.periodosConfigForm.value.fechaFin, 'yyyy-MM-dd');
    if (this.periodosConfigForm.value.prorroga != '') this.periodosConfigForm.value.prorroga = format(this.periodosConfigForm.value.prorroga, 'yyyy-MM-dd');
    
    if (this.periodosConfigForm.valid) {

      if (this.periodosConfigForm.value.id > 0) this.putPeriodoConfig()
      else this.postPeriodoConfig()

    } else alertNoValidForm()
  }
}
