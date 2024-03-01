import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { ProductoService } from '../../services/producto.service';
import { HelperService } from 'src/app/services/appHelper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FrecuenciaI } from '../../../formulacion/interfaces/formulacion.interface';
import { ResponsableI } from '../mantenimiento-pei/interfaces/responsable.interface';
import { IndicadorGestionService } from '../../services/indicadores-gestion.service';
import { DetailViewComponent } from '../../modals/detail-view/detail-view.component';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { EstructuraProgramaticaService } from '../../services/estructura-programatica.service';
import { EstructuraProgramaticaI, IndicadoresGestionGetI, ProductoI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';
import { PermissionService } from 'src/app/services/applyPermissions.service';

@Component({
  selector: 'app-indicadores-gestion',
  templateUrl: './indicadores-gestion.component.html',
  styleUrls: ['./indicadores-gestion.component.css']
})
export class IndicadoresGestionComponent implements OnInit {

  indicadoresGestionForm: FormGroup;
  indicadoresGestion!: IndicadoresGestionGetI[]
  frecuencias: FrecuenciaI[] = []
  alcances: any[] = []
  productos: ProductoI[] = []
  estructurasPro: EstructuraProgramaticaI[] = []
  unidadesOrg: subUnidadI[] = []

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private apiProducto: ProductoService,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private apiEstruturaPro: EstructuraProgramaticaService,
  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idProducto: new FormControl('', Validators.required),
      idAlcance: new FormControl('', Validators.required),
      idFrecuencia: new FormControl('', Validators.required),
      idEstructuraProgramatica: new FormControl('', Validators.required),
      idResponsable: new FormControl('', Validators.required),
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
      .subscribe((res: any) => { this.productos = res.data;})
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
      .subscribe((res: any) => { this.indicadoresGestion = res.data; console.log(res);
      })
  }

  postIndicadoresGestion() {
    this.apiIndicadoresGestion.postIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getIndicadoresGestion(), this.indicadoresGestionForm) })
  }

  putIndicadoresGestion() {
    this.apiIndicadoresGestion.putIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getIndicadoresGestion(), this.indicadoresGestionForm) })
  }

  async deleteIndicadoresGestion(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

    if (removeDecision) {
      loading(true)
      this.apiIndicadoresGestion.removeIndicadorGestion(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getIndicadoresGestion(), this.indicadoresGestionForm) })
    }
  }

  setValueEditIndicadoresGestion(indicadoresGestion: IndicadoresGestionGetI) {
    this.indicadoresGestionForm.patchValue({
      id: indicadoresGestion.id,
      nombre: indicadoresGestion.nombre,
      idProducto: indicadoresGestion.producto.id,
      idAlcance: indicadoresGestion.alcance.id,
      idFrecuencia: indicadoresGestion.frecuencia.id,
      idEstructuraProgramatica: indicadoresGestion.estructuraProgramatica.id,
      idResponsable: indicadoresGestion.responsables.id,
      idTipoIndicador: indicadoresGestion.tipoIndicador.id,
      meta: indicadoresGestion.meta,
      linaBase: indicadoresGestion.linaBase
    })
  }

  openModal(responsables: ResponsableI[]) { this.dialog.open(DetailViewComponent, { data: responsables })}

  saveChanges() {
    console.log(this.indicadoresGestionForm.value);
    
    this.helperHandler.saveChanges(() => this.putIndicadoresGestion(), this.indicadoresGestionForm, () => this.postIndicadoresGestion())
  }
}
