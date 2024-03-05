import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulacionComponent} from './formulacion.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductoFormulacionComponent } from './components/producto-formulacion/producto-formulacion.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndicadorEditarComponent } from './modals/indicador-editar/indicador-editar.component';
import { ActividadesFormulacionComponent } from './components/actividades-formulacion/actividades-formulacion.component';
import { NuevoInsumoComponent } from './modals/nuevo-insumo/nuevo-insumo.component';
import { HttpClientModule } from '@angular/common/http';
import { IndicadorEditarRecintosComponent } from './modals/indicador-editar-recintos/indicador-editar-recintos.component';

@NgModule({
  declarations: [
    FormulacionComponent,
    NuevoInsumoComponent,
    IndicadorEditarComponent,
    ProductoFormulacionComponent,
    ActividadesFormulacionComponent,
    IndicadorEditarRecintosComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,

  ]
})
export class FormulacionModule { }
