import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { ProductoService } from '../../services/producto.service';
import { HelperService } from 'src/app/services/appHelper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FrecuenciaI } from '../../../formulacion/interfaces/formulacion.interface';
import { IndicadorGestionService } from '../../services/indicadores-gestion.service';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { EstructuraProgramaticaService } from '../../services/estructura-programatica.service';
import { EstructuraProgramaticaI, IndicadoresGestionGetI, ProductoI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { MedioVerificacionService } from '../mantenimiento-pei/services/medio-verificacion.service';
import { MedioVerificacionI } from '../mantenimiento-pei/interfaces/medio-verificacion.interface';
import { EntidadListViewComponent } from '../../modals/entidad-list-view/responsible-view.component';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-indicadores-gestion',
  templateUrl: './indicadores-gestion.component.html',
  styleUrls: ['./indicadores-gestion.component.css']
})
export class IndicadoresGestionComponent implements OnInit {

  page: number = 1
  alcances: any[] = []
  pagination!: PaginationI
  productos: ProductoI[] = []
  unidadesOrg: subUnidadI[] = []
  frecuencias: FrecuenciaI[] = []
  indicadoresGestionForm: FormGroup;
  mediosVerificacion: MedioVerificacionI[] = [];
  indicadoresGestion!: IndicadoresGestionGetI[]
  estructurasPro: EstructuraProgramaticaI[] = []
  modulo = this.userSystemService.modulosSis
  idPresupuesto: number = 0
  // exactUnit: subUnit = this.userSystemService.getUnitOrg

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private apiProducto: ProductoService,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private medioVerifService: MedioVerificacionService,
    private apiIndicadoresGestion: IndicadorGestionService,    
    private apiEstruturaPro: EstructuraProgramaticaService,
    private userSystemService: UserSystemInformationService,  
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      idPresupuesto: 0,
      meta: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      lineaBase: new FormControl('', Validators.required),
      idAlcance: new FormControl('', Validators.required),
      idProducto: new FormControl('', Validators.required),
      idFrecuencia: new FormControl('', Validators.required),
      esPorcentual: new FormControl('', Validators.required),
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
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(this.page, true)
      .subscribe((res: any) => { 
        if ( res.data.length > 0){
          this.idPresupuesto =  res.data[0].id
          this.indicadoresGestionForm.patchValue({ idPresupuesto: this.idPresupuesto }) 
        }
      })
  }

  getProductos() {
    this.apiProducto.getProducto(1,100).subscribe((res: any) => { this.productos = res.data;})
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas().subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getUnidadOrganizativaRecintos() {
    this.apiUnidadOrg.getUnidadesOrganizativasRecintos().subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getEstructuraPro() {
    this.apiEstruturaPro.getEstructurasProgramaticas(1,100).subscribe((res: any) => { this.estructurasPro = res.data })
  }

  getFrecuencia() {
    this.apiIndicadoresGestion.getFrecuencia().subscribe((res: any) => { this.frecuencias = res.data })
  }

  getAlcance() {
    this.apiIndicadoresGestion.getAlcance().subscribe((res: any) => { this.alcances = res.data })
  }

  getIndicadoresGestion() {
    this.apiIndicadoresGestion.getIndicadorGestion(this.page).subscribe((res: any) => { this.indicadoresGestion = res.data; this.pagination = res.pagination; })
  }

  getMedioVerificacion() {
    this.medioVerifService.getMedioVerificacion(1,100).subscribe((res: any) => { this.mediosVerificacion = res.data;})
  }

  postIndicadoresGestion() {
    this.apiIndicadoresGestion.postIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getIndicadoresGestion(), this.indicadoresGestionForm, ()=> this.getPresupuestoInstitucional()) })
  }

  putIndicadoresGestion() {
    this.apiIndicadoresGestion.putIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getIndicadoresGestion(), this.indicadoresGestionForm, ()=> this.getPresupuestoInstitucional()) })
  }

  async deleteIndicadoresGestion(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

    if (removeDecision) {
      loading(true)
      this.apiIndicadoresGestion.removeIndicadorGestion(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getIndicadoresGestion(), this.indicadoresGestionForm, ()=> this.getPresupuestoInstitucional()) })
    }
  }

  setPossiblesResp(idAlcance: number){
    if (idAlcance != 2) this.getUnidadOrganizativaRecintos()
    else this.getUnidadOrganizativa()
  }

  async setValueEditIndicadoresGestion(indicadoresGestion: IndicadoresGestionGetI) {

    await this.setPossiblesResp(indicadoresGestion.alcance.id)

    this.indicadoresGestionForm.patchValue({
      id: indicadoresGestion.id,
      meta: indicadoresGestion.meta,
      nombre: indicadoresGestion.nombre,
      idPresupuesto: this.idPresupuesto,
      lineaBase: indicadoresGestion.lineaBase,
      idAlcance: indicadoresGestion.alcance.id,
      idProducto: indicadoresGestion.producto.id,
      esPorcentual: indicadoresGestion.esPorcentual,
      idFrecuencia: indicadoresGestion.frecuencia.id,
      idResponsable: indicadoresGestion.responsables.id,
      idTipoIndicador: indicadoresGestion.tipoIndicador.id,
      idEstructuraProgramatica: indicadoresGestion.estructuraProgramatica.id,
      mediosVerificaciones: indicadoresGestion.mediosverificaciones.map((medioVer: MedioVerificacionI)=>{ return medioVer.id}),
    })
  }

  openDetailModalView(elementoList: any[], nombre: string, entidad: string) { this.dialog.open(EntidadListViewComponent, { data: {elementoList, entidad, nombre} })}

  clearForm(){
    this.indicadoresGestionForm.reset()
    this.indicadoresGestionForm.patchValue({ idPresupuesto: this.idPresupuesto })
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putIndicadoresGestion(), this.indicadoresGestionForm, () => this.postIndicadoresGestion())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getIndicadoresGestion()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getIndicadoresGestion()
    }
  }
}
