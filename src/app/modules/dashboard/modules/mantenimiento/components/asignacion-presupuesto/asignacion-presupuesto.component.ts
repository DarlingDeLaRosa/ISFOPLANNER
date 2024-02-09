import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertNoValidForm, alertRemoveSure } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { PresupuestoInstiGetI, UnidadOrgI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { DetailViewComponent } from '../../modals/detail-view/detail-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';

@Component({
  selector: 'app-asignacion-presupuesto',
  templateUrl: './asignacion-presupuesto.component.html',
  styleUrls: ['./asignacion-presupuesto.component.css']
})
export class AsignacionPresupuestoComponent implements OnInit {

  asignacionPresupuestoForm: FormGroup;
  unidadesOrg: UnidadOrgI[] = []
  unidadesOrgPadres: subUnidadI[] = []
  accion: boolean = false
  presupuestosInst: PresupuestoInstiGetI = {
    enUso: false, id: 0, montoTotal: 0, montoRestante: 0, montoEjecutado: 0, justicarModificacion: '', fechaInicio: new Date, fechaFin: new Date, creadoEn: new Date, creadoPor: '', actualizadoEn: new Date, actualizadoPor: ''
  }

  constructor(
    public fb: FormBuilder,
    private apiUnidadOrg: UnidadOrganizativaService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
    private responseHandler: ResponsesHandlerService,
    public dialog: MatDialog,

  ) {
    this.asignacionPresupuestoForm = this.fb.group({
      idPresupuestoInstitucional: 0,
      idUnidadOrganizativa: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getUnidadOrganizativa()
    this.getPresupuestoInstitucional()
    this.getUnidadOrganizativaAsignadas()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(true)
      .subscribe((res: any) => { this.presupuestosInst = res.data[0]; })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => {
        this.unidadesOrgPadres = res.data.filter((fatherUnits: subUnidadI) => { return fatherUnits.unidadPadre == undefined })
      })
  }

  getUnidadOrganizativaAsignadas() {
    this.apiPresupuestoInstitucional.getUnidadesPresupuestoAsignado()
      .subscribe((res: any) => { this.unidadesOrg = res.data })
  }


  postAsignarPresupuestoUnidadOrg() {
    this.apiPresupuestoInstitucional.postAsignarPresupuesto(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => {
        this.responseHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoInstitucional())
      })
  }

  putAsignarPresupuestoUnidadOrg() {
    this.apiPresupuestoInstitucional.putAsignarPresupuesto(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => {
        this.responseHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoInstitucional())
        this.accion = false
        // this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
      })
  }

  cleanForm() {
    this.accion = false
    this.asignacionPresupuestoForm.reset();
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
  }

  openModal(subUnidades: UnidadOrgI) {
    this.dialog.open(DetailViewComponent, { data: subUnidades })
  }

  setValueEditUnidadOrg(unidadOrg: UnidadOrgI) {
    this.accion = true
    this.asignacionPresupuestoForm.patchValue({
      idUnidadOrganizativa: unidadOrg.unidadOrganizativa?.id,
      monto: unidadOrg.monto
    })
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.disable()
  }

  async deletePresupuestoUnidadOrg(unidad?: subUnidadI) {
    const montoPresupuesto = unidad?.presupuesto[0].monto;
    const montoFormateado = montoPresupuesto?.toLocaleString('es-ES', { style: 'currency', currency: 'DOP', minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let removeDecision: boolean = await alertRemoveSure(`Estas seguro de eliminar el presupuesto de ${unidad?.nombre} (${montoFormateado})`)

    if (removeDecision) {
      this.apiPresupuestoInstitucional.deleteAsignacionPresupuesto(unidad?.id)
        .subscribe((res: any) => {
          this.responseHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoInstitucional())
        })
    }
  }

  saveChangesButton() {
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
    this.asignacionPresupuestoForm.value.idPresupuestoInstitucional = this.presupuestosInst.id

    if (this.asignacionPresupuestoForm.valid) {
      if (this.accion) this.putAsignarPresupuestoUnidadOrg();
      else this.postAsignarPresupuestoUnidadOrg()

    } else alertNoValidForm()
  }
}
