import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActividadesService } from '../../services/actividades.service';
import { alertRemoveSure } from 'src/app/alerts/alerts';
import { EstadoI, FrecuenciaI, MunicipioI, ProvinciaI, RegionesI, MesesI, CategoriaInsumosI, UnidadesMedidaI, InsumosI, CosteoDetallesI, CosteoI, CosteoDetallesGroupI } from '../../interfaces/formulacion.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsableService } from '../../../mantenimiento/components/mantenimiento-pei/services/reponsable.service';
import { ResponsableI } from '../../../mantenimiento/components/mantenimiento-pei/interfaces/responsable.interface';
import { InvolucradoI } from '../../../mantenimiento/components/mantenimiento-pei/interfaces/involucrado.interface';
import { involucradoService } from '../../../mantenimiento/components/mantenimiento-pei/services/involucrado.service';
import { HelperService } from 'src/app/services/appHelper.service';
import { PresupuestoInstitucionalService } from '../../../mantenimiento/services/presupuestoInstitucional.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-actividades-formulacion',
  templateUrl: './actividades-formulacion.component.html',
  styleUrls: ['./actividades-formulacion.component.css']
})
export class ActividadesFormulacionComponent implements OnInit {

  idProducto: number = 0
  idActividad: number = 0
  presupuestosInst: number = 0

  insumoForm: FormGroup;
  actividadForm: FormGroup;
  cantidadTotal: number = 0
  showMontoTotal: number = 0
  insumosGroup: Array<CosteoDetallesGroupI> = [];

  cargoList: any[] = [];
  mesesList: Array<MesesI> = [];
  insumoList: Array<InsumosI> = [];
  estadosList: Array<EstadoI> = [];
  regionesList: Array<RegionesI> = [];
  provinciasList: Array<ProvinciaI> = [];
  MunicipiosList: Array<MunicipioI> = [];
  frecuenciaList: Array<FrecuenciaI> = [];
  involucradoList: Array<InvolucradoI> = [];
  responsableList: Array<ResponsableI> = [];
  UnidadesMedidaList: Array<UnidadesMedidaI> = [];
  categoriaInsumoList: Array<CategoriaInsumosI> = [];

  insumoListFilter: Array<InsumosI> = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private helperHandler: HelperService,
    private actividadesService: ActividadesService,
    private responsableService: ResponsableService,
    private involucradoService: involucradoService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {
    this.actividadForm = this.fb.group({
      id: 0,
      idProducto: 0,
      idPresupuestoInstitucional: 0,
      nombre: new FormControl<string>('', Validators.required),
      idFrecuencia: new FormControl<number>(0, Validators.required),
      idEstado: new FormControl<number>(1, Validators.required),
      idResponsableUnidad: new FormControl<number>(0, Validators.required),
      idResponsableCargo: new FormControl<number>(0, Validators.required),
      esPrevista: new FormControl<boolean>(true, Validators.required),
      avance: new FormControl<number>(0),

      costeo: this.fb.group({
        montoTotalEstimado: 0,
        costeoDetalles: this.fb.array([])
      }),

      mesesImpacto: new FormControl(0, Validators.required),
      involucrados: new FormControl(0, Validators.required),

      resultadoEsperadoCuantitativoT1: new FormControl<number>(0, Validators.required),
      resultadoEsperadoCuantitativoT2: new FormControl<number>(0, Validators.required),
      resultadoEsperadoCuantitativoT3: new FormControl<number>(0, Validators.required),
      resultadoEsperadoCuantitativoT4: new FormControl<number>(0, Validators.required),
      resultadoEsperadoCualitativoT1: new FormControl<string>('', Validators.required),
      resultadoEsperadoCualitativoT2: new FormControl<string>('', Validators.required),
      resultadoEsperadoCualitativoT3: new FormControl<string>('', Validators.required),
      resultadoEsperadoCualitativoT4: new FormControl<string>('', Validators.required),
    })

    this.insumoForm = this.fb.group({
      montoTotal: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      idInsumo: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      auxiliar: new FormControl('', Validators.required),
      idCategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      costoUnitario: new FormControl('', Validators.required),
      idUnidadMedida: new FormControl('', Validators.required),
      fechaRecepcion: new FormControl('', Validators.required),
      descripcionInsumo: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.idProducto = parseInt(params['id']);
      this.actividadForm.patchValue({ idProducto: this.idProducto })

      if (params['idAct'] !== undefined) {
        this.idActividad = parseInt(params['idAct']);
        this.getByIdActividades()
      }
    });

    this.getMeses()
    this.getCargos()
    this.getestados();
    this.getInsumos();
    this.getRegiones();
    this.getProvinvias();
    this.getMunicipios();
    this.getFrecuencia();
    this.getResponsable();
    this.getInvolucrado();
    this.getUnidadesMedida();
    this.getCategoriaInsumos();
    this.getPresupuestoInstitucional()
  }

