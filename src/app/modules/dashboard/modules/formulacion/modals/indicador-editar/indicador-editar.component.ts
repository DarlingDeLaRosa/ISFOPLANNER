import { Component, Inject, OnInit } from '@angular/core';
import { warningMessageAlert } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { UserI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-indicador-editar',
  templateUrl: './indicador-editar.component.html',
  styleUrls: ['./indicador-editar.component.css']
})
export class IndicadorEditarComponent implements OnInit{

  indicadoresGestionForm: FormGroup;
  indicadorRecinto: boolean = false
  userLogged: UserI = this.userSystemService.getUserLogged
  metaIndicadorRecinto: number = 0

  constructor(

    public fb: FormBuilder,
    public helperHandler: HelperService,
    private apiIndicadoresGestion: IndicadorGestionService,
    private userSystemService: UserSystemInformationService,
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
    if (this.indicador.alcance.id == 3) this.metaIndicadorRecinto = this.helperHandler.indicadorMetaRecinto(this.userLogged.recinto.siglas, this.indicador.indicadoresRecinto)
    else this.metaIndicadorRecinto = this.indicador.meta
  }

  putResultadoEsperadoIndicador() {
      this.apiIndicadoresGestion.putResultadoEsperadoIndicador(this.indicador.id, this.indicadoresGestionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  saveChanges(){
    if (this.metaIndicadorRecinto == this.helperHandler.sumTotal(this.indicadoresGestionForm.value)) {
      this.putResultadoEsperadoIndicador()
    } else { warningMessageAlert(`La suma de los resultados esperados debe ser igual a la meta (<b>${this.metaIndicadorRecinto}</b>).`) }
  }
}
