import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FormulacionModule } from './modules/formulacion/formulacion.module';
import { MonitoreoModule } from './modules/monitoreo/monitoreo.module';
import { PlanesTransversalesModule } from './modules/planes-transversales/planes-transversales.module';

@NgModule({
  declarations: [
    dashboardComponent,
  ],
  imports: [
    FormulacionModule,
    MonitoreoModule,
    PlanesTransversalesModule,
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    CommonModule,
  ]
})
export class DashboardModule { }
