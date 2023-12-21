import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { IndicadorGestionService } from '../../services/indicadores-gestion.service';
import { catchError, throwError } from 'rxjs';
import { EstructuraProgramaticaService } from '../../services/estructura-programatica.service';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';

@Component({
  selector: 'app-indicadores-gestion',
  templateUrl: './indicadores-gestion.component.html',
  styleUrls: ['./indicadores-gestion.component.css']
})
export class IndicadoresGestionComponent implements OnInit {

  indicadoresGestionForm: FormGroup;
  indicadoresGestion: any[] = []
  frecuencias: any[] = []
  alcances: any[] = []
  productos: any[] = []
  estructurasPro: any[] = []
  unidadesOrg: any[] = []


  constructor(
    public fb: FormBuilder,
    private apiProducto: ProductoService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private apiEstruturaPro: EstructuraProgramaticaService,
    private apiUnidadOrg: UnidadOrganizativaService
  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idProducto: new FormControl('', Validators.required),
      idAlcance: new FormControl('', Validators.required),
      idFrecuencia: new FormControl('', Validators.required),
      idEstructuraProgramatica: new FormControl('', Validators.required),
      idUnidadOrganizativa: new FormControl('', Validators.required),
      idTipoIndicador: new FormControl('', Validators.required), 
      meta: new FormControl('', Validators.required),
      linaBase: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getIndicadoresGestion()
    this.getProductos()
    this.getFrecuencia()
    this.getAlcance()
    this.getEstructuraPro()
    this.getUnidadOrganizativa()
  }

  getProductos() {
    this.apiProducto.getProducto()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.productos = res.data
      })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);

        this.unidadesOrg = res.data
      })
  }

  getEstructuraPro() {
    this.apiEstruturaPro.getEstructurasProgramaticas()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.estructurasPro = res.data
      })
  }


  getFrecuencia() {
    this.apiIndicadoresGestion.getFrecuencia()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.frecuencias = res.data
      })
  }

  getAlcance() {
    this.apiIndicadoresGestion.getAlcance()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.alcances = res.data
      })
  }


  getIndicadoresGestion() {
    this.apiIndicadoresGestion.getIndicadorGestion()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return  throwError(error)
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        this.indicadoresGestion = res.data
      })
  }

  postIndicadoresGestion() {
    this.apiIndicadoresGestion.postIndicadorGestion(this.indicadoresGestionForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        console.log(res);

        if (res.statusCode == 201) {

          alertIsSuccess(true)
          this.getIndicadoresGestion()
          this.indicadoresGestionForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putIndicadoresGestion() {
    this.apiIndicadoresGestion.putIndicadorGestion(this.indicadoresGestionForm.value)
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
          this.getIndicadoresGestion()
          this.indicadoresGestionForm.reset()

        } else alertIsSuccess(false)
      })
  }

  async deleteIndicadoresGestion(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

    if (removeDecision) {
      this.apiIndicadoresGestion.removeIndicadorGestion(id)
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
            this.getIndicadoresGestion()

          } else {
            errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
          }
        })
    }
  }

  setValueEditIndicadoresGestion(indicadoresGestion: any) {
    this.indicadoresGestionForm.reset(indicadoresGestion)
  }

  saveChangesButton() {

    console.log(this.indicadoresGestionForm.value);

    if (this.indicadoresGestionForm.valid) {
      if (this.indicadoresGestionForm.value.id > 0) this.putIndicadoresGestion()
      else this.postIndicadoresGestion()
    } else {
      alertNoValidForm()
    }
  }

}
