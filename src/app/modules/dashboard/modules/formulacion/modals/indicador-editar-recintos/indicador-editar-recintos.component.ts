import { Component, Inject, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { IndicadoresGestionGetI, subUnidadI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { indicadorMetaRecintos, indicadorMetaRecintosGet, } from '../../interfaces/formulacion.interface'; //indicadorRecinto
import { UnidadOrganizativaService } from '../../../mantenimiento/services/unidad-organizativa.service';

@Component({
  selector: 'app-indicador-editar-recintos',
  templateUrl: './indicador-editar-recintos.component.html',
  styleUrls: ['./indicador-editar-recintos.component.css']
})
export class IndicadorEditarRecintosComponent implements OnInit {

  metaRecDisabled: boolean = false
  indicadoresGestionForm: FormGroup;
  indicadoresMetasRecintos: indicadorMetaRecintos[] = []
  subUnidades!: subUnidadI[]
  unidadResREC!: { id: number, nombre: string }
  indicador!: IndicadoresGestionGetI

  constructor(

    public fb: FormBuilder,
    private helperHandler: HelperService,
    private unidadOrgService: UnidadOrganizativaService,
    private indicadorService: IndicadorGestionService,
    private dialogRef: MatDialogRef<IndicadorEditarRecintosComponent>,
    @Inject(MAT_DIALOG_DATA) public idIndicador: number,

  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      UM: new FormControl('', Validators.required),
      FEM: new FormControl('', Validators.required),
      JVM: new FormControl('', Validators.required),
      EPH: new FormControl('', Validators.required),
      EMH: new FormControl('', Validators.required),
      LNNM: new FormControl('', Validators.required),
      REC: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getByIdIndicador()
  }

  getByIdIndicador() {
    this.indicadorService.getIndicadorByIdGestion(this.idIndicador)
      .subscribe((resp: any) => {
        this.indicador = resp.data;
        
        if (this.indicador.alcance.id == 1) { this.indicadoresGestionForm.patchValue({ REC: this.indicador.meta }); this.metaRecDisabled = true }
        
        if (resp.data.indicadoresRecinto.length > 0) {
          this.indicadoresGestionForm.patchValue({id: this.indicador.id})
          const formsValues = this.indicadoresGestionForm.getRawValue()

          for (const key of Object.keys(formsValues)) {
            resp.data.indicadoresRecinto.find((subUnidad: indicadorMetaRecintosGet) => {
              let recintoSiglas = subUnidad.responsable.nombre.split(' ')

              if (recintoSiglas[recintoSiglas.length - 1] == key || recintoSiglas[recintoSiglas.length - 1].length > 4 && key.includes('REC'))
                this.indicadoresGestionForm.patchValue({ [key]: subUnidad.meta })
            })
          }
        }
        this.getUnitOrgRecById()
      })
  }

  getUnitOrgRecById() {
    this.unidadOrgService.getUnidadesOrganizativasRecintosById(this.indicador.responsables.id)
      .subscribe((res: any) => {
        this.subUnidades = res.data.subUnidades;
        this.unidadResREC = { id: res.data.id, nombre: res.data.nombre }
      })
  }

  async postIndicadorRecinto() {
    await this.setDataIndicadoresMetaRec()

    this.indicadorService.postIndicadorRecintos(this.indicador.id, this.indicadoresMetasRecintos)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  async putIndicadorRecinto() {
    await this.setDataIndicadoresMetaRec()
    
    this.indicadorService.putIndicadorRecintos(this.indicadoresMetasRecintos)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  setDataIndicadoresMetaRec() {
    const formsValues = this.indicadoresGestionForm.getRawValue()
    let subUnidadId
    let metaId

    for (const key of Object.keys(formsValues)) {
      if (key.includes('REC')) { subUnidadId = this.unidadResREC }
      else {
        subUnidadId = this.subUnidades.find((subUnidad: { id: number, nombre: string }) => {
          let recintoSiglas = subUnidad.nombre.split(' ')
          if (recintoSiglas[recintoSiglas.length - 1] == key) {return subUnidad}
          return
        })
      }

      if (this.indicador.indicadoresRecinto.length > 0) {
        metaId = this.indicador.indicadoresRecinto.find((meta: any)=>{
          let recintoSiglas = meta.responsable.nombre.split(' ')
          if (recintoSiglas[recintoSiglas.length - 1].length > 4 && key.includes('REC')) return meta
          if (recintoSiglas[recintoSiglas.length - 1] == key) return meta
        })
      }

      if (!key.includes('id') && subUnidadId) {
        this.indicadoresMetasRecintos.push({
          id: metaId?.id,
          meta: formsValues[key],
          idResponsable: subUnidadId.id
        })
      }
    }
  }

  saveChanges() {
    this.helperHandler.saveChangesSumValidation(() =>
    this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto(), this.indicador.meta, this.indicadoresGestionForm.value, this.indicador.alcance.id)
  }
}
