import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoreoComponent } from './monitoreo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatrizMonitoreoComponent } from './components/matriz-monitoreo/matriz-monitoreo.component';
import { ProductoMonitoreoComponent } from './components/producto-monitoreo/producto-monitoreo.component';
import { TrimestreStatusMonitoreoComponent } from './modals/trimestre-status-monitoreo/trimestre-status-monitoreo.component';
import { IndicadorEditarMonitoreoComponent } from './modals/indicador-editar-monitoreo/indicador-editar-monitoreo.component';
import { ActividadEditarMonitoreoComponent } from './modals/actividad-editar-monitoreo/actividad-editar-monitoreo.component';

@NgModule({
  declarations: [
    MonitoreoComponent,
    MatrizMonitoreoComponent,
    ProductoMonitoreoComponent,
    TrimestreStatusMonitoreoComponent,
    IndicadorEditarMonitoreoComponent,
    ActividadEditarMonitoreoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class MonitoreoModule { }
