import { Component, Inject, OnInit } from '@angular/core';
import { CategoriaInsumosI, CosteoDetallesI, InsumosI, MesesI, UnidadesMedidaI } from '../../interfaces/formulacion.interface';
import { ActividadesService } from '../../services/actividades.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-nuevo-insumo',
  templateUrl: './nuevo-insumo.component.html',
  styleUrls: ['./nuevo-insumo.component.css']
})
export class NuevoInsumoComponent implements OnInit {
  mesesList: Array<MesesI> = [];
  categoriaInsumoList: Array<CategoriaInsumosI> = [];
  UnidadesMedidaList: Array<UnidadesMedidaI> = [];
  insumoList: Array<InsumosI> = [];
  insumoTable: Array<CosteoDetallesI> = [];

  insumoForm: FormGroup;

  constructor(
    private actividadesService:ActividadesService,
    private fb: FormBuilder,
  ){
    this.insumoForm = this.fb.group({
      id: new FormControl<number>(0,[Validators.required]),
      idInsumo: new FormControl<number>(0,[Validators.required]),
      costoUnitario:  new FormControl<number>(0,[Validators.required]),
      cantidad:  new FormControl<number>(0,[Validators.required]),
      montoTotal:  new FormControl<number>(0),
      fechaRecepcion:  new FormControl<string>('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getMeses();
    this.getCategoriaInsumos();
    this.getUnidadesMedida();
    this.getInsumos();
  }

  // cerrarModal(): void {
  //   this.dialogRef.close(this.insumoTable); // Devolvemos el arreglo al cerrar el modal
  // }

  get currentForm() {
    const form = this.insumoForm.value as CosteoDetallesI;
    return form;
  }

  getInsumos() {
    this.actividadesService.getInsumos()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.insumoList = resp.data;
      })
  }
  getMeses() {
    this.actividadesService.getMeses()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.mesesList = resp.data;
      })
  }

  getUnidadesMedida() {
    this.actividadesService.getUnidadesMedida()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.UnidadesMedidaList = resp.data;
      })
  }

  getCategoriaInsumos() {
    this.actividadesService.getCategoriasInsumo()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.categoriaInsumoList = resp.data;
      })
  }

  agregarInsumoAlObjeto(){
    const nuevoId = uuidv4();
    this.insumoForm.get('id')!.setValue(nuevoId);
    this.insumoForm.patchValue({ montoTotal: this.insumoForm.get('cantidad')!.value * this.insumoForm.get('costoUnitario')!.value });
    console.log(this.insumoForm.value);

    this.insumoTable.push(this.insumoForm.value)
    console.log(this.insumoTable);
  }


  eliminarObjeto(id: string): void {
    const index = this.insumoTable.findIndex(objeto => objeto.id === id);
    if (index !== -1) {
      this.insumoTable.splice(index, 1);
    }
    console.log(this.insumoTable);
  }
}


