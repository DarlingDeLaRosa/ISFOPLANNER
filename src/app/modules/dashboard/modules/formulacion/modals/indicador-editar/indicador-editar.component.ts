import { Component, OnInit, Inject } from '@angular/core';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
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
    private userSystemService: UserSystemInformationService,
  ) {
    this.indicadoresGestionForm = this.fb.group({
      
      indicadoresRecintos: this.fb.group({
        metaFem: new FormControl('', Validators.required),
        metaJvm: new FormControl('', Validators.required),
        metaLnnm: new FormControl('', Validators.required),
        metaEph: new FormControl('', Validators.required),
        metaUm: new FormControl('', Validators.required),
        metaEmh: new FormControl('', Validators.required),
        metaRec: new FormControl('', Validators.required)
      }),

      resultadoEsperados: this.fb.group({
        logroEsperadoT1: new FormControl('', Validators.required),
        logroEsperadoT2: new FormControl('', Validators.required),
        logroEsperadoT3: new FormControl('', Validators.required),
        logroEsperadoT4: new FormControl('', Validators.required)
      })
    })


    if (userSystemService.getUserLogged?.recinto.siglas === 'FEM' && indicador.alcance.id == 1) { this.indicadorRecinto = true } //REC
  }

  ngOnInit(): void {
    console.log(this.indicador);
    console.log(this.userSystemService.getUserLogged);
  }

  postIndicadorRecinto() {
    this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value.indicadoresRecintos)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }

  postResultadoEsperadoIndicador() {
    this.apiIndicadoresGestion.postIndicadorRecintos(this.indicador.id, this.indicadoresGestionForm.value.resultadoEsperados)
      .subscribe((res: any) => { console.log(res);
      ;this.helperHandler.handleResponse(res, () => this.dialogRef.close(), this.indicadoresGestionForm) })
  }
}
