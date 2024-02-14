import { Component, OnInit, Inject } from '@angular/core';
import { IndicadorGestionI, IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'app-indicador-editar',
  templateUrl: './indicador-editar.component.html',
  styleUrls: ['./indicador-editar.component.css']
})
export class IndicadorEditarComponent implements OnInit {

  indicadoresGestionForm: FormGroup;
  indicadorRecinto: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadoresGestionGetI,
    public fb: FormBuilder,
    private apiIndicadoresGestion: IndicadorGestionService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.indicadoresGestionForm = this.fb.group({
      metaFem: new FormControl('', Validators.required),
      metaJvm: new FormControl('', Validators.required),
      metaLnnm: new FormControl('', Validators.required),
      metaEph: new FormControl('', Validators.required),
      metaUm: new FormControl('', Validators.required),
      metaEmh: new FormControl('', Validators.required),
      metaRec: new FormControl('', Validators.required)
    })
    
    if (userSystemService.getUserLogged?.recinto.siglas === 'REC' && indicador.tipoIndicador.id == 1) {
      this.indicadorRecinto = true
    }
  }

  ngOnInit(): void { 
    console.log(this.indicador);
    console.log(this.userSystemService.getUserLogged);
  }

  postIndicadorRecinto() {
    this.apiIndicadoresGestion.postIndicadorRecintos( this.indicador.id ,this.indicadoresGestionForm.value)
    .subscribe((res: any) => {
      console.log(res);
    })
  }
}
