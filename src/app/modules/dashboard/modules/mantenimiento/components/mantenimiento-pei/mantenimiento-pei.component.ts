import { Component } from '@angular/core';
import { IndicadoresEstrategicosI } from './interfaces/indicadorEstrategico.interface';
import { IndicadorEstrategicoService } from './services/indicadoresEstrategicos.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Component({
  selector: 'app-mantenimiento-pei',
  templateUrl: './mantenimiento-pei.component.html',
  styleUrls: ['./mantenimiento-pei.component.css']
})
export class MantenimientoPeiComponent {


}
