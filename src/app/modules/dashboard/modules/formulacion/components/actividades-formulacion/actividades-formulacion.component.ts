import { Component, Inject, OnInit } from '@angular/core';
import { NuevoInsumoComponent } from '../../modals/nuevo-insumo/nuevo-insumo.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActividadesService } from '../../services/actividades.service';
import { catchError } from 'rxjs';
import { alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { EstadoI, FrecuenciaI, MunicipioI, ProvinciaI, RegionesI, MesesI, ActividadI, CategoriaInsumosI, UnidadesMedidaI, InsumosI, CosteoDetallesI, CosteoI } from '../../interfaces/formulacion.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsableService } from '../../../mantenimiento/components/mantenimiento-pei/services/reponsable.service';
import { ResponsableI } from '../../../mantenimiento/components/mantenimiento-pei/interfaces/responsable.interface';
import { InvolucradoI } from '../../../mantenimiento/components/mantenimiento-pei/interfaces/involucrado.interface';
import { involucradoService } from '../../../mantenimiento/components/mantenimiento-pei/services/involucrado.service';
import { successMessageAlert } from '../../../../../../alerts/alerts';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-actividades-formulacion',
  templateUrl: './actividades-formulacion.component.html',
  styleUrls: ['./actividades-formulacion.component.css']
})
export class ActividadesFormulacionComponent implements OnInit {

  actividadForm: FormGroup;
  insumoForm:  FormGroup;
  cargoList: any[]= [];
  montoTotal: number = 0;
  descripcion: string = '';
  costeo: Array<CosteoI> = [];
  mesesList: Array<MesesI> = [];
  idProductorecibido: number = 0;
  estadosList: Array<EstadoI> = [];
  regionesList: Array<RegionesI> = [];
  provinciasList: Array<ProvinciaI> = [];
  MunicipiosList: Array<MunicipioI> = [];
  frecuenciaList: Array<FrecuenciaI> = [];
  involucradoList: Array<InvolucradoI> = [];
  responsableList: Array<ResponsableI> = [];

