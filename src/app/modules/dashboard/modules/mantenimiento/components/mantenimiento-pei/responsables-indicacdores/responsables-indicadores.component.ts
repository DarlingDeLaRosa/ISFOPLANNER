import { Component, OnInit } from '@angular/core';
import { ResponsableService } from '../services/reponsable.service';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { ResponsableI } from '../interfaces/responsable.interface';

@Component({
    selector: 'app-responsables-indicadores',
    templateUrl: 'responsables-indicadores.component.html'
})
export class ResponsablesIndicadoresComponent implements OnInit {

    indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];

    constructor(
        private resposablesService:ResponsableService,
        private indicadoresEstraService: IndicadorEstrategicoService,
    ) { 

    }

    ngOnInit() { 
        this.getAllIndicadoresEstartegicos();
    }

    getAllIndicadoresEstartegicos() {
        this.indicadoresEstraService.getIndicadoresEstrategicos().pipe(
          catchError((error) => {
            alertServerDown()
            return error
          })).subscribe((resp: any) => {
          this.indicadoresEstartegicos = resp.data;
          console.log(this.indicadoresEstartegicos);
          
        })
      }
}