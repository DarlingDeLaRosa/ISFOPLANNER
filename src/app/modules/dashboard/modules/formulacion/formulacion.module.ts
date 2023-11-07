import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulacionComponent} from './formulacion.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    FormulacionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class FormulacionModule { }
