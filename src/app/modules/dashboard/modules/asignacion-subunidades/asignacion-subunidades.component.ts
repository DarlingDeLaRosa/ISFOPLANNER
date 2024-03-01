import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/services/appHelper.service';
import { UnidadDataI } from 'src/app/interfaces/Response.interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertNoValidForm, alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { subUnidadI } from '../mantenimiento/interfaces/mantenimientoPOA.interface';
import { DetailViewComponent } from '../mantenimiento/modals/detail-view/detail-view.component';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { UnidadOrganizativaService } from '../mantenimiento/services/unidad-organizativa.service';
import { PresupuestoInstitucionalService } from '../mantenimiento/services/presupuestoInstitucional.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';

@Component({
  selector: 'app-asignacion-subunidades',
  templateUrl: './asignacion-subunidades.component.html',
  styleUrls: ['./asignacion-subunidades.component.css']
})
export class AsignacionSubunidadesComponent {

  accion: boolean = false
  subUnidadesOrg!: subUnidadI[]
  unidadesOrgPadres: subUnidadI[] = []
  asignacionPresupuestoForm: FormGroup;
  userUnidadData: UnidadDataI = this.userSystemService.isUnidadOrgFather
  presupuestosUnidad: { monto: number, montoRestante: number, montoEjecutado: number } = { monto: 0, montoRestante: 0, montoEjecutado: 0 }
  presupuestosInst: number = 0

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private userSystemService: UserSystemInformationService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {
    this.asignacionPresupuestoForm = this.fb.group({
      idPresupuestoInstitucional: 0,
      monto: new FormControl('', Validators.required),
      idUnidadOrganizativa: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getPresupuestoUnidad()
    this.getUnidadOrganizativa()
    this.getPresupuestoInstitucional()
    this.getUnidadOrganizativaAsignadas()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(true).subscribe((res: any) => { this.presupuestosInst = res.data[0].id; })
  }

  getPresupuestoUnidad() {
    this.apiPresupuestoInstitucional.getPresupuestoUnidad().subscribe((res: any) => { this.presupuestosUnidad = res.data })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => {
        let subUnidades = res.data.filter((fatherUnits: subUnidadI) => { return fatherUnits.nombre == this.userUnidadData.unidad })
        this.unidadesOrgPadres = subUnidades[0].subUnidades
      })
  }

  getUnidadOrganizativaAsignadas() {
    this.apiPresupuestoInstitucional.getSubUnidadesPresupuestoAsignado()
      .subscribe((res: any) => { this.subUnidadesOrg = res.data })
  }

  postAsignarPresupuestoUnidadOrg() {
    this.apiPresupuestoInstitucional.postAsignarPresupuesto(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => {
        this.helperHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoUnidad())
      })
  }

  putAsignarPresupuestoUnidadOrg() {
    this.apiPresupuestoInstitucional.putAsignarPresupuesto(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => {
        this.helperHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoUnidad())
        this.accion = false
      })
  }

  cleanForm() {
    this.accion = false
    this.asignacionPresupuestoForm.reset();
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
  }

  openModal(subUnidades: subUnidadI) {
    this.dialog.open(DetailViewComponent, { data: subUnidades })
  }

  setValueEditUnidadOrg(unidadOrg: subUnidadI) {
    this.accion = true
    this.asignacionPresupuestoForm.patchValue({
      idUnidadOrganizativa: unidadOrg.id,
      monto: unidadOrg.presupuesto[0].monto
    })
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.disable()
  }

  async deletePresupuestoUnidadOrg(unidad: subUnidadI) {
    const montoPresupuesto = unidad?.presupuesto[0].monto;
    const montoFormateado = montoPresupuesto?.toLocaleString('es-ES', { style: 'currency', currency: 'DOP', minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let removeDecision: boolean = await alertRemoveSure(`Estas seguro de eliminar el presupuesto de ${unidad?.nombre} (${montoFormateado})`)

    if (removeDecision) {
      loading(true)
      this.apiPresupuestoInstitucional.deleteAsignacionPresupuesto(unidad?.id)
        .subscribe((res: any) => {
          this.helperHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoUnidad())
        })
    }
  }

  saveChanges() {
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
    this.asignacionPresupuestoForm.value.idPresupuestoInstitucional = this.presupuestosInst

    if (this.asignacionPresupuestoForm.valid) {

      loading(true)
      if (this.accion) this.putAsignarPresupuestoUnidadOrg()
      else this.postAsignarPresupuestoUnidadOrg()

    } else alertNoValidForm()
  }
}
