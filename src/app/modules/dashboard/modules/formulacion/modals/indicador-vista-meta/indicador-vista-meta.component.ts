import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-indicador-vista-meta',
  templateUrl: './indicador-vista-meta.component.html',
  styleUrls: ['./indicador-vista-meta.component.css']
})
export class IndicadorVistaMetaComponent implements OnInit {

  indicador!: IndicadoresGestionGetI

  constructor(
    private indicadorService: IndicadorGestionService,
    @Inject(MAT_DIALOG_DATA) public idIndicador: number
  ) { }

  ngOnInit(): void {
    this.getByIdIndicador()
  }

  getByIdIndicador() {
    this.indicadorService.getIndicadorByIdGestion(this.idIndicador)
      .subscribe((resp: any) => {
        this.indicador = resp.data;
        console.log(this.indicador.indicadoresRecinto);
      })
  }
}
