import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosForm: FormGroup
  productos: any[]= []

  constructor(
    public fb: FormBuilder,
    private apiProducto: ProductoService
  ){
    this.productosForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getProducto()
  }

  getProducto() {
    this.apiProducto.getProducto()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);

        this.productos = res.data
      })
  }

  postProducto() {
    this.apiProducto.postProducto(this.productosForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);

        if (res.statusCode == 201) {

          alertIsSuccess(true)
          this.getProducto()
          this.productosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putProducto() {
    this.apiProducto.putProducto(this.productosForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        console.log(res);

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
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          })
        )
        .subscribe((res: any) => {
          console.log(res);

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