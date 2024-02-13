import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, errorMessageAlert } from 'src/app/alerts/alerts';
import { IndicadorGestionService } from '../../services/indicadores-gestion.service';
import { EstructuraProgramaticaService } from '../../services/estructura-programatica.service';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { HelperService } from 'src/app/services/appHelper.service';

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
    private apiUnidadOrg: UnidadOrganizativaService,
    private helperHandler: HelperService
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
      .subscribe((res: any) => { this.productos = res.data })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getEstructuraPro() {
    this.apiEstruturaPro.getEstructurasProgramaticas()
      .subscribe((res: any) => { this.estructurasPro = res.data })
  }

  getFrecuencia() {
    this.apiIndicadoresGestion.getFrecuencia()
      .subscribe((res: any) => { this.frecuencias = res.data })
  }

  getAlcance() {
    this.apiIndicadoresGestion.getAlcance()
      .subscribe((res: any) => { this.alcances = res.data })
  }

  getIndicadoresGestion() {
    this.apiIndicadoresGestion.getIndicadorGestion()
      .subscribe((res: any) => { this.indicadoresGestion = res.data })
  }

  postIndicadoresGestion() {
    this.apiIndicadoresGestion.postIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => {
        if (res.statusCode == 201) {

          alertIsSuccess(true)
          this.getIndicadoresGestion()
          this.indicadoresGestionForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putIndicadoresGestion() {
    this.apiIndicadoresGestion.putIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => {
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
        .subscribe((res: any) => {
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

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putIndicadoresGestion(), this.indicadoresGestionForm, () => this.postIndicadoresGestion())
  }
}
