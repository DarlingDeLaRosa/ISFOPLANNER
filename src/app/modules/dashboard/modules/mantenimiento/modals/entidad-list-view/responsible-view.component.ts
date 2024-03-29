import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-responsible-view',
  templateUrl: './responsible-view.component.html',
  styleUrls: ['./responsible-view.component.css']
})
export class EntidadListViewComponent{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public propiedad: {elementoList: any[], nombre: string, entidad: string},
  ) {}
}
