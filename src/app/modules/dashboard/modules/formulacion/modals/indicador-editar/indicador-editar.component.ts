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
export class IndicadorEditarComponent implements OnInit{
  
  indicadoresGestionForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadorGestionI,
    public fb: FormBuilder,
    private apiIndicadoresGestion: IndicadorGestionService,
  ){
    this.indicadoresGestionForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idProducto: new FormControl('', Validators.required),
      idAlcance: new FormControl('', Validators.required),
      idFrecuencia: new FormControl('', Validators.required),
      idEstructuraProgramatica: new FormControl('', Validators.required),
      idUnidadOrganizativa: new FormControl('', Validators.required),
      idTipoIndicador: new FormControl('', Validators.required),
      meta: new FormControl('', Validators.required),
      linaBase: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    
  }
  
  postIndicadoresGestion() {
    this.apiIndicadoresGestion.postIndicadorGestion(this.indicadoresGestionForm.value)
      .subscribe((res: any) => {
        if (res.statusCode == 201) {

          alertIsSuccess(true)
          // this.getIndicadoresGestion()
          this.indicadoresGestionForm.reset()

        } else alertIsSuccess(false)
      })
  }

}
