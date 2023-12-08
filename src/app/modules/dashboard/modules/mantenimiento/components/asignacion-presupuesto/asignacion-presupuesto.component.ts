import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { UnidadOrgI } from '../../interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-asignacion-presupuesto',
  templateUrl: './asignacion-presupuesto.component.html',
  styleUrls: ['./asignacion-presupuesto.component.css']
})
export class AsignacionPresupuestoComponent implements OnInit {

  asignacionPresupuestoForm: FormGroup;
  unidadesOrg: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiUnidadOrg: UnidadOrganizativaService
  ) {
    this.asignacionPresupuestoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      presupuestoEstimado: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getUnidadOrganizativa()
  }


  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        
        this.unidadesOrg = res.data
      })
  }

  putUnidadOrganizativa() {
    this.apiUnidadOrg.putUnidadesOrganizativas(this.asignacionPresupuestoForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUnidadOrganizativa()
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



  // saveChangesButton() {
  //   console.log(this.asignacionPresupuestoForm.value);

  //   if (this.asignacionPresupuestoForm.valid) {
  //     if (this.asignacionPresupuestoForm.value.id > 0) this.putUsuarios()
  //     else this.postUsuarios()
  //   } else {
  //     alertNoValidForm()
  //   }
  // }

}
