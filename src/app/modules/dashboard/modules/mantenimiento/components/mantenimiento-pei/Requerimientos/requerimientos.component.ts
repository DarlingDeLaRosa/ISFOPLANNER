import { Component, OnInit } from '@angular/core';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown, errorMessageAlert, successMessageAlert } from 'src/app/alerts/alerts';
import { RequerimientosService } from '../services/requerimientos.service';
import { RequerimientoI } from '../interfaces/requerimientos.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { MedioVerificacionService } from '../services/medio-verificacion.service';
import { ResponsableService } from '../services/reponsable.service';
import { ResponsableI } from '../interfaces/responsable.interface';
import { InvolucradoI } from '../interfaces/involucrado.interface';
import { involucradoService } from '../services/involucrado.service';


@Component({
  selector: 'app-estructura-programatica',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  responsable: Array<ResponsableI> = [];
  indicadoresEstartegicosSelected: any;
  requerimientos: Array<RequerimientoI> = [];
  involucrado: Array<InvolucradoI> = [];
  requerimientoForm: FormGroup;
  indicadorForm: FormGroup;
  supuestosRiesgosForm: FormGroup;
  MedioVerificacionForm: FormGroup;
  ResponsableForm: FormGroup;
  InvolucradoForm: FormGroup;

  requerimientoSelected: any[] = []
  medioVerificacionSelected: any[] = []
  ResponsablesSelected: any[] = []
  supuestosRiesgosSelected: any[] = []
  involucradoSelected: any[] = []


  constructor(
    private indicadoresEstraService: IndicadorEstrategicoService,
    private requerimientoService: RequerimientosService,
    private riesgosService: SupuestosRiesgosService,
    private medioVerificacionService: MedioVerificacionService,
    private responsableService: ResponsableService,
    private involucradosService: involucradoService,
    private fb: FormBuilder,
  ) {
    this.indicadorForm = this.fb.group({
      id: new FormControl<number>(0, Validators.required),
    })

    this.requerimientoForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre: new FormControl('', Validators.required),
      esFinanciero: new FormControl(true, Validators.required),
      idIndicadorEstrategico: this.indicadorForm.get('id')!,
    })
    this.supuestosRiesgosForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre: new FormControl('', Validators.required),
      idIndicadorEstrategico: this.indicadorForm.get('id')!,
    })

    this.MedioVerificacionForm = this.fb.group({
      id: new FormControl<number>(0),
      nombre: new FormControl('', Validators.required),
      idIndicadorEstrategico: this.indicadorForm.get('id')!,
    })
    this.ResponsableForm = this.fb.group({
      idUnidadOrganizativa: new FormControl<number>(0),
      idIndicadorEstrategico: this.indicadorForm.get('id')!,
    })
    this.InvolucradoForm = this.fb.group({
      idInvolucrado: new FormControl<number>(0),
      idIndicadorEstrategico: this.indicadorForm.get('id')!,
    })


  }

  requerimientos1: any[][] = [];

  ngOnInit(): void {
    this.getAllIndicadoresEstartegicos();
    this.getAllRequerimientos();
    this.getAllResponsables();
    this.getAllInvolucrado();
  }

  onSelectedIndicador() {
    this.requerimientoSelected = []
    this.supuestosRiesgosSelected = []
    this.medioVerificacionSelected = []
    this.ResponsablesSelected = []
    this.involucradoSelected = []


    let idIndicador = this.indicadorForm.get('id')!;
    let numero = idIndicador.value as number;
    let ub = this.indicadoresEstartegicos.filter(item => item.id == numero);
    this.indicadoresEstartegicosSelected = ub[0];

    this.indicadoresEstartegicosSelected.requerimientos.map((item: any) => {
      this.requerimientoSelected.push(item)
    })

    this.indicadoresEstartegicosSelected.supuestosRiesgos.map((item: any) => {
      this.supuestosRiesgosSelected.push(item)
    })

    this.indicadoresEstartegicosSelected.mediosVerificacion.map((item: any) => {
      this.medioVerificacionSelected.push(item)
    })

    this.indicadoresEstartegicosSelected.responsables.map((item: any) => {
      this.ResponsablesSelected.push(item)
    })

    this.indicadoresEstartegicosSelected.involucrados.map((item: any) => {
      this.involucradoSelected.push(item)
    })

  }

  getAllIndicadoresEstartegicos() {
    this.indicadoresEstraService.getIndicadoresEstrategicos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
        this.indicadoresEstartegicos = resp.data;
        console.log(this.indicadoresEstartegicos);

      })
  }

  getAllResponsables() {
    this.responsableService.getResponsable().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
        this.responsable = resp.data;
      })
  }
  getAllInvolucrado() {
    this.involucradosService.getInvolucrado().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
        this.involucrado = resp.data;
      })
  }

  getAllRequerimientos() {
    this.requerimientoService.getRequerimientos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
        this.requerimientos = resp.data;
      })
  }

  get currentRequerimientoForm() {
    const form = this.requerimientoForm.value as RequerimientoI;
    return form;
  }
  get currentRiesgosForm() {
    const form = this.supuestosRiesgosForm.value as SupuestosRiesgosI;
    return form;
  }
  get currentMedioVerificacionForm() {
    const form = this.MedioVerificacionForm.value as MedioVerificacionI;
    return form;
  }
  get currentResponsableForm() {
    const form = this.ResponsableForm.value as ResponsableI;
    return form;
  }
  get currentInvolucradoForm() {
    const form = this.InvolucradoForm.value as InvolucradoI;
    return form;
  }

  postRequerimiento() {
    this.requerimientoService.postRequerimientos(this.currentRequerimientoForm)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        if (resp.ok == true) {
          this.getAllRequerimientos();
          alertIsSuccess(true);
          this.requerimientoForm.reset();
        } else {
          alertIsSuccess(false);
        }
      })
  }

  postRiesgos() {
    this.riesgosService.psotSupuestosRiesgos(this.currentRiesgosForm)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        if (resp.ok == true) {
          // this.getAllRequerimientos();
          alertIsSuccess(true);
          this.supuestosRiesgosForm.reset();
        } else {
          alertIsSuccess(false);
        }
      })
  }
  postMedioVerificacion() {
    this.medioVerificacionService.postMedioVerificacion(this.currentMedioVerificacionForm)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        if (resp.ok == true) {
          // this.getAllRequerimientos();
          alertIsSuccess(true);
          this.MedioVerificacionForm.reset();
        } else {
          alertIsSuccess(false);
        }
      })
  }
  postResponsable() {
    this.responsableService.postResponsable(this.currentResponsableForm)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        if (resp.ok == true) {
          // this.getAllRequerimientos();
          alertIsSuccess(true);
          this.ResponsableForm.reset();
        } else {
          alertIsSuccess(false);
        }
      })
  }
  postInvolucrado() {
    this.involucradosService.postInvolucrado(this.currentInvolucradoForm)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        if (resp.ok == true) {
          // this.getAllRequerimientos();
          alertIsSuccess(true);
          this.InvolucradoForm.reset();
        } else {
          alertIsSuccess(false);
        }
      })
  }


  async deleteRequerimientos(requerimientos: RequerimientoI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este requerimiento?")
    if (remove) {
      this.requerimientoService.deleteRequerimientos(requerimientos.id!)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          }))
        .subscribe((resp: any) => {
          alertIsSuccess(true);
          this.onSelectedIndicador()
        })
    }

  }
  async deleteSupuestosRiesgos(riesgo: SupuestosRiesgosI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este supuesto riesgo?")
    if (remove) {
      this.riesgosService.deleteResultadoEfecto(riesgo.id!)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          }))
        .subscribe((resp: any) => {
          alertIsSuccess(true);
        })
    }

  }
  async deleteMedioVerificacion(verificacion: MedioVerificacionI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este medio de verificacion?")
    if (remove) {
      this.medioVerificacionService.DeleteMedioVerificacion(verificacion.id!)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          }))
        .subscribe((resp: any) => {
          alertIsSuccess(true);
        })
    }

  }
  async deleteResponsable(Responsable: ResponsableI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar el responsable?")
    if (remove) {
      const idIndicador = this.indicadorForm.get('id')?.value;
      const idResponsable =  Responsable.id

      this.responsableService.deleteResponsable(idIndicador,idResponsable)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return error
          }))
        .subscribe((resp: any) => {
          alertIsSuccess(true);
        })
    }

  }
  async deleteInvolucrado(involucrado: InvolucradoI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar el involucrado?")
    if (remove) {
      const idIndicador = this.indicadorForm.get('id')?.value;
      const idInvolucrado =  involucrado.id

      this.involucradosService.deleteInvolucrado(idIndicador,idInvolucrado)
        // .pipe(
        //   catchError((error) => {
        //     alertServerDown()
        //     return error
        //   }))
        .subscribe((resp: any) => {
          alertIsSuccess(true);
        })
    }

  }

  guardarRequerimiento() {
    if (this.requerimientoForm.get('idIndicadorEstrategico')!.value == 0) {
      errorMessageAlert('Debes seleccionar un indicador')
      return;
    };

    if (this.requerimientoForm.invalid) {
      errorMessageAlert('Debes llenar los campos del requerimientos')
      return;
    };
    if (this.requerimientoForm.valid) {
      this.postRequerimiento();
    }
  }

  guardarRiesgos() {
    console.log(this.supuestosRiesgosForm.value);

    if (this.supuestosRiesgosForm.get('idIndicadorEstrategico')!.value == 0) {
      errorMessageAlert('Debes seleccionar un indicador')
      return;
    };

    if (this.supuestosRiesgosForm.invalid) {
      errorMessageAlert('Debes llenar el campo de Supuesto riesgo')
      return;
    };
    if (this.supuestosRiesgosForm.valid) {
      this.postRiesgos();
    }
  }

  guardarMedioVerificacion() {
    console.log(this.MedioVerificacionForm.value);

    if (this.MedioVerificacionForm.get('idIndicadorEstrategico')!.value == 0) {
      errorMessageAlert('Debes seleccionar un indicador')
      return;
    };

    if (this.MedioVerificacionForm.invalid) {
      errorMessageAlert('Debes llenar el campo de medio de verificacion')
      return;
    };
    if (this.MedioVerificacionForm.valid) {
      this.postMedioVerificacion();
    }
  }
  guardarResponsable() {
    console.log(this.ResponsableForm.value);

    if (this.ResponsableForm.get('idIndicadorEstrategico')!.value == 0) {
      errorMessageAlert('Debes seleccionar un indicador')
      return;
    };

    if (this.ResponsableForm.invalid) {
      errorMessageAlert('Debes seleccionar un responsable')
      return;
    };
    if (this.ResponsableForm.valid) {
      this.postResponsable();
    }
  }
  guardarInvolucrado() {
    console.log(this.InvolucradoForm.value);

    if (this.InvolucradoForm.get('idIndicadorEstrategico')!.value == 0) {
      errorMessageAlert('Debes seleccionar un indicador')
      return;
    };

    if (this.InvolucradoForm.invalid) {
      errorMessageAlert('Debes seleccionar un involucrado')
      return;
    };
    if (this.InvolucradoForm.valid) {
      this.postInvolucrado();
    }
  }

}





