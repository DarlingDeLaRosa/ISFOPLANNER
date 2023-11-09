import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulacionComponent} from './formulacion.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductoFormulacionComponent } from './components/producto-formulacion/producto-formulacion.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IndicadorEditarComponent } from './modals/indicador-editar/indicador-editar.component';
import { ActividadesFormulacionComponent } from './components/actividades-formulacion/actividades-formulacion.component';

@NgModule({
  declarations: [
    FormulacionComponent,
    ProductoFormulacionComponent,
    IndicadorEditarComponent,
    ActividadesFormulacionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,

  ]
})
export class FormulacionModule { }