  backToProucto() {
    this.router.navigate(['dashboard/formulacion/producto'], { queryParams: { id: this.idProducto } });
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(true)
      .subscribe((res: any) => { this.actividadForm.patchValue({ idPresupuestoInstitucional: res.data[0].id })})
  }

  getByIdActividades() {
    this.actividadesService.getByIdActividades(this.idActividad)
      .subscribe((res: any) => {
        console.log(res);
        
        const { data } = res

        this.actividadForm.patchValue({
          id: data.id,
          idProducto: data.producto.id,
          nombre: data.nombre,
          idFrecuencia: data.frecuencia.id,
          idEstado: data.estado.id,
          idResponsableUnidad: data.responsableUnidad.id,
          idResponsableCargo: data.responsableCargo.id,
          esPrevista: data.esPrevista,

          mesesImpacto: data.mesesImpacto,
          involucrados: data.involucrados,

          resultadoEsperadoCuantitativoT1: data.resultadoEsperadoCuantitativoT1,
          resultadoEsperadoCuantitativoT2: data.resultadoEsperadoCuantitativoT2,
          resultadoEsperadoCuantitativoT3: data.resultadoEsperadoCuantitativoT3,
          resultadoEsperadoCuantitativoT4: data.resultadoEsperadoCuantitativoT4,
          resultadoEsperadoCualitativoT1: data.resultadoEsperadoCualitativoT1,
          resultadoEsperadoCualitativoT2: data.resultadoEsperadoCualitativoT2,
          resultadoEsperadoCualitativoT3: data.resultadoEsperadoCualitativoT3,
          resultadoEsperadoCualitativoT4: data.resultadoEsperadoCualitativoT4,
        })

        data.costeo.costeoDetalle.map((insumos: any) => {
          console.log(insumos);
          
          this.insumoForm.patchValue({
            montoTotal: insumos.montoTotal,
            nombre: insumos.insumo.nombre,
            idInsumo: insumos.insumo.id,
            cantidad: insumos.cantidad,
            auxiliar: insumos.insumo.auxiliar.id,
            idCategoria: insumos.insumo.categoriaInsumo.id,
            descripcion: insumos.insumo.descripcion,
            costoUnitario: insumos.costoUnitario,
            idUnidadMedida: insumos.unidadMedida.id,
            fechaRecepcion: insumos.fechaRecepcion,
            descripcionInsumo: insumos.descripcionInsumo,
          })

          this.agregarInsumoAlObjeto()
        })
      })
  }

  getRegiones() {
    this.actividadesService.getRegiones().subscribe((resp: any) => { this.regionesList = resp.data; })
  }

  getCargos() {
    this.actividadesService.getCargos().subscribe((resp: any) => { this.cargoList = resp.data; })
  }

  getProvinvias() {
    this.actividadesService.getProvincias().subscribe((resp: any) => { this.provinciasList = resp.data; })
  }

