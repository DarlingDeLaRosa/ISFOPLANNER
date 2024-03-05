import { Component, Inject, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { warningMessageAlert } from 'src/app/alerts/alerts';

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
    if (this.indicador.indicadoresRecinto) { this.indicadoresGestionForm.reset(this.indicador.indicadoresRecinto) }
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
    if (this.indicador.meta == this.helperHandler.calcularSuma(this.indicadoresGestionForm.value)) { //arreglar esta parte
      this.helperHandler.saveChanges(() => this.putIndicadorRecinto(), this.indicadoresGestionForm, () => this.postIndicadorRecinto())
    } else { warningMessageAlert(`La suma de los indicadores por recinto debe ser igual a la meta (<b>${this.indicador.meta}</b>).`) }
  }
}
