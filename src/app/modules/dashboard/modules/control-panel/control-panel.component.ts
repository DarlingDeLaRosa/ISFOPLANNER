import { Component } from '@angular/core';

@Component({
  selector: 'control-root',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  color: string ='rgba(255, 0, 0, 0.336) 2px solid'

  changeColor(color: string){
    this.color = color
  }
}
