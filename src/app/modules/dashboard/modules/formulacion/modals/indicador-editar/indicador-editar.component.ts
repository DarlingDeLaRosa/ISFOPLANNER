import { Component, Inject, OnInit } from '@angular/core';
import { errorMessageAlert, warningMessageAlert } from 'src/app/alerts/alerts';
import { UserI } from 'src/app/interfaces/Response.interfaces';
import { HelperService } from 'src/app/services/appHelper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { indicadorMetaRecintosGet } from '../../interfaces/formulacion.interface';

@Component({
  selector: 'app-indicador-editar',
  templateUrl: './indicador-editar.component.html',
  styleUrls: ['./indicador-editar.component.css']
})
export class IndicadorEditarComponent implements OnInit {

  // metaIndicadorRecinto: number = 0
  sumaTotalLogros: number = 0
  validacionMeta: boolean = false
  indicadorRecinto: boolean = false
  indicadoresGestionForm: FormGroup
  indicador!: IndicadoresGestionGetI
  indTypeValidation: boolean = false
  metaIndicadorFlujo: boolean = false
  indicadoresGestionRecintosForm: FormGroup;
  userLogged: UserI = this.userSystemService.getUserLogged;

  metaRecintos: number = 0
  metaRectoria: number = 0

  constructor(

    public fb: FormBuilder,
    public helperHandler: HelperService,
    private indicadorService: IndicadorGestionService,
    private userSystemService: UserSystemInformationService,
    private dialogRef: MatDialogRef<IndicadorEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public idIndicador: number,

  ) {

    this.indicadoresGestionForm = this.fb.group({
      logroEsperadoT1: new FormControl('', Validators.required),
      logroEsperadoT2: new FormControl('', Validators.required),
      logroEsperadoT3: new FormControl('', Validators.required),
      logroEsperadoT4: new FormControl('', Validators.required),
    })

    this.indicadoresGestionRecintosForm = this.fb.group({
      logroEsperadoT1: new FormControl('', Validators.required),
      logroEsperadoT2: new FormControl('', Validators.required),
      logroEsperadoT3: new FormControl('', Validators.required),
      logroEsperadoT4: new FormControl('', Validators.required),
    })

    this.indicadoresGestionForm.valueChanges.subscribe(() => {
      if (this.indicador.tipoIndicador.id == 1) {
        if (helperHandler.sameLastGoal(this.indicadoresGestionForm.value.logroEsperadoT4, this.indicador.meta)) this.indTypeValidation = true
        else this.indTypeValidation = false
      } else {
        if (this.indicador.meta == helperHandler.sumTotal(this.indicadoresGestionForm.value)) this.indTypeValidation = true
        else this.indTypeValidation = false
      }
    })


    // if (this.indicador.alcance.id !== 2) {
    // this.indicador.meta = this.helperHandler.indicadorMetaRecinto(this.userLogged.recinto.siglas, this.indicador.indicadoresRecinto)
    // this.sumaTotalLogros = helperHandler.sumTotal({ a: indicador.logroEsperadoT1, b: indicador.logroEsperadoT2, c: indicador.logroEsperadoT3, d: indicador.logroEsperadoT4 })

    // if (indicador.tipoIndicador.id == 1)  this.metaIndicadorFlujo = helperHandler.sameGoal(this.indicadoresGestionForm.value, indicador.meta) 
    // else this.validacionMeta = helperHandler.validationGoal(helperHandler.indicadorMetaRecinto(this.userLogged.recinto.siglas, indicador.indicadoresRecinto), this.sumaTotalLogros)

    // } else this.indicador.meta = this.indicador.meta
  }

  ngOnInit(): void {
    this.getByIdIndicador()
  }

