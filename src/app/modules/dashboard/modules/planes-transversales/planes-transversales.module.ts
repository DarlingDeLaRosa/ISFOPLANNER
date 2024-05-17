import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesTransversalesComponent } from './planes-transversales.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetallePlanesTransversalesComponent } from './components/detalle-planes-transversales/detalle-planes-transversales.component';
import { ChargingBoxModule } from '../../components/charging-box/charging-box.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PlanesTransversalesComponent,
    DetallePlanesTransversalesComponent,
  ],
  imports: [
    ChargingBoxModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class PlanesTransversalesModule { }
