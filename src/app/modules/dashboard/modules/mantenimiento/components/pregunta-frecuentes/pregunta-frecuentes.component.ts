import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { preguntasFrecuentesService } from '../../services/preguntas-frecuentes.service';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { PreguntaI } from '../../interfaces/mantenimientoPOA.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-pregunta-frecuentes',
  templateUrl: './pregunta-frecuentes.component.html',
  styleUrls: ['./pregunta-frecuentes.component.css']
})
export class PreguntaFrecuentesComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  preguntasFrecuentesForm: FormGroup;
  getPreguntas!: PreguntaI[]
  modulo = this.userSystemService.modulosSis
  
  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiPreguntas: preguntasFrecuentesService,    
    private userSystemService: UserSystemInformationService,
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
    this.apiPreguntas.getPreguntasFrecuentes(this.page)
      .subscribe((res: any) => { this.getPreguntas = res.data; this.pagination = res.pagination;})
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

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getPregunta()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getPregunta()
    }
  }
}
