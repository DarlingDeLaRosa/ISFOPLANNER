import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AsignacionSubunidadesComponent } from './asignacion-subunidades.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AsignacionSubunidadesComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class AsignacionSubUnidadesModule { }