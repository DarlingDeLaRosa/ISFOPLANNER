import { Component, OnInit } from '@angular/core';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { RequerimientosService } from '../services/requerimientos.service';
import { RequerimientoI } from '../interfaces/requerimientos.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-estructura-programatica',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent  implements OnInit{

  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  requerimientos: Array<RequerimientoI> = [];
  requerimientoForm: FormGroup;

  constructor(
    private indicadoresEstraService:IndicadorEstrategicoService,
    private requerimientoService:RequerimientosService,
    private fb: FormBuilder,
    ){
      this.requerimientoForm = this.fb.group({
        id: new FormControl<number>(0),
        nombre:  new FormControl('', Validators.required),
        esFinanciero: new FormControl(true ,Validators.required),
        idIndicadorEstrategico:  new FormControl<number>(0, Validators.required),
      })
    }

  ngOnInit(): void {
    this.getAllIndicadoresEstartegicos();
    this.getAllRequerimientos();
  }

  getAllIndicadoresEstartegicos() {
    this.indicadoresEstraService.getIndicadoresEstrategicos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.indicadoresEstartegicos = resp.data;
    })
  }

  getAllRequerimientos() {
    this.requerimientoService.getRequerimientos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.requerimientos = resp.data;
    })
  }

  get currentForm() {
    const form = this.requerimientoForm.value as RequerimientoI;
    return form;
  }

  postRequerimiento() {
    this.requerimientoService.postRequerimientos(this.currentForm)
    .pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
      .subscribe((resp:any) => {
      if (resp.ok == true) {
        this.getAllRequerimientos();
        alertIsSuccess(true);
        this.requerimientoForm.reset();
      }else {
        alertIsSuccess(false);
      }
    })
  }

  setValueRequerimiento(requerimiento:RequerimientoI){
    this.requerimientoForm.setValue({
        id: requerimiento.id,
        nombre:  requerimiento.nombre,
        esFinanciero: requerimiento.esFinanciero,
        idIndicadorEstrategico: requerimiento.indicadorEstrategico!.id
    });
}

    updateRequerimientos(){
      this.requerimientoService.updateRequerimientos(this.currentForm , this.currentForm.id!).pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp:any)=>{
        resp.data
        successMessageAlert("El registro fue editado correctamente");
        this.getAllRequerimientos();
        this.requerimientoForm.reset();
      })
    }

    async deleteRequerimientos(requerimientos: RequerimientoI) {
      let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este requerimiento?")
      if (remove) {
        this.requerimientoService.deleteRequerimientos(requerimientos.id!)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          }))
          .subscribe((resp: any) => {
            alertIsSuccess(true);
            this.getAllRequerimientos();
          })
      }
    }

  guardar(){
    if (this.requerimientoForm.invalid) return;

    if(!this.currentForm.id){
      if(this.requerimientoForm.valid){
        this.postRequerimiento();

      }
    }

    if(this.currentForm.id){
      if(this.requerimientoForm.valid){
        this.updateRequerimientos();
      }
    }
  }




}
