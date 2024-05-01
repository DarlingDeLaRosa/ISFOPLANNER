import { Component, Inject, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { IndicadoresGestionGetI, subUnidadI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { id } from '@swimlane/ngx-charts';
import { indicadorMetaRecintos } from '../../interfaces/formulacion.interface';
import { UnidadOrganizativaService } from '../../../mantenimiento/services/unidad-organizativa.service';

@Component({
  selector: 'app-indicador-editar-recintos',
  templateUrl: './indicador-editar-recintos.component.html',
  styleUrls: ['./indicador-editar-recintos.component.css']
})
export class IndicadorEditarRecintosComponent implements OnInit {

  metaRecDisabled: boolean = false
  indicadorRecinto: boolean = false
  indicadoresGestionForm: FormGroup;
  indicadoresMetasRecintos: indicadorMetaRecintos[] = []
  subUnidades!: subUnidadI

  constructor(

    public fb: FormBuilder,
    private helperHandler: HelperService,
    private unidadOrgService: UnidadOrganizativaService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private dialogRef: MatDialogRef<IndicadorEditarRecintosComponent>,
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadoresGestionGetI,

  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      UM: new FormControl('', Validators.required),
      FEM: new FormControl('', Validators.required),
      JVM: new FormControl('', Validators.required),
      EPH: new FormControl('', Validators.required),
      EMH: new FormControl('', Validators.required),
      REC: new FormControl('', Validators.required),
      LNNM: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    console.log(this.indicador);
    this.getUnitOrgRecById()
    if (this.indicador.indicadoresRecinto) this.indicadoresGestionForm.reset(this.indicador.indicadoresRecinto)
    if (this.indicador.alcance.id == 1) { this.indicadoresGestionForm.patchValue({ REC: this.indicador.meta }); this.metaRecDisabled = true }
  }

  getUnitOrgRecById() {
    this.unidadOrgService.getUnidadesOrganizativasRecintosById(this.indicador.responsables.id)
      .subscribe((res: any) => { this.subUnidades = res.data; console.log(res);
       })
  }

  postIndicadorRecinto() {
    const formsValues = this.indicadoresGestionForm.getRawValue()
    //el fem se repite no se el por que
    for (const key of Object.keys(formsValues)) {
      
      let subUnidadId = this.subUnidades.subUnidades.find((subUnidad: { id: number, nombre: string }) => {
        if (key.includes('REC')) return {id: this.subUnidades.id, nombre: this.subUnidades.nombre}
        if (subUnidad.nombre.includes(key)) return subUnidad
        return 0
      })

      console.log(subUnidadId);
      
      if (!key.includes('id') && subUnidadId) {
        this.indicadoresMetasRecintos.push({
          meta: formsValues[key],
          logroEsperadoT1: 0,
          logroEsperadoT2: 0,
          logroEsperadoT3: 0,
          logroEsperadoT4: 0,
          idResponsable: subUnidadId.id
        })
      }
    }
    console.log(this.indicadoresMetasRecintos);

    // this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value)
    // .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  putIndicadorRecinto() {
    this.apiIndicadoresGestion.putIndicadorRecintos(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  saveChanges() {
    // if (this.indicador.tipoIndicador.id == 1 ) {
    //   this.helperHandler.saveChangesFlujoValidation(() => 
    //   this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto(), this.indicador.meta, this.indicadoresGestionForm.value, `La Meta de los indicadores de flujo deben cumplirse por lo menos en uno de los trimestres.`)
    // }else {
      console.log(this.indicadoresGestionForm.value);
      
    this.helperHandler.saveChangesSumValidation(() =>
      this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto(), this.indicador.meta, this.indicadoresGestionForm.value, this.indicador.alcance.id)
    // }
  }
}
