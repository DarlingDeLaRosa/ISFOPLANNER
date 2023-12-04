import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';

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
        this.unidadesOrg = res.data
      })
  }

  putUnidadOrganizativa() {
    this.apiUnidadOrg.putUnidadesOrganizativas()//this.asignacionPresupuestoForm.value
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


  setValueEditUnidadOrg(usuarios: any) {
    this.asignacionPresupuestoForm.reset(usuarios)
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
