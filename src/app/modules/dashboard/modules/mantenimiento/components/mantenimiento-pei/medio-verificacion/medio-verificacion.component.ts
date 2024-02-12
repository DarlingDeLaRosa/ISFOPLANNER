import { Component, OnInit } from '@angular/core';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { MedioVerificacionService } from '../services/medio-verificacion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';

@Component({
  selector: 'app-mantenimiento-pei',
  templateUrl: './medio-verificacion.component.html',
  styleUrls: ['./medio-verificacion.component.css']
})
export class MedioVerificacionComponent implements OnInit {

  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  medioVerificacion: Array<MedioVerificacionI> = [];
  medioVerificacionForm: FormGroup;

  constructor(
    private responseHandler: ResponsesHandlerService,
    private medioVerifService: MedioVerificacionService,
    private fb: FormBuilder,
  ) {


    this.medioVerificacionForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getAllMedioVerifiacion();
  }

  getAllMedioVerifiacion() {
    this.medioVerifService.getMedioVerificacion()
      .subscribe((resp: any) => { this.medioVerificacion = resp.data; console.log(this.medioVerificacion); })
  }

  postMedioVerificacion() {
    this.medioVerifService.postMedioVerificacion(this.medioVerificacionForm.value)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getAllMedioVerifiacion(), this.medioVerificacionForm) })
  }


  updateMedioVerificacion() {
    this.medioVerifService.updateMedioVerificacion(this.medioVerificacionForm.value, this.medioVerificacionForm.value.id)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getAllMedioVerifiacion(), this.medioVerificacionForm) })
  }

  setValueMedioVerificacion(medioVerificacion: MedioVerificacionI) {
    this.medioVerificacionForm.reset(medioVerificacion);
  }

  async deleteMedioVerificacion(medioVerificaicon: MedioVerificacionI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este medio de verificacion?")
    
    if (remove) {
      this.medioVerifService.DeleteMedioVerificacion(medioVerificaicon.id!)
        .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getAllMedioVerifiacion(), this.medioVerificacionForm) })
    }
  }

  // guardar() {
  //   if (this.medioVerificacionForm.invalid) return;

  //   if (this.medioVerificacionForm.value.id) {
  //     if (this.medioVerificacionForm.valid) {
  //       this.postMedioVerificacion();
  //       this.getAllMedioVerifiacion();
  //     }
  //   }

  //   if (this.medioVerificacionForm.value.id) {
  //     if (this.medioVerificacionForm.valid) {
  //       this.updateMedioVerificacion();
  //       this.getAllMedioVerifiacion();
  //     }
  //   }
  // }

  saveChangesButton() {
    if(this.medioVerificacionForm.valid){
      if (this.medioVerificacionForm.value.id > 0) this.updateMedioVerificacion()
      else this.postMedioVerificacion()
    }else{
      alertNoValidForm()
    }
  }


}