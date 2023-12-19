import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { alertIsSuccess, alertNoValidForm, alertServerDown } from 'src/app/alerts/alerts';

@Component({
  selector: 'app-presupuesto-institucional',
  templateUrl: './presupuesto-institucional.component.html',
  styleUrls: ['./presupuesto-institucional.component.css']
})
export class PresupuestoInstitucionalComponent implements OnInit {

  presupuestoInstiForm: FormGroup;
  presupuestosInst: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService
  ) {
    this.presupuestoInstiForm = this.fb.group({
      id: 0,
      montoTotal: new FormControl('', Validators.required),
      justicarModificacion: new FormControl(''),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(null)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        this.presupuestosInst = res.data
      })
  }

  putUnidadOrganizativa() {
    this.apiPresupuestoInstitucional.putPresupuestoInstitucional(this.presupuestoInstiForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getPresupuestoInstitucional()
          this.presupuestoInstiForm.reset()

        } else alertIsSuccess(false)
      })
  }

  postUnidadOrganizativa() {
    this.apiPresupuestoInstitucional.postPresupuestoInstitucional(this.presupuestoInstiForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getPresupuestoInstitucional()
          this.presupuestoInstiForm.reset()

        } else alertIsSuccess(false)
      })
  }

  setValueEditPreInst(presupuestoInstiForm: any) {
    this.presupuestoInstiForm.reset(presupuestoInstiForm)
  }

  saveChangesButton() {
    if (this.presupuestoInstiForm.valid) {
      if (this.presupuestoInstiForm.value.id > 0) this.putUnidadOrganizativa()
      else this.postUnidadOrganizativa()
    } else {
      alertNoValidForm()
    }
  }

}
