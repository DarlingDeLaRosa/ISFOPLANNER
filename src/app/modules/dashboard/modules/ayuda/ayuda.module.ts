import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AyudaComponent } from './ayuda.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsnwerViewComponent } from './modals/asnwer-view/asnwer-view.component';

@NgModule({
  declarations: [
    AyudaComponent,
    AsnwerViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ]
})
export class AyudaModule { }
