import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { ConfiguracionPeriodoServive } from '../../services/configuracion-periodos.service';
import { TipoProcesosService } from '../../services/tipo-proceso.service';


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
    private apiPeriodosConfig: ConfiguracionPeriodoServive
  ) {
    this.periodosConfigForm = this.fb.group({
      id: 0,
      idTipoProceso: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      prorroga:new FormControl('', Validators.required)
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
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        console.log(res);

        this.periodosConfig = res.data
      })
  }

  // postEstructuraPro() {
  //   this.apiPeriodosConfig.posgetEstructuraPro(this.periodosConfigForm.value)
  //     .pipe(
  //       catchError((error) => {
  //         alertServerDown()
  //         return error
  //       })
  //     )
  //     .subscribe((res: any) => {
  //       console.log(res);

  //       if (res.statusCode == 201) {

  //         alertIsSuccess(true)
  //         this.getEstructuraPro()
  //         this.periodosConfigForm.reset()

  //       } else alertIsSuccess(false)
  //     })
  // }

  putEstructuraPro() {
    this.apiPeriodosConfig.putPeriodoConfig(this.periodosConfigForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getPeriodoConfig()
          this.periodosConfigForm.reset()

        } else alertIsSuccess(false)
      })
  }

  // async deleteEstructuraPro(id: number) {
  //   let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

  //   if (removeDecision) {
  //     this.apiPeriodosConfig.remgetEstructuraPro(id)
  //       .pipe(
  //         catchError((error) => {
  //           alertServerDown()
  //           return error
  //         })
  //       )
  //       .subscribe((res: any) => {
  //         console.log(res);

  //         if (res.ok) {

  //           alertRemoveSuccess()
  //           this.getEstructuraPro()

  //         } else {
  //           errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
  //         }
  //       })
  //   }
  // }

  setValueEditEstructuraPro(estructuraPro: any) {
    console.log(estructuraPro);
    
    this.periodosConfigForm.reset(estructuraPro)
    this.periodosConfigForm.patchValue({
      nombre: estructuraPro.tipoProceso.nombre,
      idTipoProceso: estructuraPro.tipoProceso.id
    }) 
  }

  // saveChangesButton() {
  //   if (this.periodosConfigForm.valid) {
  //     if (this.periodosConfigForm.value.id > 0) this.putEstructuraPro()
  //     else this.postEstructuraPro()
  //   } else {
  //     alertNoValidForm()
  //   }
  // }

}
