import { Component, OnInit, Inject } from '@angular/core';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'app-indicador-editar',
  templateUrl: './indicador-editar.component.html',
  styleUrls: ['./indicador-editar.component.css']
})
export class IndicadorEditarComponent implements OnInit {

  indicadoresGestionForm: FormGroup;
  indicadorRecinto: boolean = false

  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private dialogRef: MatDialogRef<IndicadorEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadoresGestionGetI,
  ) {
    this.indicadoresGestionForm = this.fb.group({
      logroEsperadoT1: new FormControl(indicador.logroEsperadoT1, Validators.required),
      logroEsperadoT2: new FormControl(indicador.logroEsperadoT2, Validators.required),
      logroEsperadoT3: new FormControl(indicador.logroEsperadoT3, Validators.required),
      logroEsperadoT4: new FormControl(indicador.logroEsperadoT4, Validators.required),
    })
  }

  ngOnInit(): void {
    console.log(this.indicador);
  }

  postResultadoEsperadoIndicador() {
    this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value.resultadoEsperados)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  putResultadoEsperadoIndicador() {
    this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value.resultadoEsperados)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putResultadoEsperadoIndicador(), this.indicadoresGestionForm, () => this.postResultadoEsperadoIndicador())
  }
}
