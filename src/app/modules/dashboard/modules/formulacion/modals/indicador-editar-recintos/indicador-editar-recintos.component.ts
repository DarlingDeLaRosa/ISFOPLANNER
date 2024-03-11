import { Component, Inject, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-indicador-editar-recintos',
  templateUrl: './indicador-editar-recintos.component.html',
  styleUrls: ['./indicador-editar-recintos.component.css']
})
export class IndicadorEditarRecintosComponent implements OnInit {

  metaRecDisabled: boolean = false
  indicadorRecinto: boolean = false
  indicadoresGestionForm: FormGroup;

  constructor(

    public fb: FormBuilder,
    private helperHandler: HelperService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private dialogRef: MatDialogRef<IndicadorEditarRecintosComponent>,
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadoresGestionGetI,

  ) {
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      metaUm: new FormControl('', Validators.required),
      metaFem: new FormControl('', Validators.required),
      metaJvm: new FormControl('', Validators.required),
      metaEph: new FormControl('', Validators.required),
      metaEmh: new FormControl('', Validators.required),
      metaRec: new FormControl('', Validators.required),
      metaLnnm: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    if (this.indicador.indicadoresRecinto) this.indicadoresGestionForm.reset(this.indicador.indicadoresRecinto)
    if(this.indicador.alcance.id == 1) { this.indicadoresGestionForm.patchValue({metaRec: this.indicador.meta}); this.metaRecDisabled = true }
  }

  postIndicadorRecinto() {
    this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  putIndicadorRecinto() {
    this.apiIndicadoresGestion.putIndicadorRecintos(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  saveChanges() {
    if (this.indicador.tipoIndicador.id == 1 ) {
      this.helperHandler.saveChangesFlujoValidation(() => 
      this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto(), this.indicador.meta, this.indicadoresGestionForm.value, `Los indicadores de flujo deben cumplir con la misma meta en los periodos donde aplica.`)
    }else {
      this.helperHandler.saveChangesSumValidation(() => 
      this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto(), this.indicador.meta, this.indicadoresGestionForm.value)
    }
  }
}
