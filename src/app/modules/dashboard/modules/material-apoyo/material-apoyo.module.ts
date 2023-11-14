import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialApoyoComponent } from './material-apoyo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    MaterialApoyoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class MaterialApoyoModule { }
