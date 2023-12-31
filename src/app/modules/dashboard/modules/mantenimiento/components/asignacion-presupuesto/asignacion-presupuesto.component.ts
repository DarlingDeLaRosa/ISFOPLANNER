import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { PresupuestoInstiGetI, UnidadOrgI } from '../../interfaces/mantenimientoPOA.interface';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';

@Component({
  selector: 'app-asignacion-presupuesto',
  templateUrl: './asignacion-presupuesto.component.html',
  styleUrls: ['./asignacion-presupuesto.component.css']
})
export class AsignacionPresupuestoComponent implements OnInit {

  asignacionPresupuestoForm: FormGroup;
  unidadesOrg: any[] = []
  presupuestosInst: PresupuestoInstiGetI = {
    id: 0,
    montoTotal: 0,
    montoRestante: 0,
    montoEjecutado: 0,
    justicarModificacion: '',
    fechaInicio: new Date,
    fechaFin: new Date,
    creadoEn: new Date,
    creadoPor: '',
    actualizadoEn: new Date,
    actualizadoPor: ''
  }

  constructor(
    public fb: FormBuilder,
    private apiUnidadOrg: UnidadOrganizativaService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService
  ) {
    this.asignacionPresupuestoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      presupuestoEstimado: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getUnidadOrganizativa()
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    let presupuestoYear = new Date().getFullYear()

    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(presupuestoYear)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.presupuestosInst = res.data[0]
      })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  putUnidadOrganizativa() {
    this.apiUnidadOrg.putUnidadesOrganizativas(this.asignacionPresupuestoForm.value, this.presupuestosInst.id)
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUnidadOrganizativa()
          this.getPresupuestoInstitucional()
          this.asignacionPresupuestoForm.reset()

        } else alertIsSuccess(false)
      })
  }


  setValueEditUnidadOrg(unidadOrg: any) {
    this.asignacionPresupuestoForm.reset(unidadOrg)
  }

  async deletePresupuestoUnidadOrg(unidadOrg: UnidadOrgI) {

    let removeDecision: boolean = await alertRemoveSure("Estas seguro que deseas remover el presupuesto de la unidad.")

    if (removeDecision) {

      this.asignacionPresupuestoForm.value.id = unidadOrg.id
      this.asignacionPresupuestoForm.value.nombre = unidadOrg.nombre
      this.asignacionPresupuestoForm.value.presupuestoEstimado = 0

      this.putUnidadOrganizativa()
    }

  }
}
