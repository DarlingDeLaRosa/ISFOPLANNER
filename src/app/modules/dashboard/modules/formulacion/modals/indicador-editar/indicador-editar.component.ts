import { Component, OnInit, Inject } from '@angular/core';
import { IndicadorGestionI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess } from 'src/app/alerts/alerts';

@Component({
  selector: 'app-indicador-editar',
  templateUrl: './indicador-editar.component.html',
  styleUrls: ['./indicador-editar.component.css']
})
export class IndicadorEditarComponent implements OnInit {

  indicadoresGestionForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadorGestionI,
    public fb: FormBuilder,
    private apiIndicadoresGestion: IndicadorGestionService,
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
  }

  ngOnInit(): void { console.log(this.indicador); }

  postIndicadorRecinto() {
    this.apiIndicadoresGestion.postIndicadorRecintos( this.indicador.id ,this.indicadoresGestionForm.value)
    .subscribe((res: any) => {
      console.log(res);
    })
  }
}
