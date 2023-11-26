import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { preguntasFrecuentesService } from '../../services/preguntas-frecuentes.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { PreguntaI } from '../../interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-pregunta-frecuentes',
  templateUrl: './pregunta-frecuentes.component.html',
  styleUrls: ['./pregunta-frecuentes.component.css']
})
export class PreguntaFrecuentesComponent implements OnInit {

  preguntasFrecuentesForm: FormGroup;
  getPreguntas: any

  constructor(
    public fb: FormBuilder,
    private apiPreguntas: preguntasFrecuentesService
  ) {
    this.preguntasFrecuentesForm = this.fb.group({
      id: 0,
      pregunta: new FormControl('', Validators.required),
      contexto: new FormControl('', Validators.required),
      respuesta: new FormControl('', Validators.required),
      enlance: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getPregunta()
  }

  getPregunta() {
    this.apiPreguntas.getPreguntasFrecuentes()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.getPreguntas = res.data
      })
  }

  postPregunta() {
    this.apiPreguntas.postPreguntasFrecuentes(this.preguntasFrecuentesForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        if (res.data != null) {

          alertIsSuccess(true)
          this.getPregunta()
          this.preguntasFrecuentesForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putPregunta() {
    this.apiPreguntas.putPreguntasFrecuentes(this.preguntasFrecuentesForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        if (res.data != null) {

          alertIsSuccess(true)
          this.getPregunta()
          this.preguntasFrecuentesForm.reset()

        } else alertIsSuccess(false)
      })
  }

  async deletePregunta(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la pregunta frecuente.")

    if (removeDecision) {
      this.apiPreguntas.removePreguntasFrecuentes(id)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          })
        )
        .subscribe((res: any) => {
          if (res.statusCode == 204) {
            alertRemoveSuccess()
            this.getPregunta()
          } else {
            errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
          }
        })
    }
  }

  setValueEditPregunta(dataPregunta: PreguntaI) {
    this.preguntasFrecuentesForm.reset(dataPregunta)
  }

  saveChangesButton() {
    if (this.preguntasFrecuentesForm.valid) {
      if (this.preguntasFrecuentesForm.value.id > 0) this.putPregunta()
      else this.postPregunta()
    } else {
      alertNoValidForm()
    }
  }

}
