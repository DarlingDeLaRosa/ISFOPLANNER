import { Component, OnInit } from '@angular/core';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { ResultadoEfectoService } from '../services/resultadoEfecto.service';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/appHelper.service';
import { MedioVerificacionService } from '../services/medio-verificacion.service';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { RequerimientosService } from '../services/requerimientos.service';
import { RequerimientoI } from '../interfaces/requerimientos.interface';
import { ResponsableService } from '../services/reponsable.service';
import { ResponsableI } from '../interfaces/responsable.interface';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { MatDialog } from '@angular/material/dialog';
import { EntidadListViewComponent } from '../../../modals/entidad-list-view/responsible-view.component';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'app-indicadores-estrategicos',
  templateUrl: './indicadores-estrategicos.component.html',
  styleUrls: ['./indicadores-estrategicos.component.css']
})
export class IndicadoresEstrategicosComponent implements OnInit {

  IndicadorEstrForm: FormGroup;
  responsables: Array<ResponsableI> = [];
  requerimientos: Array<RequerimientoI> = [];
  resultadosEfecto: Array<ResultadoEfectoI> = [];
  supuestosRiesgos: Array<SupuestosRiesgosI> = [];
  mediosVerificacion: Array<MedioVerificacionI> = [];
  indicadoresEstrategicos!: Array<IndicadoresEstrategicosI>;
  modulo = this.userSystemService.modulosSis
  
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private responsablesService: ResponsableService,
    private requerimientosService: RequerimientosService,
    private resultadoEfectoService: ResultadoEfectoService,
    private supuestoRiesgoService: SupuestosRiesgosService,
    private userSystemService: UserSystemInformationService,
    private medioVerificacionService: MedioVerificacionService,
    private indicadoresEstraService: IndicadorEstrategicoService,
  ) {
    this.IndicadorEstrForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      meta: new FormControl<number>(0, Validators.required),
      requerimientos: new FormControl('', Validators.required),
      lineaBase: new FormControl<number>(0, Validators.required),
      supuestosRiesgos: new FormControl('', Validators.required),
      mediosVerificaciones: new FormControl('', Validators.required),
      idTipoIndicador: new FormControl('', Validators.required),
      esPorcentual: new FormControl('', Validators.required),
      idResultadoefecto: new FormControl<number>(0, Validators.required),
      responsables: new FormControl('', Validators.required),

      cronograma: this.fb.group({
        anio1: new FormControl('', Validators.required),
        anio2: new FormControl('', Validators.required),
        anio3: new FormControl('', Validators.required),
        anio4: new FormControl('', Validators.required),

        metaAnio1: new FormControl('', Validators.required),
        metaAnio2: new FormControl('', Validators.required),
        metaAnio3: new FormControl('', Validators.required),
        metaAnio4: new FormControl('', Validators.required),
      }),
    })
  }

  ngOnInit(): void {
    this.getAllResponsables()
    // this.getAllInvolucrados()
    this.getAllRequerimientos()
    this.getAllSupuestoRiesgos()
    this.getAllResultadoEfecto()
    this.getAllMedioVerificacion()
    this.getAllIndicadoresEstrategicos()
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto().subscribe((resp: any) => { this.resultadosEfecto = resp.data; })
  }

  getAllIndicadoresEstrategicos() {
    this.indicadoresEstraService.getIndicadoresEstrategicos().subscribe((resp: any) => { this.indicadoresEstrategicos = resp.data; console.log(this.indicadoresEstrategicos); })
  }

  getAllMedioVerificacion() {
    this.medioVerificacionService.getMedioVerificacion().subscribe((resp: any) => { this.mediosVerificacion = resp.data; })
  }

  getAllRequerimientos() {
    this.requerimientosService.getRequerimientos().subscribe((resp: any) => { this.requerimientos = resp.data; })
  }

  getAllResponsables() {
    this.responsablesService.getResponsable().subscribe((resp: any) => { this.responsables = resp.data; })
  }

  getAllSupuestoRiesgos() {
    this.supuestoRiesgoService.getSupuestosRiesgos().subscribe((resp: any) => { this.supuestosRiesgos = resp.data; })
  }

  setValueIndicadoresEstrategicos(indicadorEstrategico: IndicadoresEstrategicosI) {
    
    this.IndicadorEstrForm.patchValue({
      id: indicadorEstrategico.id,
      nombre: indicadorEstrategico.nombre,
      lineaBase: indicadorEstrategico.lineaBase,
      meta: indicadorEstrategico.meta,
      esPorcentual: indicadorEstrategico.esPorcentual,
      requerimientos: indicadorEstrategico.requerimientos.map((requerimiento: RequerimientoI)=>{ return requerimiento.id}),
      supuestosRiesgos: indicadorEstrategico.supuestosRiesgos.map((supuestosRiesgo: SupuestosRiesgosI)=>{ return supuestosRiesgo.id}),
      mediosVerificaciones: indicadorEstrategico.mediosverificaciones.map((mediosverificacione: MedioVerificacionI)=>{ return mediosverificacione.id}),
      idResultadoefecto: indicadorEstrategico.resultadoEfecto.id,
      idTipoIndicador: indicadorEstrategico.tipoIndicador.id,
      responsables: indicadorEstrategico.responsables.map((responsable: ResponsableI)=>{ return responsable.id}),
    });

    this.IndicadorEstrForm.get('cronograma')?.reset(indicadorEstrategico.cronograma)
  }

  postIndicadoresEstrategicos() {
    this.indicadoresEstraService.postIndicadoresEstrategicos(this.IndicadorEstrForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllIndicadoresEstrategicos(), this.IndicadorEstrForm) })
  }

  putIndicadoresEstrategicos() {
    this.indicadoresEstraService.putIndicadoresEstrategicos(this.IndicadorEstrForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllIndicadoresEstrategicos(), this.IndicadorEstrForm) })
  }

  async deleteIndicadoresEstrategicos(indicadorEstrategico: IndicadoresEstrategicosI) {
    let remove: boolean = await alertRemoveSure("¿Estas seguro de eliminar este indicador estrategico?")

    if (remove) {
      loading(true)
      this.indicadoresEstraService.deleteIndicadoresEstrategicos(indicadorEstrategico.id!)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllIndicadoresEstrategicos(), this.IndicadorEstrForm) })
    }
  }

  openModal(elementoList: any[], nombre: string, entidad: string) {
    this.dialog.open(EntidadListViewComponent, { data: { elementoList, nombre, entidad } })
  }

  saveChanges() {
    const {idTipoIndicador, lineaBase } = this.IndicadorEstrForm.value
    const {metaAnio1, metaAnio2, metaAnio3, metaAnio4} = this.IndicadorEstrForm.value.cronograma

    if (idTipoIndicador == 1 && idTipoIndicador != '') { this.IndicadorEstrForm.patchValue({meta: Math.max(metaAnio1, metaAnio2, metaAnio3, metaAnio4)})}
    else { this.IndicadorEstrForm.patchValue({meta: metaAnio1 + metaAnio2 + metaAnio3 + metaAnio4 })}
    
    this.helperHandler.saveChangesIndicadores(() => this.putIndicadoresEstrategicos(), this.IndicadorEstrForm, () => this.postIndicadoresEstrategicos(), lineaBase, this.IndicadorEstrForm.value.meta)
  }
}



