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

  indicadoresGestionForm: FormGroup;
  indicadorRecinto: boolean = false

  constructor(

    public fb: FormBuilder,
    private helperHandler: HelperService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private dialogRef: MatDialogRef<IndicadorEditarRecintosComponent>,
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadoresGestionGetI,

  ) {

    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      metaFem: new FormControl('', Validators.required),
      metaJvm: new FormControl('', Validators.required),
      metaLnnm: new FormControl('', Validators.required),
      metaEph: new FormControl('', Validators.required),
      metaUm: new FormControl('', Validators.required),
      metaEmh: new FormControl('', Validators.required),
      metaRec: new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {
    if (this.indicador.indicadoresRecinto) this.indicadoresGestionForm.reset(this.indicador.indicadoresRecinto)
  }

  postIndicadorRecinto() {
    this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value)
      .subscribe((res: any) => { 
        this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) 
        
        // this.helperHandler.validationGoal()
      })
  }

  putIndicadorRecinto() {
    this.apiIndicadoresGestion.putIndicadorRecintos(this.indicadoresGestionForm.value)
      .subscribe((res: any) => { 
        this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) 
        console.log(res);
      })
  }

  saveChanges() {
    this.helperHandler.saveChangesSumValidation(() => 
    this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto(), this.indicador.meta, this.indicadoresGestionForm.value)
  }
}
