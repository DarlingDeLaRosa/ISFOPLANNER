import { Component } from '@angular/core';
import { NuevoInsumoComponent } from '../../modals/nuevo-insumo/nuevo-insumo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-actividades-formulacion',
  templateUrl: './actividades-formulacion.component.html',
  styleUrls: ['./actividades-formulacion.component.css']
})
export class ActividadesFormulacionComponent {
  
  constructor(
    public dialog: MatDialog,
  ){}

  openModal(){
    this.dialog.open(NuevoInsumoComponent)
  }
}