  getByIdIndicador() {
    this.indicadorService.getIndicadorByIdGestion(this.idIndicador)
      .subscribe((resp: any) => {
        this.indicador = resp.data;
        this.validationDefined()

        let logroRecinto = this.indicador.indicadoresRecinto.find((logroEsperadoRecinto: indicadorMetaRecintosGet) => {
          let recintoSiglas = logroEsperadoRecinto.responsable.nombre.split(' ')
          
          if (recintoSiglas[recintoSiglas.length - 1] == this.userLogged.recinto.siglas) {
            this.indicadoresGestionRecintosForm.reset(logroEsperadoRecinto)
            return logroEsperadoRecinto
          }
          if (recintoSiglas[recintoSiglas.length - 1].length > 4 && this.userLogged.recinto.siglas == 'REC'){
            this.indicadoresGestionRecintosForm.reset(logroEsperadoRecinto)
            return logroEsperadoRecinto
          } 
          return
        })
        
        if (this.userLogged.recinto.siglas == 'REC') {
          if (this.indicador.alcance.id !== 3) this.metaRecintos = this.indicador.meta
          else {
            this.metaRectoria = this.indicador.meta            
            this.metaRecintos = logroRecinto!.meta 
          }
        } else this.metaRecintos = logroRecinto!.meta
      })
  }

  validationDefined() {
    const { indicadoresRecinto, logroEsperadoT1, logroEsperadoT2, logroEsperadoT3, logroEsperadoT4, meta, alcance } = this.indicador
    const suma = this.helperHandler.sumTotal({ lg1: logroEsperadoT1, lg2: logroEsperadoT2, lg3: logroEsperadoT3, lg4: logroEsperadoT4 })

    if (indicadoresRecinto.length == 0 && alcance.id !== 2 && this.userLogged.recinto.siglas !== 'REC') {
      errorMessageAlert('La meta a completar por los diferentes recintos debe ser definida por la unidad de Rectoria a cargo del indicador.')
      this.dialogRef.close()
    }

    if (!this.helperHandler.validationGoal(meta, suma) && this.userLogged.recinto.siglas !== 'REC') {
      errorMessageAlert('Los resultados esperados generales deben ser completados por la unidad de Rectoria a cargo del indicador.')
      this.dialogRef.close()
    }

    if (suma > 0) { this.indicadoresGestionForm.reset(this.indicador) }
  }

  putResultadoEsperadoIndicador(form: FormGroup) {
    this.indicadorService.putResultadoEsperadoIndicador(this.indicador.id, form)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  putResultadoEsperadoIndicadorRecintos(form: FormGroup) {
    this.indicadorService.putResultadoEsperadoIndicadorRecintos(this.indicador.id, form)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  emptyFuction(){}
  validationTypeInd(sendData: () => void) {
    if (this.indicador.tipoIndicador.id == 1) {
      if (this.helperHandler.sameLastGoal(this.indicadoresGestionForm.value.logroEsperadoT4, this.indicador.meta)) sendData()
      else { warningMessageAlert(`Los indicadores de flujo deben cumplir con la misma meta en los periodos donde aplica.`) }
    }
    else {
      if (this.indicador.meta == this.helperHandler.sumTotal(this.indicadoresGestionForm.value)) sendData()
      else { warningMessageAlert(`La suma de los resultados esperados debe ser igual a la meta (<b>${this.indicador.meta}</b>).`) }
    }
  }

  saveChanges() {
    if (this.userLogged.recinto.siglas === 'REC') {
      if (this.indicador.alcance.id !== 3) this.validationTypeInd(() => this.putResultadoEsperadoIndicador(this.indicadoresGestionRecintosForm.value));
      else {
        this.validationTypeInd(() => this.putResultadoEsperadoIndicador(this.indicadoresGestionForm.value));
        this.validationTypeInd(() => this.putResultadoEsperadoIndicadorRecintos(this.indicadoresGestionRecintosForm.value));
      }
    } else this.validationTypeInd(() => this.putResultadoEsperadoIndicadorRecintos(this.indicadoresGestionRecintosForm.value));
  }
}
