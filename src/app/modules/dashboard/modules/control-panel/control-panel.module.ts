import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent} from './control-panel.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,

  ]
})
export class ControlPanelModule { }
