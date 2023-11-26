import { Component, OnInit } from '@angular/core';
import { EstrategiasService } from '../services/estrategias.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { ResultadoEfectoService } from '../services/resultadoEfecto.service';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';

@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './resultado-efecto.component.html',
  styleUrls: ['./resultado-efecto.component.css']
})
export class ResultadoEfectoComponent implements OnInit{
  estrategia: Array<EstrategiaI> = [];
  resultadoefecto: Array<ResultadoEfectoI> = [];
  //ejes: Array<EjesI> = [];
  resultadoEfectoForm: FormGroup;
  constructor(
    private estrategiasService: EstrategiasService,
    private resultadoEfectoService: ResultadoEfectoService,
    private fb: FormBuilder,
  ){
    this.resultadoEfectoForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre:  new FormControl('', Validators.required),
      idEstrategia:  new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllEstrategia();
    this.getAllResultadoEfecto();
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.estrategia = resp.data;
    })
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

  get currentForm() {
    const form = this.resultadoEfectoForm.value as ResultadoEfectoI;
    return form;
  }

  setValueResultadoEfecto(resultadoEfecto:ResultadoEfectoI){
    this.resultadoEfectoForm.setValue({
      id: resultadoEfecto.id!,
      nombre:  resultadoEfecto.nombre,
      idEstrategia: resultadoEfecto.estrategia.id
    });
}

postResultadoEfecto() {
  this.resultadoEfectoService.postResultadoEfecto(this.currentForm).pipe(
    catchError((error) => {
      alertServerDown()
      return error
    })).subscribe((resp:any) => {
    if (resp.data != null) {
      this.getAllResultadoEfecto();
      alertIsSuccess(true);
      this.resultadoEfectoForm.reset();
    }else {
      alertIsSuccess(false);
    }
  })
}
updateResultadoEfecto(){
  this.resultadoEfectoService.updateResultadoEfecto(this.currentForm , this.currentForm.id!).pipe(
    catchError((error) => {
      alertServerDown()
      return error
    }))
  .subscribe((resp:any)=>{
    resp.data
    this.getAllResultadoEfecto();
    successMessageAlert("El registro fue editado correctamente");
    this.resultadoEfectoForm.reset();
  })
}

async deleteResultadoEfecto(resultadoefecto: ResultadoEfectoI) {
  let remove: boolean = await alertRemoveSure("Estas seguro de eliminar esta estrategia?")
  if (remove) {
    this.resultadoEfectoService.deleteResultadoEfecto(resultadoefecto.id!)
    .pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
      .subscribe((resp: any) => {
        alertIsSuccess(true);
        this.getAllResultadoEfecto();
      })
  }
}


guardar(){
  if (this.resultadoEfectoForm.invalid) return;

      if(!this.currentForm.id){
        if(this.resultadoEfectoForm.valid){
          this.postResultadoEfecto();
        }
      }

      if(this.currentForm.id){
        if(this.resultadoEfectoForm.valid){
          this.updateResultadoEfecto();
        }
      }
    }
}


