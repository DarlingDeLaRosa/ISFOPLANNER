import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { PresupuestoInstiGetI, UnidadOrgI } from '../../interfaces/mantenimientoPOA.interface';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { DetailViewComponent } from '../../modals/detail-view/detail-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asignacion-presupuesto',
  templateUrl: './asignacion-presupuesto.component.html',
  styleUrls: ['./asignacion-presupuesto.component.css']
})
export class AsignacionPresupuestoComponent implements OnInit {

  asignacionPresupuestoForm: FormGroup;
  unidadesOrg: UnidadOrgI[] = []
  // : any[] = []
  presupuestosInst: PresupuestoInstiGetI = {
    enUso:false, id: 0, montoTotal: 0, montoRestante: 0, montoEjecutado: 0, justicarModificacion: '', fechaInicio: new Date, fechaFin: new Date, creadoEn: new Date, creadoPor: '', actualizadoEn: new Date, actualizadoPor: ''
  }

  constructor(
    public fb: FormBuilder,
    private apiUnidadOrg: UnidadOrganizativaService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
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
      .subscribe((res: any) => {  console.log(res);})
  }

  getUnidadOrganizativaAsignadas() {
    this.apiPresupuestoInstitucional.getUnidadesPresupuestoAsignado()
      .subscribe((res: any) => { this.unidadesOrg = res.data; console.log(res);})
  }


  putUnidadOrganizativa() {
    this.apiUnidadOrg.postUnidadesOrganizativas(this.asignacionPresupuestoForm.value)
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUnidadOrganizativa()
          this.getPresupuestoInstitucional()
          this.asignacionPresupuestoForm.reset()

        } else alertIsSuccess(false)
      })
  }

  openModal( subUnidades: UnidadOrgI) { 
    this.dialog.open(DetailViewComponent, {data: subUnidades}) 
  }

  setValueEditUnidadOrg(unidadOrg: any) {
    this.asignacionPresupuestoForm.reset(unidadOrg)
  }

  async deletePresupuestoUnidadOrg(unidadOrg: UnidadOrgI) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro que deseas remover el presupuesto de la unidad.")
    if (removeDecision) {



      // this.asignacionPresupuestoForm.value.id = unidadOrg.id
      // this.asignacionPresupuestoForm.value.nombre = unidadOrg.nombre
      // this.asignacionPresupuestoForm.value.presupuestoEstimado = 0

      this.putUnidadOrganizativa()
    }

  }
}
