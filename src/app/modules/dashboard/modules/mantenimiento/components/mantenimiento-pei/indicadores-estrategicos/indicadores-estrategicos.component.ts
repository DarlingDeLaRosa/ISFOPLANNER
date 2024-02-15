import { Component, OnInit } from '@angular/core';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { ResultadoEfectoService } from '../services/resultadoEfecto.service';
import { alertIsSuccess, alertRemoveSure, successMessageAlert } from 'src/app/alerts/alerts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/appHelper.service';
import { MedioVerificacionService } from '../services/medio-verificacion.service';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { RequerimientosService } from '../services/requerimientos.service';
import { RequerimientoI } from '../interfaces/requerimientos.interface';
import { involucradoService } from '../services/involucrado.service';
import { InvolucradoI } from '../interfaces/involucrado.interface';
import { ResponsableService } from '../services/reponsable.service';
import { ResponsableI } from '../interfaces/responsable.interface';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';

@Component({
  selector: 'app-indicadores-estrategicos',
  templateUrl: './indicadores-estrategicos.component.html',
  styleUrls: ['./indicadores-estrategicos.component.css']
})
export class IndicadoresEstrategicosComponent implements OnInit {

  IndicadorEstrForm: FormGroup;
  involucrados: Array<InvolucradoI> = [];
  responsables: Array<ResponsableI> = [];
  requerimientos: Array<RequerimientoI> = [];
  resultadosEfecto: Array<ResultadoEfectoI> = [];
  supuestosRiesgos: Array<SupuestosRiesgosI> = [];
  mediosVerificacion: Array<MedioVerificacionI> = [];
  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];

  constructor(
    private fb: FormBuilder,
    private helperHandler: HelperService,
    private involucradoService: involucradoService,
    private responsablesService: ResponsableService,
    private requerimientosService: RequerimientosService,
    private resultadoEfectoService: ResultadoEfectoService,
    private supuestoRiesgoService: SupuestosRiesgosService,
    private medioVerificacionService: MedioVerificacionService,
    private indicadoresEstraService: IndicadorEstrategicoService,
  ) {
    this.IndicadorEstrForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      meta: new FormControl<number>(0, Validators.required),
      requerimientos: new FormControl('', Validators.required),
      linaBase: new FormControl<number>(0, Validators.required),
      supuestosRiesgos: new FormControl('', Validators.required),
      mediosVerificaciones: new FormControl('', Validators.required),
      idResultadoefecto: new FormControl<number>(0, Validators.required),

      involucrados: new FormControl('', Validators.required),
      responsables: new FormControl('', Validators.required),
      anio1: new FormControl<number>(0, Validators.required),
      anio2: new FormControl<number>(0, Validators.required),
      anio3: new FormControl<number>(0, Validators.required),
      anio4: new FormControl<number>(0, Validators.required),

      metaAnio1: new FormControl<number>(0, Validators.required),
      metaAnio2: new FormControl<number>(0, Validators.required),
      metaAnio3: new FormControl<number>(0, Validators.required),
      metaAnio4: new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllResponsables()
    this.getAllInvolucrados()
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
    this.indicadoresEstraService.getIndicadoresEstrategicos().subscribe((resp: any) => { this.indicadoresEstartegicos = resp.data; console.log(this.indicadoresEstartegicos);
    })
  }

  getAllMedioVerificacion() {
    this.medioVerificacionService.getMedioVerificacion().subscribe((resp: any) => { this.mediosVerificacion = resp.data; })
  }

  getAllRequerimientos() {
    this.requerimientosService.getRequerimientos().subscribe((resp: any) => { this.requerimientos = resp.data; })
  }

  getAllInvolucrados() {
    this.involucradoService.getInvolucrado().subscribe((resp: any) => { this.involucrados = resp.data; })
  }

  getAllResponsables() {
    this.responsablesService.getResponsable().subscribe((resp: any) => { this.responsables = resp.data; })
  }

  getAllSupuestoRiesgos() {
    this.supuestoRiesgoService.getSupuestosRiesgos().subscribe((resp: any) => { this.supuestosRiesgos = resp.data; })
  }

  setValueIndicadoresEstrategicos(indicadorEstrategico: IndicadoresEstrategicosI) {
    this.IndicadorEstrForm.setValue({
      id: indicadorEstrategico.id,
      nombre: indicadorEstrategico.nombre,
      linaBase: indicadorEstrategico.linaBase,
      meta: indicadorEstrategico.meta,
      idResultadoefecto: indicadorEstrategico.resultadoEfecto.id,
      anio1: indicadorEstrategico.cronograma.anio1,
      metaAnio1: indicadorEstrategico.cronograma.metaAnio1,
      anio2: indicadorEstrategico.cronograma.anio2,
      metaAnio2: indicadorEstrategico.cronograma.metaAnio2,
      anio3: indicadorEstrategico.cronograma.anio3,
      metaAnio3: indicadorEstrategico.cronograma.metaAnio3,
      anio4: indicadorEstrategico.cronograma.anio4,
      metaAnio4: indicadorEstrategico.cronograma.metaAnio4
    });
  }

  postIndicadoresEstrategicos() {
    const objetoPost: any = {
      nombre: this.IndicadorEstrForm.get('nombre')!.value,
      linaBase: this.IndicadorEstrForm.get('linaBase')!.value,
      meta: this.IndicadorEstrForm.get('meta')!.value,
      idResultadoefecto: this.IndicadorEstrForm.get('idResultadoefecto')!.value,
      cronograma: {
        anio1: this.IndicadorEstrForm.get('anio1')!.value,
        metaAnio1: this.IndicadorEstrForm.get('metaAnio1')!.value,
        anio2: this.IndicadorEstrForm.get('anio2')!.value,
        metaAnio2: this.IndicadorEstrForm.get('metaAnio2')!.value,
        anio3: this.IndicadorEstrForm.get('anio3')!.value,
        metaAnio3: this.IndicadorEstrForm.get('metaAnio3')!.value,
        anio4: this.IndicadorEstrForm.get('anio4')!.value,
        metaAnio4: this.IndicadorEstrForm.get('metaAnio4')!.value,
      },
    };
    this.indicadoresEstraService.postIndicadoresEstrategicos(objetoPost).

      subscribe((resp: any) => {
        console.log(objetoPost);
        if (resp.data != null) {
          this.getAllIndicadoresEstrategicos();
          alertIsSuccess(true);
          this.IndicadorEstrForm.reset();
        } else {
          alertIsSuccess(false);
        }
      })
  }
  putIndicadoresEstrategicos() {
    const objetoPost: any = {
      id: this.IndicadorEstrForm.value.id,
      nombre: this.IndicadorEstrForm.get('nombre')!.value,
      linaBase: this.IndicadorEstrForm.get('linaBase')!.value,
      meta: this.IndicadorEstrForm.get('meta')!.value,
      idResultadoefecto: this.IndicadorEstrForm.get('idResultadoefecto')!.value,
      cronograma: {
        anio1: this.IndicadorEstrForm.get('anio1')!.value,
        metaAnio1: this.IndicadorEstrForm.get('metaAnio1')!.value,
        anio2: this.IndicadorEstrForm.get('anio2')!.value,
        metaAnio2: this.IndicadorEstrForm.get('metaAnio2')!.value,
        anio3: this.IndicadorEstrForm.get('anio3')!.value,
        metaAnio3: this.IndicadorEstrForm.get('metaAnio3')!.value,
        anio4: this.IndicadorEstrForm.get('anio4')!.value,
        metaAnio4: this.IndicadorEstrForm.get('metaAnio4')!.value,
      },
    };

    this.indicadoresEstraService.updateIndicadoresEstrategicos(objetoPost, this.IndicadorEstrForm.value.id)
      .subscribe((resp: any) => {
        resp.data
        successMessageAlert("El registro fue editado correctamente");
        this.getAllIndicadoresEstrategicos();
        this.IndicadorEstrForm.reset();
      })
  }

  async deleteIndicadoresEstrategicos(indicadorEstrategico: IndicadoresEstrategicosI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este indicador?")

    if (remove) {
      this.indicadoresEstraService.deleteIndicadoresEstrategicos(indicadorEstrategico.id!)
        .subscribe((resp: any) => {
          alertIsSuccess(true);
          this.getAllIndicadoresEstrategicos();
        })
    }
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putIndicadoresEstrategicos(), this.IndicadorEstrForm, () => this.postIndicadoresEstrategicos())
  }
}



