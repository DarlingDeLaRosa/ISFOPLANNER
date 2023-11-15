import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent} from './control-panel.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MiAreaTrabajoComponent } from './components/mi-area-trabajo/mi-area-trabajo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogroProductoUnidadComponent } from './components/logro-producto-unidad/logro-producto-unidad.component';
import { EjecucionPresupuestariaComponent } from './components/ejecucion-presupuestaria/ejecucion-presupuestaria.component';
import { ActividadPrevistasComponent } from './components/actividad-previstas/actividad-previstas.component';
import { ActividadNoPrevistasComponent } from './components/actividad-no-previstas/actividad-no-previstas.component';

@NgModule({
  declarations: [
    ControlPanelComponent,
    MiAreaTrabajoComponent,
    LogroProductoUnidadComponent,
    EjecucionPresupuestariaComponent,
    ActividadPrevistasComponent,
    ActividadNoPrevistasComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
  ]
})
export class ControlPanelModule { }
