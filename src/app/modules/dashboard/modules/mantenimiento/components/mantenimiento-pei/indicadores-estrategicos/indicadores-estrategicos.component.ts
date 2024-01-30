import { Component, OnInit } from '@angular/core';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { ResultadoEfectoService } from '../services/resultadoEfecto.service';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-indicadores-estrategicos',
  templateUrl: './indicadores-estrategicos.component.html',
  styleUrls: ['./indicadores-estrategicos.component.css']
})
export class IndicadoresEstrategicosComponent implements OnInit{

  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  resultadoefecto: Array<ResultadoEfectoI> = [];
  IndicadorEstrForm: FormGroup;

  constructor(
    private indicadoresEstraService:IndicadorEstrategicoService,
    private resultadoEfectoService:ResultadoEfectoService,
    private fb: FormBuilder,
  ){
    this.IndicadorEstrForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre:  new FormControl('', Validators.required),
      linaBase:  new FormControl<number>(0, Validators.required),
      meta: new FormControl<number>(0, Validators.required),
      mediosVerificaciones: new FormControl ('', Validators.required),
      idResultadoefecto:  new FormControl<number>(0, Validators.required),
        anio1: new FormControl<number>(0, Validators.required),
        metaAnio1: new FormControl<number>(0, Validators.required),
        anio2: new FormControl<number>(0, Validators.required),
        metaAnio2: new FormControl<number>(0, Validators.required),
        anio3: new FormControl<number>(0, Validators.required),
        metaAnio3: new FormControl<number>(0, Validators.required),
        anio4: new FormControl<number>(0, Validators.required),
        metaAnio4: new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllResultadoEfecto();
    this.getAllIndicadoresEstartegicos();
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {        
      this.resultadoefecto = resp.data;
    })
  }

  getAllIndicadoresEstartegicos() {
    this.indicadoresEstraService.getIndicadoresEstrategicos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
        console.log(resp);

      this.indicadoresEstartegicos = resp.data;
    })
  }

  get currentForm() {
    const form = this.IndicadorEstrForm.value as IndicadoresEstrategicosI;
    return form;
  }

  setValueIndicadoresEstrategicos(indicadorEstrategico:IndicadoresEstrategicosI){
    this.IndicadorEstrForm.setValue({
      id: indicadorEstrategico.id,
      nombre: indicadorEstrategico.nombre,
      linaBase:  indicadorEstrategico.linaBase,
      meta:  indicadorEstrategico.meta,
      idResultadoefecto:  indicadorEstrategico.resultadoEfecto.id,
      anio1: indicadorEstrategico.cronograma.anio1,
      metaAnio1: indicadorEstrategico.cronograma.metaAnio1,
      anio2: indicadorEstrategico.cronograma.anio2,
      metaAnio2: indicadorEstrategico.cronograma.metaAnio2,
      anio3: indicadorEstrategico.cronograma.anio3,
      metaAnio3: indicadorEstrategico.cronograma.metaAnio3,
      anio4: indicadorEstrategico.cronograma.anio4,
      metaAnio4: indicadorEstrategico.cronograma.metaAnio4
    });
}

postIndicadoresEstrategicos() {
  const objetoPost:any = {
    nombre: this.IndicadorEstrForm.get('nombre')!.value,
    linaBase: this.IndicadorEstrForm.get('linaBase')!.value,
    meta: this.IndicadorEstrForm.get('meta')!.value,
    idResultadoefecto: this.IndicadorEstrForm.get('idResultadoefecto')!.value,
    cronograma: {
      anio1: this.IndicadorEstrForm.get('anio1')!.value,
      metaAnio1: this.IndicadorEstrForm.get('metaAnio1')!.value,
      anio2: this.IndicadorEstrForm.get('anio2')!.value,
      metaAnio2: this.IndicadorEstrForm.get('metaAnio2')!.value,
      anio3: this.IndicadorEstrForm.get('anio3')!.value,
      metaAnio3: this.IndicadorEstrForm.get('metaAnio3')!.value,
      anio4: this.IndicadorEstrForm.get('anio4')!.value,
      metaAnio4: this.IndicadorEstrForm.get('metaAnio4')!.value,
    },
  };
  this.indicadoresEstraService.postIndicadoresEstrategicos(objetoPost).
  pipe(
    catchError((error) => {
      alertServerDown()
      return error
    })).
    subscribe((resp:any) => {
      console.log(objetoPost);
    if (resp.data != null) {
      this.getAllIndicadoresEstartegicos();
      alertIsSuccess(true);
      this.IndicadorEstrForm.reset();
    }else {
      alertIsSuccess(false);
    }
  })
}
updateIndicadoresEstrategicos(){
  const objetoPost:any = {
    id: this.currentForm.id!,
    nombre: this.IndicadorEstrForm.get('nombre')!.value,
    linaBase: this.IndicadorEstrForm.get('linaBase')!.value,
    meta: this.IndicadorEstrForm.get('meta')!.value,
    idResultadoefecto: this.IndicadorEstrForm.get('idResultadoefecto')!.value,
    cronograma: {
      anio1: this.IndicadorEstrForm.get('anio1')!.value,
      metaAnio1: this.IndicadorEstrForm.get('metaAnio1')!.value,
      anio2: this.IndicadorEstrForm.get('anio2')!.value,
      metaAnio2: this.IndicadorEstrForm.get('metaAnio2')!.value,
      anio3: this.IndicadorEstrForm.get('anio3')!.value,
      metaAnio3: this.IndicadorEstrForm.get('metaAnio3')!.value,
      anio4: this.IndicadorEstrForm.get('anio4')!.value,
      metaAnio4: this.IndicadorEstrForm.get('metaAnio4')!.value,
    },
  };
  this.indicadoresEstraService.updateIndicadoresEstrategicos(objetoPost , this.currentForm.id!)
  .pipe(
    catchError((error) => {
      alertServerDown()
      return error
    }))
  .subscribe((resp:any)=>{
    resp.data
    successMessageAlert("El registro fue editado correctamente");
    this.getAllIndicadoresEstartegicos();
    this.IndicadorEstrForm.reset();
  })
}

async deleteIndicadoresEstrategicos(indicadorEstrategico:IndicadoresEstrategicosI) {
  let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este indicador?")
  if (remove) {
    this.indicadoresEstraService.deleteIndicadoresEstrategicos(indicadorEstrategico.id!)
    .pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
      .subscribe((resp: any) => {
        alertIsSuccess(true);
        this.getAllIndicadoresEstartegicos();
      })
  }
}

guardar(){

  if (this.IndicadorEstrForm.invalid) return;
  if(!this.currentForm.id){
    if(this.IndicadorEstrForm.valid){
      this.postIndicadoresEstrategicos();
      this.getAllIndicadoresEstartegicos();
    }
  }

  if(this.currentForm.id){
    if(this.IndicadorEstrForm.valid){
      this.updateIndicadoresEstrategicos();
      this.getAllIndicadoresEstartegicos();
    }
  }
}

}



