import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { IndicadorEstrategicoService } from '../mantenimiento-pei/services/indicadoresEstrategicos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosForm: FormGroup
  productos: any[] = []
  indicadoresEstrategicos: any[] = []
  unidadesOrg: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiProducto: ProductoService,
    private apiIndicadoresEstrategicos: IndicadorEstrategicoService,
    private apiUnidadOrg: UnidadOrganizativaService
  ){
    this.productosForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idUnidadOrganizativa: new FormControl('', Validators.required),
      idIndicadorEstrategico: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getProducto()
    this.getIndicadoresEstrategicos()
    this.getUnidadOrganizativa()
  }


  getIndicadoresEstrategicos() {
    this.apiIndicadoresEstrategicos.getIndicadoresEstrategicos()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.indicadoresEstrategicos = res.data
      })
  }

  getProducto() {
    this.apiProducto.getProducto()
      .subscribe((res: any) => { this.productos = res.data })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  postProducto() {
    this.apiProducto.postProducto(this.productosForm.value)
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getProducto()
          this.productosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putProducto() {
    this.apiProducto.putProducto(this.productosForm.value)
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getProducto()
          this.productosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  async deleteProducto(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el producto.")

    if (removeDecision) {
      this.apiProducto.removeProducto(id)
        .subscribe((res: any) => {
          if (res.ok) {

            alertRemoveSuccess()
            this.getProducto()

          } else {
            errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
          }
        })
    }
  }

  setValueEditProducto(producto: any) {
    this.productosForm.reset(producto)
    console.log(this.productosForm.value);
  }

  saveChangesButton() {
    if (this.productosForm.valid) {
      if (this.productosForm.value.id > 0) this.putProducto()
      else this.postProducto()
    } else {
      alertNoValidForm()
    }
  }
}
