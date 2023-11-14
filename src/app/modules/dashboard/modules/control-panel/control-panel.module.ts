import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent} from './control-panel.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MiAreaTrabajoComponent } from './components/mi-area-trabajo/mi-area-trabajo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ControlPanelComponent,
    MiAreaTrabajoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
  ]
})
export class ControlPanelModule { }
