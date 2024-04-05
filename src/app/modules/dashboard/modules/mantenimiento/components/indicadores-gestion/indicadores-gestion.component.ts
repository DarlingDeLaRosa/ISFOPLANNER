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
import { MedioVerificacionService } from '../mantenimiento-pei/services/medio-verificacion.service';
import { MedioVerificacionI } from '../mantenimiento-pei/interfaces/medio-verificacion.interface';
import { EntidadListViewComponent } from '../../modals/entidad-list-view/responsible-view.component';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { subUnit } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-indicadores-gestion',
  templateUrl: './indicadores-gestion.component.html',
  styleUrls: ['./indicadores-gestion.component.css']
})
export class IndicadoresGestionComponent implements OnInit {

  alcances: any[] = []
  productos: ProductoI[] = []
  unidadesOrg: subUnidadI[] = []
  frecuencias: FrecuenciaI[] = []
  indicadoresGestionForm: FormGroup;
  mediosVerificacion: MedioVerificacionI[] = [];
  indicadoresGestion!: IndicadoresGestionGetI[]
  estructurasPro: EstructuraProgramaticaI[] = []
  modulo = this.userSystemService.modulosSis
  exactUnit: subUnit = this.userSystemService.getUnitOrg

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private apiProducto: ProductoService,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private medioVerifService: MedioVerificacionService,
    private apiIndicadoresGestion: IndicadorGestionService,    
    private userSystemService: UserSystemInformationService,
    private apiEstruturaPro: EstructuraProgramaticaService,
  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      meta: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      lineaBase: new FormControl('', Validators.required),
      idAlcance: new FormControl('', Validators.required),
      idProducto: new FormControl('', Validators.required),
      idFrecuencia: new FormControl('', Validators.required),
      idResponsable: new FormControl('', Validators.required),
      idTipoIndicador: new FormControl('', Validators.required),
      mediosVerificaciones: new FormControl('', Validators.required),
      idEstructuraProgramatica: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAlcance()
    this.getProductos()
    this.getFrecuencia()
    this.getEstructuraPro()
    this.getMedioVerificacion()
    this.getIndicadoresGestion()
    this.getUnidadOrganizativa()
  }

  getProductos() {
    this.apiProducto.getProducto(this.exactUnit.nombre).subscribe((res: any) => { this.productos = res.data;})
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas().subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getEstructuraPro() {
    this.apiEstruturaPro.getEstructurasProgramaticas().subscribe((res: any) => { this.estructurasPro = res.data })
  }

  getFrecuencia() {
    this.apiIndicadoresGestion.getFrecuencia().subscribe((res: any) => { this.frecuencias = res.data })
  }

  getAlcance() {
    this.apiIndicadoresGestion.getAlcance().subscribe((res: any) => { this.alcances = res.data })
  }

  getIndicadoresGestion() {
    this.apiIndicadoresGestion.getIndicadorGestion().subscribe((res: any) => { this.indicadoresGestion = res.data })
  }

  getMedioVerificacion() {
    this.medioVerifService.getMedioVerificacion().subscribe((res: any) => { this.mediosVerificacion = res.data;})
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
      meta: indicadoresGestion.meta,
      nombre: indicadoresGestion.nombre,
      lineaBase: indicadoresGestion.lineaBase,
      idAlcance: indicadoresGestion.alcance.id,
      idProducto: indicadoresGestion.producto.id,
      idFrecuencia: indicadoresGestion.frecuencia.id,
      idResponsable: indicadoresGestion.responsables.id,
      idTipoIndicador: indicadoresGestion.tipoIndicador.id,
      idEstructuraProgramatica: indicadoresGestion.estructuraProgramatica.id,
      mediosVerificaciones: indicadoresGestion.mediosverificaciones.map((medioVer: MedioVerificacionI)=>{ return medioVer.id}),
    })
  }

  openDetailModalView(elementoList: any[], nombre: string, entidad: string) { this.dialog.open(EntidadListViewComponent, { data: {elementoList, entidad, nombre} })}

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putIndicadoresGestion(), this.indicadoresGestionForm, () => this.postIndicadoresGestion())
  }
}
