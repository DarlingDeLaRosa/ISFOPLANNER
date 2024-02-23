import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionPeriodoServive } from '../../services/configuracion-periodos.service';
import { TipoProcesosService } from '../../services/tipo-proceso.service';
import { format } from 'date-fns';
import { HelperService } from 'src/app/services/appHelper.service';

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
    private helperHandler: HelperService
  ) {
    this.periodosConfigForm = this.fb.group({
      id: 0,
      idTipoProceso: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      prorroga: new FormControl(null)
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
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPeriodoConfig(), this.periodosConfigForm) })
  }

  putPeriodoConfig() {
    this.apiPeriodosConfig.putPeriodoConfig(this.periodosConfigForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPeriodoConfig(), this.periodosConfigForm) })
  }

  setValueEditEstructuraPro(estructuraPro: any) {
    this.periodosConfigForm.reset(estructuraPro)
    this.periodosConfigForm.patchValue({ idTipoProceso: estructuraPro.tipoProceso.id})
  }

  saveChanges() {
    this.periodosConfigForm.value.fechaInicio = format(this.periodosConfigForm.value.fechaInicio, 'yyyy-MM-dd');
    this.periodosConfigForm.value.fechaFin = format(this.periodosConfigForm.value.fechaFin, 'yyyy-MM-dd');
    if (this.periodosConfigForm.value.prorroga != null) this.periodosConfigForm.value.prorroga = format(this.periodosConfigForm.value.prorroga, 'yyyy-MM-dd');

    this.helperHandler.saveChanges(() => this.putPeriodoConfig(), this.periodosConfigForm, () => this.postPeriodoConfig())
  }
}
