import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesTransversalesComponent } from './planes-transversales.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetallePlanesTransversalesComponent } from './components/detalle-planes-transversales/detalle-planes-transversales.component';

@NgModule({
  declarations: [
    PlanesTransversalesComponent,
    DetallePlanesTransversalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class PlanesTransversalesModule { }
