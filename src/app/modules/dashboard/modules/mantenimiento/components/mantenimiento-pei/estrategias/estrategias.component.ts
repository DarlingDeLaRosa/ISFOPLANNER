import { Component, OnInit } from '@angular/core';
import { EstrategiasService } from '../services/estrategias.service';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { ResponseI } from 'src/app/interfaces/Response.interfaces';
import { EjesService } from '../services/ejes.service';
import { EjesI } from '../interfaces/ejes.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseAccionI } from '../interfaces/ResponseAccion';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent implements OnInit {

  estrategia: Array<EstrategiaI> = [];
  ejes: Array<EjesI> = [];
  estrategiaForm: FormGroup;

  constructor(
    private estrategiasService: EstrategiasService,
    private ejesService:EjesService,
    private fb: FormBuilder,
    ){
      this.estrategiaForm = this.fb.group({
        id: new FormControl<number>(0),
        nombre:  new FormControl('', Validators.required),
        idEjeEstrategico:  new FormControl<number>(0, Validators.required),
      })
    }

  ngOnInit(): void {
    this.getAllEstrategia();
    this.getAllEjes();
  }

  getAllEjes() {
    this.ejesService.getEjes().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.ejes = resp.data;
    })
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

    get currentForm() {
      const form = this.estrategiaForm.value as EstrategiaI;
      return form;
    }


    postEstrategia() {
      this.estrategiasService.postEstrategias(this.currentForm).pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })).subscribe((resp:any) => {
        if (resp.data != null) {
          this.getAllEstrategia();
          alertIsSuccess(true);
          this.estrategiaForm.reset();
        }else {
          alertIsSuccess(false);
        }
      })
    }

  setValueEstrategia(estrategia:EstrategiaI){
    this.estrategiaForm.setValue({
      id: estrategia.id!,
      nombre:  estrategia.nombre,
      idEjeEstrategico: estrategia.ejeEstrategico.id
    });
}

    updateEstrategia(){
      this.estrategiasService.updateEstrategias(this.currentForm , this.currentForm.id!).pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp:any)=>{
        resp.data
        successMessageAlert("El registro fue editado correctamente");
        this.getAllEstrategia();
        this.estrategiaForm.reset();
      })
    }

    async deleteEstrategia(estrategia: EstrategiaI) {
      let remove: boolean = await alertRemoveSure("Estas seguro de eliminar esta estrategia?")
      if (remove) {
        this.estrategiasService.DeleteEstrategias(estrategia.id!)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          }))
          .subscribe((resp: any) => {
            alertIsSuccess(true);
            this.getAllEstrategia();
          })
      }
    }

    guardar(){
      if (this.estrategiaForm.invalid) return;

      if(!this.currentForm.id){
        if(this.estrategiaForm.valid){
          this.postEstrategia();
          this.getAllEstrategia();
        }
      }

      if(this.currentForm.id){
        if(this.estrategiaForm.valid){
          this.updateEstrategia();
          this.getAllEstrategia();
        }
      }
    }
}
