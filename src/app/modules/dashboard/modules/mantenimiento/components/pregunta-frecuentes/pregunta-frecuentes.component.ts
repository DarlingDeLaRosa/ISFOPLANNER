import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { preguntasFrecuentesService } from '../../services/preguntas-frecuentes.service';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { PreguntaI } from '../../interfaces/mantenimientoPOA.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';

@Component({
  selector: 'app-pregunta-frecuentes',
  templateUrl: './pregunta-frecuentes.component.html',
  styleUrls: ['./pregunta-frecuentes.component.css']
})
export class PreguntaFrecuentesComponent implements OnInit {

  preguntasFrecuentesForm: FormGroup;
  getPreguntas!: PreguntaI[]

  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiPreguntas: preguntasFrecuentesService,
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
      .subscribe((res: any) => { this.getPreguntas = res.data; console.log(this.getPreguntas);})
  }

  postPregunta() {
    this.apiPreguntas.postPreguntasFrecuentes(this.preguntasFrecuentesForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPregunta(), this.preguntasFrecuentesForm) })
  }

  putPregunta() {
    this.apiPreguntas.putPreguntasFrecuentes(this.preguntasFrecuentesForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPregunta(), this.preguntasFrecuentesForm) })
  }

  async deletePregunta(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la pregunta frecuente.")

    if (removeDecision) {
      loading(true)
      this.apiPreguntas.removePreguntasFrecuentes(id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPregunta(), this.preguntasFrecuentesForm) })
    }
  }

  setValueEditPregunta(dataPregunta: PreguntaI) {
    this.preguntasFrecuentesForm.reset(dataPregunta)
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putPregunta(), this.preguntasFrecuentesForm, () => this.postPregunta())
  }
}
