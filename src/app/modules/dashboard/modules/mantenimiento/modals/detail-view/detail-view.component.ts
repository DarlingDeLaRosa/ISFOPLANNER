import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadOrgI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {
  
  unidadDireccion: subUnidadI[] = []
  unidadDepartamento: subUnidadI[] = []
  unidadDivision: subUnidadI[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public unidadesOrg: UnidadOrgI,
  ) {}

  toggleCollapse(subUnidad: subUnidadI): void {
    subUnidad.expanded = !subUnidad.expanded;
  }
}
