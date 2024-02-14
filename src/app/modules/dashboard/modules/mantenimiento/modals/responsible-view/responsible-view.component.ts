import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-responsible-view',
  templateUrl: './responsible-view.component.html',
  styleUrls: ['./responsible-view.component.css']
})
export class ResponsibleViewComponent{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public entidad: any,
  ) {}
}
