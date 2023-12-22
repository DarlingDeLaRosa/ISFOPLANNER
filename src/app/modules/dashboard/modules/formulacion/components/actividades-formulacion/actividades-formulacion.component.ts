import { Component, OnInit } from '@angular/core';
import { NuevoInsumoComponent } from '../../modals/nuevo-insumo/nuevo-insumo.component';
import { MatDialog } from '@angular/material/dialog';
import { ActividadesService } from '../../services/actividades.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { EstadoI, FrecuenciaI, MunicipioI, ProvinciaI, RegionesI, MesesI } from '../../interfaces/formulacion.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsableService } from '../../../mantenimiento/components/mantenimiento-pei/services/reponsable.service';
import { ResponsableI } from '../../../mantenimiento/components/mantenimiento-pei/interfaces/responsable.interface';
import { InvolucradoI } from '../../../mantenimiento/components/mantenimiento-pei/interfaces/involucrado.interface';
import { involucradoService } from '../../../mantenimiento/components/mantenimiento-pei/services/involucrado.service';

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
  idProducto: number = 0;

  constructor(
    public dialog: MatDialog,
    private actividadesService:ActividadesService,
    private responsableService:ResponsableService,
    private involucradoService:involucradoService,
    private route: ActivatedRoute,
    ){}

    public ActividadForm = new FormGroup({
      id: new FormControl<number>(0),
      nombre: new FormControl<string>('',[Validators.required]),
      idProducto:  new FormControl<number>(0,[Validators.required]),
      idRegion:  new FormControl<number>(0,[Validators.required]),
      idPrivincia:  new FormControl<number>(0,[Validators.required]),
      idMunicipio:  new FormControl<number>(0,[Validators.required]),
      idFrecuencia:  new FormControl<number>(0,[Validators.required]),
      idEstado: new FormControl<number>(0, [Validators.required]),
      idMesesImpacto: new FormControl<number>(0, [Validators.required]),
      idInvolucrados: new FormControl<number>(0, [Validators.required]),
      resupuestoEstimado: new FormControl<string>('', [Validators.required]),
      resultadoEsperadoCuantitativoT1: new FormControl<number>(0, [Validators.required]),
      resultadoEsperadoCuantitativoT2: new FormControl<number>(0, [Validators.required]),
      resultadoEsperadoCuantitativoT3: new FormControl<number>(0, [Validators.required]),
      resultadoEsperadoCuantitativoT4: new FormControl<number>(0, [Validators.required]),
      resultadoEsperadoCualitativoT1: new FormControl<string>('', [Validators.required]),
      resultadoEsperadoCualitativoT2: new FormControl<string>('', [Validators.required]),
      resultadoEsperadoCualitativoT3: new FormControl<string>('', [Validators.required]),
      resultadoEsperadoCualitativoT4: new FormControl<string>('', [Validators.required]),
    });


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.idProducto = params['numero'];
      console.log(this.idProducto);
    });

    this.getRegiones();
    this.getProvinvias();
    this.getMunicipios();
    this.getestados();
    this.getFrecuencia();
    this.getResponsable();
    this.getInvolucrado();
    this.getMeses();
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



  openModal(){
    this.dialog.open(NuevoInsumoComponent)
  }
}
