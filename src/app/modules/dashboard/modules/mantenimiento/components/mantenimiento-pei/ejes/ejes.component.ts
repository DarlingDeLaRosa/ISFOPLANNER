import { Component, OnInit } from '@angular/core';
import { EjesService } from '../services/ejes.service';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { EjesI } from '../interfaces/ejes.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { ResponseAccionI } from '../interfaces/ResponseAccion';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-ejes',
  templateUrl: './ejes.component.html',
  styleUrls: ['./ejes.component.css']
})
export class EjesComponent implements OnInit{
  ejes: Array<EjesI> = [];
  ejeForm: FormGroup;

  constructor(
    private ejesService:EjesService,
    private fb: FormBuilder,
  ) {
    this.ejeForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre:  new FormControl('', Validators.required),
      objetivo:  new FormControl('', Validators.required),
      numeroEje:  new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllEjes();
  }

  get currentForm() {
    const form = this.ejeForm.value as EjesI;
    return form;
  }

  getAllEjes() {
    this.ejesService.getEjes().pipe(
      catchError((error) => {
        alertServerDown()
         return error})).subscribe((resp: any) => {
      this.ejes = resp.data;
    })
  }
  postEjes() {
    this.ejesService.postEjes(this.currentForm).pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp:any) => {

      if (resp.data != null) {
        this.getAllEjes();
        alertIsSuccess(true);
        this.ejeForm.reset();
      }else {
        alertIsSuccess(false);
      }
    })
  }

  async deleteEjes(eje: EjesI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este eje?")
    if (remove) {
      this.ejesService.DeleteEjes(eje.id!).pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })).subscribe((resp: any) => {
          alertIsSuccess(true);
          this.getAllEjes();
        })
    }
  }

  setValueEje(eje:EjesI){
    this.ejeForm.setValue({
      id: eje.id!,
      nombre:  eje.nombre,
      objetivo:  eje.objetivo,
      numeroEje:  eje.numeroEje
    });
}

  updateEjes(){
    this.ejesService.updateEjes(this.currentForm , this.currentForm.id!).pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
    .subscribe((resp:any)=>{
      resp.data
      successMessageAlert("El registro fue editado correctamente");
      this.getAllEjes();
      this.ejeForm.reset();
    })
  }

  Guardar(){
    if(this.ejeForm.invalid) return;

    if(this.currentForm.id){
      if(this.ejeForm.valid){
        this.updateEjes();
        this.getAllEjes();
      }
    }

    if(!this.currentForm.id){
      if(this.ejeForm.valid){
        this.postEjes();
        this.getAllEjes();
      }
    }
  }

}
