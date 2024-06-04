import { Component } from '@angular/core';

@Component({
  selector: 'control-root',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
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
  ];

  color: string ='rgba(255, 0, 0, 0.336) 2px solid'

  changeColor(color: string){
    this.color = color
  }
  onSelect(data:any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  //F

}
