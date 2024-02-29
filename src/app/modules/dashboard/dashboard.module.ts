import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FormulacionModule } from './modules/formulacion/formulacion.module';
import { MonitoreoModule } from './modules/monitoreo/monitoreo.module';
import { PlanesTransversalesModule } from './modules/planes-transversales/planes-transversales.module';
import { MantenimientoModule } from './modules/mantenimiento/mantenimiento.module';
import { ControlPanelModule } from './modules/control-panel/control-panel.module';
import { MaterialApoyoModule } from './modules/material-apoyo/material-apoyo.module';
import { AyudaModule } from './modules/ayuda/ayuda.module';
import { AsignacionSubUnidadesModule } from './modules/asignacion-subunidades/asignacion-subunidades.module';

@NgModule({
  declarations: [
    dashboardComponent,
  ],
  imports: [
    FormulacionModule,
    MonitoreoModule,
    PlanesTransversalesModule,
    ControlPanelModule,
    MaterialApoyoModule,
    AyudaModule,
    MantenimientoModule,
    AsignacionSubUnidadesModule,

    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
