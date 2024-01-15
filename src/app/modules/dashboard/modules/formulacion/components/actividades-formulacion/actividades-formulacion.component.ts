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

  regionesList: Array<RegionesI> = [];
  provinciasList: Array<ProvinciaI> = [];
  MunicipiosList: Array<MunicipioI> = [];
  estadosList: Array<EstadoI> = [];
  frecuenciaList: Array<FrecuenciaI> = [];
  responsableList: Array<ResponsableI> = [];
  involucradoList: Array<InvolucradoI> = [];
  mesesList: Array<MesesI> = [];
  idProductorecibido: number = 0;
  costeo: Array<CosteoI> = [];
  insumoForm: FormGroup;
  montoTotal: number = 0;
  descripcion: string = '';



  categoriaInsumoList: Array<CategoriaInsumosI> = [];
  UnidadesMedidaList: Array<UnidadesMedidaI> = [];
  insumoList: Array<InsumosI> = [];
  insumoListFilter: Array<InsumosI> = [];
  selectionado:Array<InsumosI> = [];
  insumoTable: Array<CosteoDetallesI> = [];

  constructor(
    public dialog: MatDialog,
    private actividadesService: ActividadesService,
    private responsableService: ResponsableService,
    private involucradoService: involucradoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router

  ) {
    this.insumoForm = this.fb.group({
      id: new FormControl<number>(0),
      idInsumo: new FormControl<number>(0, [Validators.required]),
      idCategoria: new FormControl<number>(0, [Validators.required]),
      descripcion: new FormControl<number>(0, [Validators.required]),
      costoUnitario: new FormControl<number>(0, [Validators.required]),
      cantidad: new FormControl<number>(0, [Validators.required]),
      montoTotal: new FormControl<number>(0),
      fechaRecepcion: new FormControl<string>('', [Validators.required]),
      idUnidadMedida: new FormControl<number>(0, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.idProductorecibido = params['numero'];
      console.log(this.idProductorecibido);
    });

    this.getRegiones();
    this.getProvinvias();
    this.getMunicipios();
    this.getestados();
    this.getFrecuencia();
    this.getResponsable();
    this.getInvolucrado();
    this.getMeses();
    this.getCategoriaInsumos();
    this.getUnidadesMedida();
    this.getInsumos();
  }

  public ActividadForm = new FormGroup({
    id: new FormControl<number>(0)!,
    nombre: new FormControl<string>('', [Validators.required]),
    idProducto: new FormControl<number>(this.idProductorecibido),
    idRegion: new FormControl<number>(0, [Validators.required]),
    idPrivincia: new FormControl<number>(0, [Validators.required]),
    idMunicipio: new FormControl<number>(0, [Validators.required]),
    idFrecuencia: new FormControl<number>(0, [Validators.required]),
    esPrevista: new FormControl<boolean>(true, [Validators.required]),
    idEstado: new FormControl<number>(0, [Validators.required]),
    avance: new FormControl<number>(0),
    costeo: new FormGroup({
      montoTotalEstimado: new FormControl<number>(0),
      costeoDetalles: new FormControl<any>([])
    }),
    mesesImpacto: new FormControl<number>(0, [Validators.required]),
    responsable: new FormControl<number>(0, [Validators.required]),
    resultadoEsperadoCuantitativoT1: new FormControl<number>(0),
    resultadoEsperadoCuantitativoT2: new FormControl<number>(0),
    resultadoEsperadoCuantitativoT3: new FormControl<number>(0),
    resultadoEsperadoCuantitativoT4: new FormControl<number>(0),
    resultadoEsperadoCualitativoT1: new FormControl<string>(''),
    resultadoEsperadoCualitativoT2: new FormControl<string>(''),
    resultadoEsperadoCualitativoT3: new FormControl<string>(''),
    resultadoEsperadoCualitativoT4: new FormControl<string>(''),
  });

  irProductos(){
    this.router.navigate(['dashboard/formulacion/producto'], { queryParams: {numero:this.idProductorecibido} });
  }

  getRegiones() {
    this.actividadesService.getRegiones()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.regionesList = resp.data;

      })
  }
  getProvinvias() {
    this.actividadesService.getProvincias()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.provinciasList = resp.data;

      })
  }
  getMunicipios() {
    this.actividadesService.getMunicipios()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.MunicipiosList = resp.data;
      })
  }
  getestados() {
    this.actividadesService.getEstados()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.estadosList = resp.data;
      })
  }
  getFrecuencia() {
    this.actividadesService.getFrecuencias()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.frecuenciaList = resp.data;
      })
  }
  getResponsable() {
    this.responsableService.getResponsable()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.responsableList = resp.data;
      })
  }
  getInvolucrado() {
    this.involucradoService.getInvolucrado()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.involucradoList = resp.data;
      })
  }
  getMeses() {
    this.actividadesService.getMeses()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.mesesList = resp.data;
      })
  }

  openModal() {
    // this.dialog.open(NuevoInsumoComponent)
  }

  get currentActividadForm() {
    const form = this.ActividadForm.value as ActividadI;
    return form;
  }

  postActividades() {
    this.ActividadForm.get('idProducto')!.setValue(this.idProductorecibido);
    this.ActividadForm.get('avance')!.setValue(1);
    this.ActividadForm.get('esPrevista')!.setValue(true);

    // QUITA EL CAMPO ID DEL OBJETO
    const insumoTableCopy = this.insumoTable.map(objeto => {
      const { id, ...restoDeCampos } = objeto;
      return restoDeCampos;
    });
    console.log(insumoTableCopy);


    this.ActividadForm.get('costeo.costeoDetalles')!.patchValue(insumoTableCopy);
    this.ActividadForm.get('costeo.montoTotalEstimado')!.patchValue(this.montoTotal);

    console.log(this.ActividadForm.value);
    this.actividadesService.postActividades(this.currentActividadForm)
      // .pipe(
      //   catchError((error) => {
      //     alertServerDown()
      //     return error
      //   }))
      .subscribe((resp: any) => {
        successMessageAlert('La actividad fue creada correctamente');
        this.ActividadForm.reset();
        this.insumoTable = [];
        this.insumoForm.reset();
      })
  }

  Guardar() {
    if (this.ActividadForm.valid) {
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
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.UnidadesMedidaList = resp.data;
      })
  }

  getCategoriaInsumos() {
    this.actividadesService.getCategoriasInsumo()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
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