  insumoList: Array<InsumosI> = [];
  selectionado:Array<InsumosI> = [];
  insumoListFilter: Array<InsumosI> = [];
  insumoTable: Array<CosteoDetallesI> = [];
  UnidadesMedidaList: Array<UnidadesMedidaI> = [];
  categoriaInsumoList: Array<CategoriaInsumosI> = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private actividadesService: ActividadesService,
    private responsableService: ResponsableService,
    private involucradoService: involucradoService,

  ) {
    this.actividadForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre: new FormControl<string>('', Validators.required),
      idProducto: new FormControl<number>(this.idProductorecibido),
      idFrecuencia: new FormControl<number>(0, Validators.required),
      idEstado: new FormControl<number>(0, Validators.required),
      idResponsableUnidad: new FormControl<number>(0, Validators.required),
      idResponsableCargo: new FormControl<number>(0, Validators.required),
      esPrevista: new FormControl<boolean>(true, Validators.required),
      avance: new FormControl<number>(0),

      costeo: new FormGroup({
        montoTotalEstimado: new FormControl<number>(0),
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
      idInsumo: new FormControl<number>(0, Validators.required),
      costoUnitario: new FormControl<number>(0, Validators.required),
      cantidad: new FormControl<number>(0, Validators.required),
      montoTotal: new FormControl<number>(0),
      fechaRecepcion: new FormControl<string>('', Validators.required),
      idUnidadMedida: new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.idProductorecibido = params['numero'];
      console.log(this.idProductorecibido);
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
  }

  irProductos(){
    this.router.navigate(['dashboard/formulacion/producto'], { queryParams: {numero:this.idProductorecibido} });
  }

  getRegiones() {
    this.actividadesService.getRegiones().subscribe((resp: any) => { this.regionesList = resp.data;})
  }
  
  getCargos() {
    this.actividadesService.getCargos().subscribe((resp: any) => { this.cargoList = resp.data;})
  }

  getProvinvias() {
    this.actividadesService.getProvincias().subscribe((resp: any) => { this.provinciasList = resp.data;})
  }
  getMunicipios() {
    this.actividadesService.getMunicipios().subscribe((resp: any) => { this.MunicipiosList = resp.data;})
  }
  getestados() {
    this.actividadesService.getEstados().subscribe((resp: any) => { this.estadosList = resp.data;})
  }
  getFrecuencia() {
    this.actividadesService.getFrecuencias().subscribe((resp: any) => { this.frecuenciaList = resp.data;})
  }
  getResponsable() {
    this.responsableService.getResponsable().subscribe((resp: any) => { this.responsableList = resp.data;})
  }
  getInvolucrado() {
    this.involucradoService.getInvolucrado().subscribe((resp: any) => { this.involucradoList = resp.data; })
  }
  getMeses() {
    this.actividadesService.getMeses().subscribe((resp: any) => { this.mesesList = resp.data; })
  }

  postActividades() {
    this.actividadForm.get('idProducto')!.setValue(this.idProductorecibido);
    this.actividadForm.get('avance')!.setValue(1);
    this.actividadForm.get('esPrevista')!.setValue(true);

    // QUITA EL CAMPO ID DEL OBJETO
    const insumoTableCopy = this.insumoTable.map(objeto => {
      const { id, ...restoDeCampos } = objeto;
      return restoDeCampos;
    });
    console.log(insumoTableCopy);


    this.actividadForm.get('costeo.costeoDetalles')!.patchValue(insumoTableCopy);
    this.actividadForm.get('costeo.montoTotalEstimado')!.patchValue(this.montoTotal);

    console.log(this.actividadForm.value);
    this.actividadesService.postActividades(this.actividadForm.value)
      .subscribe((resp: any) => {
        successMessageAlert('La actividad fue creada correctamente');
        this.actividadForm.reset();
        this.insumoTable = [];
        this.insumoForm.reset();
      })
  }

  Guardar() {
    if (this.actividadForm.valid) {
      this.postActividades();
    } else {
      errorMessageAlert('Debe llenar todos lo campos requeridos del formulario')
    }
  }

  // Codigos de los insumos.

  get currentForm() {
    const form = this.insumoForm.value as CosteoDetallesI;
    return form;
  }

  getInsumos() {
    this.actividadesService.getInsumos()
      .subscribe((resp: any) => {
        this.insumoList = resp.data;
        this.insumoListFilter = this.insumoList;
      })
  }

  getUnidadesMedida() {
    this.actividadesService.getUnidadesMedida()
      .subscribe((resp: any) => {
        this.UnidadesMedidaList = resp.data;
      })
  }

  getCategoriaInsumos() {
    this.actividadesService.getCategoriasInsumo()
      .subscribe((resp: any) => {
        this.categoriaInsumoList = resp.data;
      })
  }

  onSelectCategoria() {
    const selection = this.insumoForm.get('idCategoria')!.value ;
    this.insumoListFilter = this.insumoList.filter(item => item.categoriaInsumo.id == selection);
  }

  onSelectInsumo(){

    const selection = this.insumoForm.get('idInsumo')!.value ;
    this.selectionado  = this.insumoList.filter(item => item.id == selection);
      this.descripcion = this.selectionado[0].descripcion;

  }

  agregarInsumoAlObjeto() {
    console.log(this.insumoForm.value);

    if (this.insumoForm.get('cantidad')!.value == 0 || this.insumoForm.get('costoUnitario')!.value == 0 ||  this.insumoForm.get('idInsumo')!.value == 0 || this.insumoForm.get('idUnidadMedida')!.value == 0  ||this.insumoForm.get('fechaRecepcion')!.value == '' ) {
      errorMessageAlert('Debe llenar todos lo campos requeridos del formulario')
      return
    }else{
      const nuevoId = uuidv4();
      this.insumoForm.get('id')!.setValue(nuevoId);
      this.insumoForm.patchValue({ montoTotal: this.insumoForm.get('cantidad')!.value * this.insumoForm.get('costoUnitario')!.value });


      this.montoTotal += this.insumoForm.get('cantidad')!.value * this.insumoForm.get('costoUnitario')!.value;

      // Asumiendo que fechaActual proviene de algún FormControl en tu formulario
      const fechaActual: Date | null = this.insumoForm.get('fechaRecepcion')!.value;

      if (fechaActual instanceof Date) {
        // Si fechaActual es una instancia de Date, puedes convertirla a cadena ISO
        const fechaFormateada: string = fechaActual.toISOString();

        this.insumoForm.get('fechaRecepcion')!.setValue(fechaFormateada);
        // Resto de tu lógica aquí...
      }


      this.insumoTable.push(this.insumoForm.value)

    }
  }


  eliminarObjeto(id: string): void {
    const index = this.insumoTable.findIndex(objeto => objeto.id === id);
    if (index !== -1) {
      const objetoAEliminar = this.insumoTable[index];
      this.montoTotal =this.montoTotal - objetoAEliminar.montoTotal;

      this.insumoTable.splice(index, 1);
    }
  }
}
