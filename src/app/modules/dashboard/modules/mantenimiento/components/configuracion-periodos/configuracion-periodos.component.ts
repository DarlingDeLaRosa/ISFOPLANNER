import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionPeriodoServive } from '../../services/configuracion-periodos.service';
import { TipoProcesosService } from '../../services/tipo-proceso.service';
import { format } from 'date-fns';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { periodoConfig } from '../../interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-configuracion-periodos',
  templateUrl: './configuracion-periodos.component.html',
  styleUrls: ['./configuracion-periodos.component.css']
})

export class ConfiguracionPeriodosComponent implements OnInit {

  periodosConfigForm: FormGroup;
  periodosConfig!: periodoConfig[]
  tipoProcesos: any[] = []
  modulo = this.userSystemService.modulosSis

  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiTipoProceso: TipoProcesosService,
    private apiPeriodosConfig: ConfiguracionPeriodoServive,
    private userSystemService: UserSystemInformationService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {
    this.periodosConfigForm = this.fb.group({
      id: 0,
      idPresupuestoInstitucional: 0,
      prorroga: new FormControl(null),
      fechaFin: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      idTipoProceso: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getProceso()
    this.getPeriodoConfig()
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(true)
      .subscribe((res: any) => { if(res.data.length > 0) this.periodosConfigForm.patchValue({ idPresupuestoInstitucional: res.data[0].id })})
  }

  getProceso() {
    this.apiTipoProceso.getTipoProcesos()
      .subscribe((res: any) => { this.tipoProcesos = res.data })
  }

  getPeriodoConfig() {
    this.apiPeriodosConfig.getPeriodoConfig()
      .subscribe((res: any) => { this.periodosConfig = res.data; console.log(res); })
  }

  postPeriodoConfig() {
    this.apiPeriodosConfig.postPeriodoConfig(this.periodosConfigForm.value)
      .subscribe((res: any) => { 

        if (res.data.tipoProceso.id == 1) this.userSystemService.setConfigPeriodFormulacion = res.data
        else this.userSystemService.setConfigPeriodMonitoreo = res.data

        this.helperHandler.handleResponse(res, () => this.getPeriodoConfig(), this.periodosConfigForm) 
      })
  }

  putPeriodoConfig() {
    this.apiPeriodosConfig.putPeriodoConfig(this.periodosConfigForm.value)
      .subscribe((res: any) => {
        
        if (res.data.tipoProceso.id == 1) this.userSystemService.setConfigPeriodFormulacion = res.data
        else this.userSystemService.setConfigPeriodMonitoreo = res.data
        
        this.helperHandler.handleResponse(res, () => this.getPeriodoConfig(), this.periodosConfigForm)
      })
  }

  setValueEditEstructuraPro(estructuraPro: any) {
    this.periodosConfigForm.reset(estructuraPro)
    this.periodosConfigForm.patchValue({ idTipoProceso: estructuraPro.tipoProceso.id })
  }

  saveChanges() {
    this.periodosConfigForm.value.fechaInicio = format(this.periodosConfigForm.value.fechaInicio, 'yyyy-MM-dd');
    this.periodosConfigForm.value.fechaFin = format(this.periodosConfigForm.value.fechaFin, 'yyyy-MM-dd');
    if (this.periodosConfigForm.value.prorroga != null) this.periodosConfigForm.value.prorroga = format(this.periodosConfigForm.value.prorroga, 'yyyy-MM-dd');

    this.helperHandler.saveChanges(() => this.putPeriodoConfig(), this.periodosConfigForm, () => this.postPeriodoConfig())
    this.getPresupuestoInstitucional()
  }
}