  getMunicipios() {
    this.actividadesService.getMunicipios().subscribe((resp: any) => { this.MunicipiosList = resp.data; })
  }

  getestados() {
    this.actividadesService.getEstados().subscribe((resp: any) => { this.estadosList = resp.data; })
  }

  getFrecuencia() {
    this.actividadesService.getFrecuencias().subscribe((resp: any) => { this.frecuenciaList = resp.data; })
  }

  getResponsable() {
    this.responsableService.getResponsable().subscribe((resp: any) => { this.responsableList = resp.data; })
  }

  getInvolucrado() {
    this.involucradoService.getInvolucrado().subscribe((resp: any) => { this.involucradoList = resp.data; })
  }

  getMeses() {
    this.actividadesService.getMeses().subscribe((resp: any) => { this.mesesList = resp.data; })
  }

  getInsumos() {
    this.actividadesService.getInsumos().subscribe((resp: any) => { this.insumoList = resp.data; this.insumoListFilter = this.insumoList; })
  }

  getUnidadesMedida() {
    this.actividadesService.getUnidadesMedida().subscribe((resp: any) => { this.UnidadesMedidaList = resp.data; })
  }

  getCategoriaInsumos() {
    this.actividadesService.getCategoriasInsumo().subscribe((resp: any) => { this.categoriaInsumoList = resp.data; })
  }

  postActividades() {
    this.actividadesService.postActividades(this.actividadForm.value)
      .subscribe((res: any) => {
        this.helperHandler.handleResponse(res, () => '', this.actividadForm)
        if (res.ok) { this.insumosGroup = []; this.sumaTotal()}
      })
  }

  putActividades(){
    this.actividadesService.putActividades(this.actividadForm.value)
    .subscribe((res: any) => {
      this.helperHandler.handleResponse(res, () => '', this.actividadForm)
      if (res.ok) { 
        this.insumosGroup = []; 
        this.sumaTotal() 
        this.backToProucto()
      }
    })
  }

  onSelectCategoria() {
    this.insumoListFilter = this.insumoList.filter(item => item.categoriaInsumo.id == this.insumoForm.get('idCategoria')!.value);
  }

  onSelectInsumo(insumo: string) {
    let selectInsumo = this.insumoList.filter(item => item.nombre == insumo);

    this.insumoForm.patchValue({
      descripcion: selectInsumo[0].descripcion,
      auxiliar: selectInsumo[0].auxiliar.id,
      idInsumo: selectInsumo[0].id
    })
  }

  agregarInsumoAlObjeto() {
    if (this.insumoForm.valid) {
      this.insumoForm.value.fechaRecepcion = format(this.insumoForm.value.fechaRecepcion, 'yyyy-MM-dd');
      this.insumosGroup.push(this.insumoForm.value)
      this.insumoForm.reset()
      this.sumaTotal()
    }
  }

  editInsumo(insumo: CosteoDetallesI, index: number) {
    this.insumoForm.reset(insumo)
    this.insumosGroup.splice(index, 1)
    this.sumaTotal()
  }

  async removeInsumo(index: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el insumo?")

    if (removeDecision) {
      this.insumosGroup.splice(index, 1)
      this.sumaTotal()
    }
  }

  calculateMontoTotal() {
    this.insumoForm.patchValue({ montoTotal: this.insumoForm.value.cantidad * this.insumoForm.value.costoUnitario })
  }

  sumaTotal() {
    this.showMontoTotal = 0
    this.cantidadTotal = 0
    this.insumosGroup.map((monto: CosteoDetallesI) => {
      this.showMontoTotal += monto.montoTotal
      this.cantidadTotal += monto.cantidad
    })
  }

  saveChanges() {
    
    this.actividadForm.value.costeo.costeoDetalles = this.insumosGroup
    this.actividadForm.value.costeo.montoTotalEstimado = this.showMontoTotal
    this.helperHandler.saveChanges(() => this.putActividades(), this.actividadForm, () => this.postActividades())
  }
}
