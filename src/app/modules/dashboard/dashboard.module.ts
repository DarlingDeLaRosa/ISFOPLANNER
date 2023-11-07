import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FormulacionModule } from './modules/formulacion/formulacion.module';

@NgModule({
  declarations: [
    dashboardComponent,
    
  ],
  imports: [
    FormulacionModule,
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    CommonModule,
  ]
})
export class DashboardModule { }
