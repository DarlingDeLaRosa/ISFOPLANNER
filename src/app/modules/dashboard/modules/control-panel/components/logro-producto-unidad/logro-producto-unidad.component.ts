import { Component } from '@angular/core';
import Chart, { Color } from 'chart.js/auto';
import { ColorHelper } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-logro-producto-unidad',
  templateUrl: './logro-producto-unidad.component.html',
  styleUrls: ['./logro-producto-unidad.component.css']
})
export class LogroProductoUnidadComponent {

  //Inicio datos del grafico
  view:[number,number] = [500, 500];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  single = [
    {
      "name": "Prevista",
      "value": 844
    },
    {
      "name": "No previstas",
      "value": 122
    },

  ];

  constructor(){

  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //Fin datos del grafico

}
