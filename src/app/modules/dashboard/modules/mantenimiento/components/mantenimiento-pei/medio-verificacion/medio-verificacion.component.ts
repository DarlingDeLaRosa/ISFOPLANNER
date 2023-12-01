import { Component, OnInit } from '@angular/core';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { MedioVerificacionService } from '../services/medio-verificacion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mantenimiento-pei',
  templateUrl: './medio-verificacion.component.html',
  styleUrls: ['./medio-verificacion.component.css']
})
export class MedioVerificacionComponent implements OnInit{

  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  medioVerificacion: Array<MedioVerificacionI> = [];
  medioVerificacionForm: FormGroup;

  constructor(
    private indicadorEstrategicoService:IndicadorEstrategicoService,
    private medioVerifService: MedioVerificacionService,
    private fb: FormBuilder,
  ){

    
  this.medioVerificacionForm = this.fb.group({
    id: new FormControl<number>(0, Validators.required),
    idIndicadorEstrategico:  new FormControl<number>(0, Validators.required),
    nombre: new FormControl('',[Validators.required]),
  })
}

get currentForm() {
  const form = this.medioVerificacionForm.value as MedioVerificacionI;
  return form;
}

  ngOnInit(): void {
  this.getAllIndicadoresEstartegicos();
  this.getAllMedioVerifiacion();
  }


  getAllIndicadoresEstartegicos() {
    this.indicadorEstrategicoService.getIndicadoresEstrategicos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.indicadoresEstartegicos = resp.data;
    })
  }

  getAllMedioVerifiacion() {
    this.medioVerifService.getMedioVerificacion()
    .pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
      .subscribe((resp: any) => {
      this.medioVerificacion = resp.data;
      console.log(this.medioVerificacion);
    })
  }

  postMedioVerificacion() {
    this.medioVerifService.postMedioVerificacion(this.currentForm).pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp:any) => {
      if (resp.ok == true) {
        this.getAllMedioVerifiacion();
        alertIsSuccess(true);
        this.medioVerificacionForm.reset();
      }else {
        alertIsSuccess(false);
      }
    })
  }

  
  updateMedioVerificacion(){
    this.medioVerifService.updateMedioVerificacion(this.currentForm , this.currentForm.id!).pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
    .subscribe((resp:any)=>{
      resp.data
      successMessageAlert("El registro fue editado correctamente");
      this.getAllMedioVerifiacion();
      this.medioVerificacionForm.reset();
    })
  }

  setValueMedioVerificacion(medioVerificaicon:MedioVerificacionI){
    this.medioVerificacionForm.setValue({
      id: medioVerificaicon.id!,
      nombre:  medioVerificaicon.nombre,
      idIndicadorEstrategico: medioVerificaicon.indicadorEstrategico?.id
    });
}


async deleteMedioVerificacion(medioVerificaicon: MedioVerificacionI) {
  let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este medio de verificacion?")
  if (remove) {
    this.medioVerifService.DeleteMedioVerificacion(medioVerificaicon.id!)
    .pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
      .subscribe((resp: any) => {
        alertIsSuccess(true);
        this.getAllMedioVerifiacion();
      })
  }
}



  guardar(){
    if (this.medioVerificacionForm.invalid) return;

    if(!this.currentForm.id){
      if(this.medioVerificacionForm.valid){
        this.postMedioVerificacion();
        this.getAllMedioVerifiacion();
      }
    }

    if(this.currentForm.id){
      if(this.medioVerificacionForm.valid){
        this.updateMedioVerificacion();
        this.getAllMedioVerifiacion();
      }
    }
  }


}