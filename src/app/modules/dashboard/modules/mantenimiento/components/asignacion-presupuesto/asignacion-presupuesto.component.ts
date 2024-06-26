import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertNoValidForm, alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { PresupuestoInstiGetI, UnidadOrgI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { DetailViewComponent } from '../../modals/detail-view/detail-view.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-asignacion-presupuesto',
  templateUrl: './asignacion-presupuesto.component.html',
  styleUrls: ['./asignacion-presupuesto.component.css']
})
export class AsignacionPresupuestoComponent implements OnInit {
  
  page: number = 1
  pagination!: PaginationI
  accion: boolean = false
  unidadesOrg!: UnidadOrgI[]
  unidadesOrgPadres: subUnidadI[] = []
  asignacionPresupuestoForm: FormGroup;
  modulo = this.userSystemService.modulosSis
  presupuestosInst: PresupuestoInstiGetI = {
    enUso: false, id: 0, montoTotal: 0, montoRestante: 0, montoEjecutado: 0, justicarModificacion: '', fechaInicio: new Date, fechaFin: new Date, creadoEn: new Date, creadoPor: '', actualizadoEn: new Date, actualizadoPor: ''
  }

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
    this.getUnidadOrganizativa()
    this.getPresupuestoInstitucional()
    this.getUnidadOrganizativaAsignadas()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(this.page, true)
      .subscribe((res: any) => { if ( res.data.length > 0) this.presupuestosInst = res.data[0]; })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas('', true)
      .subscribe((res: any) => { 
        this.unidadesOrgPadres = res.data
        res.data.filter((fatherUnits: subUnidadI) => { return fatherUnits.unidadPadre == undefined }) 
      })
  }

  getUnidadOrganizativaAsignadas() {
    this.apiPresupuestoInstitucional.getUnidadesPresupuestoAsignado(this.page).subscribe((res: any) => { this.unidadesOrg = res.data;this.pagination = res.pagination; })
  }

  postAsignarPresupuestoUnidadOrg() {
    this.apiPresupuestoInstitucional.postAsignarPresupuesto(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoInstitucional()) })
  }

  putAsignarPresupuestoUnidadOrg() {
    this.apiPresupuestoInstitucional.putAsignarPresupuesto(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => {
        this.helperHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoInstitucional())
        this.accion = false
      })
  }

  cleanForm() {
    this.accion = false
    this.asignacionPresupuestoForm.reset();
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
    this.asignacionPresupuestoForm.value.idPresupuestoInstitucional = this.presupuestosInst.id
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
    // const montoPresupuesto = unidad?.presupuesto[0].monto;
    // const montoFormateado = montoPresupuesto?.toLocaleString('es-ES', { style: 'currency', currency: 'DOP', minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let removeDecision: boolean = await alertRemoveSure(`¿Estas seguro de eliminar el presupuesto de ${unidad?.nombre} `) //(${montoFormateado})

    if (removeDecision) {
      loading(true)
      this.apiPresupuestoInstitucional.deleteAsignacionPresupuesto(unidad?.id)
        .subscribe((res: any) => {
          this.helperHandler.handleResponse(res, () => this.getUnidadOrganizativaAsignadas(), this.asignacionPresupuestoForm, () => this.getPresupuestoInstitucional())
        })
    }
  }

  saveChanges() {
    this.asignacionPresupuestoForm.get('idUnidadOrganizativa')?.enable()
    this.asignacionPresupuestoForm.value.idPresupuestoInstitucional = this.presupuestosInst.id

    if (this.asignacionPresupuestoForm.valid) {

      loading(true)
      if (this.accion) this.putAsignarPresupuestoUnidadOrg()
      else this.postAsignarPresupuestoUnidadOrg()

    } else alertNoValidForm()
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getUnidadOrganizativaAsignadas()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getUnidadOrganizativaAsignadas()
    }
  }
}
