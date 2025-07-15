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
import { PaginationI } from 'src/app/interfaces/Response.interfaces';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-indicadores-estrategicos',
  templateUrl: './indicadores-estrategicos.component.html',
  styleUrls: ['./indicadores-estrategicos.component.css']
})
export class IndicadoresEstrategicosComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  indicadorEstrForm: FormGroup;
  responsables: Array<ResponsableI> = [];
  requerimientos: Array<RequerimientoI> = [];
  resultadosEfecto: Array<ResultadoEfectoI> = [];
  supuestosRiesgos: Array<SupuestosRiesgosI> = [];
  mediosVerificacion: Array<MedioVerificacionI> = [];
  indicadoresEstrategicos!: Array<IndicadoresEstrategicosI>;
  modulo = this.userSystemService.modulosSis
  
  medioCtrl = new FormControl<MedioVerificacionI | string>('');
  supuestoCtrl = new FormControl<SupuestosRiesgosI | string>('');
  requerimientoCtrl = new FormControl<RequerimientoI | string>('');

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
    this.indicadorEstrForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      meta: new FormControl<number>(0, Validators.required),
      requerimientos: new FormControl('', Validators.required),
      lineaBase: new FormControl<number>(0, Validators.required),
      supuestosRiesgos: new FormControl('', Validators.required),
      mediosVerificaciones: new FormControl(''),
      idTipoIndicador: new FormControl('', Validators.required),
      esPorcentual: new FormControl('', Validators.required),
      idResultadoefecto: new FormControl('', Validators.required),
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

    this.filteredMedios = this.medioCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.nombre ?? ''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(nombre => this._filtrarMedios(nombre))
    );

    this.filteredSupuestos = this.supuestoCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.nombre ?? ''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(nombre => this._filtrarSupuestos(nombre))
    );

    this.filteredRequerimientos = this.requerimientoCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.nombre ?? ''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(nombre => this._filtrarRequerimientos(nombre))
    );
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

  displayName(name: any): string {
    return name ? `${name.nombre}` : '';
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto(1, 10, this.indicadorEstrForm.value.idResultadoefecto ).subscribe((resp: any) => { this.resultadosEfecto = resp.data; })
  }

  getAllIndicadoresEstrategicos() {
    this.indicadoresEstraService.getIndicadoresEstrategicos(this.page).subscribe((resp: any) => { this.indicadoresEstrategicos = resp.data;  this.pagination = resp.pagination; })
  }

  getAllMedioVerificacion() {
    this.medioVerificacionService.getMedioVerificacion(1,200).subscribe((resp: any) => { this.mediosVerificacion = resp.data; })
  }

  getAllRequerimientos() {
    this.requerimientosService.getRequerimientos(1,200).subscribe((resp: any) => { this.requerimientos = resp.data; })
  }

  getAllResponsables() {
    this.responsablesService.getResponsable().subscribe((resp: any) => { this.responsables = resp.data; })
  }

  getAllSupuestoRiesgos() {
    this.supuestoRiesgoService.getSupuestosRiesgos(1,200).subscribe((resp: any) => { this.supuestosRiesgos = resp.data; })
  }

  async setValueIndicadoresEstrategicos(indicadorEstrategico: IndicadoresEstrategicosI) {
    
    this.medioVerificacionService.getMedioVerificacion(1, 500).subscribe((res: any) => {
      const allMedios: MedioVerificacionI[] = res.data;
      this.mediosSeleccionados = allMedios.filter(m =>
        indicadorEstrategico.mediosverificaciones.some((mv: MedioVerificacionI) => mv.id === m.id)
      );
      this._actualizarMediosVerificacionIds();
    });
    
    this.medioVerificacionService.getMedioVerificacion(1, 500).subscribe((res: any) => {
      const allSupuestos: SupuestosRiesgosI[] = res.data;
      this.supuestosSeleccionados = allSupuestos.filter(m =>
        indicadorEstrategico.supuestosRiesgos.some((mv: SupuestosRiesgosI) => mv.id === m.id)
      );
      this._actualizarSupuestosIds();
    });

    this.requerimientosService.getRequerimientos(1, 500).subscribe((res: any) => {
      const allreq: RequerimientoI[] = res.data;
      this.requerimientosSeleccionados = allreq.filter(m =>
        indicadorEstrategico.requerimientos.some((mv:RequerimientoI) => mv.id === m.id)
      );
      this._actualizarRequerimientosIds();
    });

    this.indicadorEstrForm.patchValue({
      id: indicadorEstrategico.id,
      nombre: indicadorEstrategico.nombre,
      lineaBase: indicadorEstrategico.lineaBase,
      meta: indicadorEstrategico.meta,
      esPorcentual: indicadorEstrategico.esPorcentual,
      requerimientos: indicadorEstrategico.requerimientos.map((requerimiento: RequerimientoI)=>{ return requerimiento.id}),
      supuestosRiesgos: indicadorEstrategico.supuestosRiesgos.map((supuestosRiesgo: SupuestosRiesgosI)=>{ return supuestosRiesgo.id}),
      mediosVerificaciones: indicadorEstrategico.mediosverificaciones.map((mediosverificacione: MedioVerificacionI)=>{ return mediosverificacione.id}),
      idResultadoefecto: indicadorEstrategico.resultadoEfecto,
      idTipoIndicador: indicadorEstrategico.tipoIndicador.id,
      responsables: indicadorEstrategico.responsables.map((responsable: ResponsableI)=>{ return responsable.id}),
    });

    this.indicadorEstrForm.get('cronograma')?.reset(indicadorEstrategico.cronograma)
  }

  postIndicadoresEstrategicos() {
    this.indicadoresEstraService.postIndicadoresEstrategicos(this.indicadorEstrForm.value)
      .subscribe((res: any) => { 
        this.helperHandler.handleResponse(res, () => this.getAllIndicadoresEstrategicos(), this.indicadorEstrForm) 
        this.clearForm()
      })
  }

  putIndicadoresEstrategicos() {
    this.indicadoresEstraService.putIndicadoresEstrategicos(this.indicadorEstrForm.value)
      .subscribe((res: any) => { 
        this.helperHandler.handleResponse(res, () => this.getAllIndicadoresEstrategicos(), this.indicadorEstrForm) 
        this.clearForm()
      })
  }

  async deleteIndicadoresEstrategicos(indicadorEstrategico: IndicadoresEstrategicosI) {
    let remove: boolean = await alertRemoveSure("¿Estas seguro de eliminar este indicador estrategico?")

    if (remove) {
      loading(true)
      this.indicadoresEstraService.deleteIndicadoresEstrategicos(indicadorEstrategico.id!)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllIndicadoresEstrategicos(), this.indicadorEstrForm) })
    }
  }

  clearForm() {
    this.indicadorEstrForm.reset()

    this.mediosSeleccionados = [];
    this.medioCtrl.setValue('');
    this.medioCtrl.markAsPristine();
    this.medioCtrl.markAsUntouched();

    this.requerimientosSeleccionados = [];
    this.requerimientoCtrl.setValue('');
    this.requerimientoCtrl.markAsPristine();
    this.requerimientoCtrl.markAsUntouched();

    this.supuestosSeleccionados = [];
    this.supuestoCtrl.setValue('');
    this.supuestoCtrl.markAsPristine();
    this.supuestoCtrl.markAsUntouched();
  }

  openModal(elementoList: any[], nombre: string, entidad: string) {
    this.dialog.open(EntidadListViewComponent, { data: { elementoList, nombre, entidad } })
  }

  saveChanges() {
    let resEfect = this.indicadorEstrForm.value
    this.indicadorEstrForm.patchValue({
      idResultadoefecto: resEfect.idResultadoefecto.id
    })
    const { idTipoIndicador, lineaBase } = this.indicadorEstrForm.value
    const {metaAnio1, metaAnio2, metaAnio3, metaAnio4} = this.indicadorEstrForm.value.cronograma
    
    if (idTipoIndicador == 1 && idTipoIndicador != '') { this.indicadorEstrForm.patchValue({meta: Math.max(metaAnio1, metaAnio2, metaAnio3, metaAnio4)})}
    else { this.indicadorEstrForm.patchValue({meta: metaAnio1 + metaAnio2 + metaAnio3 + metaAnio4 })}
    
    this.helperHandler.saveChangesIndicadores(() => this.putIndicadoresEstrategicos(), this.indicadorEstrForm, () => this.postIndicadoresEstrategicos(), lineaBase, this.indicadorEstrForm.value.meta)
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getAllIndicadoresEstrategicos()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getAllIndicadoresEstrategicos()
    }
  }
  // Filter de Multiselects 

  separatorKeysCodes: number[] = [ENTER, COMMA];

  mediosSeleccionados: MedioVerificacionI[] = [];
  supuestosSeleccionados: SupuestosRiesgosI[] = [];
  requerimientosSeleccionados: RequerimientoI[] = [];
  
  filteredMedios!: Observable<MedioVerificacionI[]>;
  filteredSupuestos!: Observable<SupuestosRiesgosI[]>;
  filteredRequerimientos!: Observable<RequerimientoI[]>;

  private _filtrarMedios(valor: string): Observable<MedioVerificacionI[]> {
    const filtro = valor.toLowerCase();
    return this.medioVerificacionService.getMedioVerificacion(1, 10, filtro).pipe(
      map((res: any) => {
        const data: MedioVerificacionI[] = res.data || [];
        return data.filter((medio: MedioVerificacionI) =>
          !this.mediosSeleccionados.some(m => m.id === medio.id)
        );
      })
    );
  }

  private _filtrarSupuestos(valor: string): Observable<SupuestosRiesgosI[]> {
    const filtro = valor.toLowerCase();
    return this.supuestoRiesgoService.getSupuestosRiesgos(1, 10, filtro).pipe(
      map((res: any) => {
        const data: SupuestosRiesgosI[] = res.data || [];
        return data.filter((supuesto: SupuestosRiesgosI) =>
          !this.supuestosSeleccionados.some(m => m.id === supuesto.id)
        );
      })
    );
  }

  private _filtrarRequerimientos(valor: string): Observable<RequerimientoI[]> {
    const filtro = valor.toLowerCase();
    return this.requerimientosService.getRequerimientos(1, 10, filtro).pipe(
      map((res: any) => {
        const data: RequerimientoI[] = res.data || [];
        return data.filter((requerimiento: RequerimientoI) =>
          !this.requerimientosSeleccionados.some(m => m.id === requerimiento.id)
        );
      })
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    if (input) input.value = '';
    this.medioCtrl.setValue('');
  }

  addSp(event: MatChipInputEvent): void {
    const input = event.input;
    if (input) input.value = '';
    this.supuestoCtrl.setValue('');
  }

  addRq(event: MatChipInputEvent): void {
    const input = event.input;
    if (input) input.value = '';
    this.requerimientoCtrl.setValue('');
  }

  remove(medio: MedioVerificacionI): void {
    const index = this.mediosSeleccionados.findIndex(m => m.id === medio.id);
    if (index >= 0) {
      this.mediosSeleccionados.splice(index, 1);
      this._actualizarMediosVerificacionIds();
    }
  }

  removeSp(supuesto: SupuestosRiesgosI): void {
    const index = this.supuestosSeleccionados.findIndex(m => m.id === supuesto.id);
    if (index >= 0) {
      this.supuestosSeleccionados.splice(index, 1);
      this._actualizarMediosVerificacionIds();
    }
  }

  removeRq(req: RequerimientoI): void {
    const index = this.requerimientosSeleccionados.findIndex(m => m.id === req.id);
    if (index >= 0) {
      this.requerimientosSeleccionados.splice(index, 1);
      this._actualizarMediosVerificacionIds();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const medio = event.option.value as MedioVerificacionI;
    if (!this.mediosSeleccionados.some(m => m.id === medio.id)) {
      this.mediosSeleccionados.push(medio);
      this._actualizarMediosVerificacionIds();
    }
    this.medioCtrl.setValue('');
  }

  selectedSp(event: MatAutocompleteSelectedEvent): void {
    const supuesto = event.option.value as SupuestosRiesgosI;
    if (!this.supuestosSeleccionados.some(m => m.id === supuesto.id)) {
      this.supuestosSeleccionados.push(supuesto);
      this._actualizarSupuestosIds();
    }
    this.supuestoCtrl.setValue('');
  }

  selectedRq(event: MatAutocompleteSelectedEvent): void {
    const req = event.option.value as RequerimientoI;
    if (!this.requerimientosSeleccionados.some(m => m.id === req.id)) {
      this.requerimientosSeleccionados.push(req);
      this._actualizarRequerimientosIds();
    }
    this.requerimientoCtrl.setValue('');
  }

  private _actualizarMediosVerificacionIds(): void {
    const ids = this.mediosSeleccionados.map(m => m.id);
    this.indicadorEstrForm.get('mediosVerificaciones')?.setValue(ids);
    this.indicadorEstrForm.get('mediosVerificaciones')?.markAsDirty();
    this.indicadorEstrForm.get('mediosVerificaciones')?.markAsTouched();
  }

  private _actualizarSupuestosIds(): void {
    const ids = this.supuestosSeleccionados.map(m => m.id);
    this.indicadorEstrForm.get('supuestosRiesgos')?.setValue(ids);
    this.indicadorEstrForm.get('supuestosRiesgos')?.markAsDirty();
    this.indicadorEstrForm.get('supuestosRiesgos')?.markAsTouched();
  }

  private _actualizarRequerimientosIds(): void {
    const ids = this.requerimientosSeleccionados.map(m => m.id);
    this.indicadorEstrForm.get('requerimientos')?.setValue(ids);
    this.indicadorEstrForm.get('requerimientos')?.markAsDirty();
    this.indicadorEstrForm.get('requerimientos')?.markAsTouched();
  }
}



