import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadOrgI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit{
  
  unidadDireccion: subUnidadI[] = []
  unidadDepartamento: subUnidadI[] = []
  unidadDivision: subUnidadI[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public unidadesOrg: UnidadOrgI,
  ) {}

  ngOnInit(): void {
    console.log(this.unidadesOrg);
    
    // this.segmentSubUnits()  
  }

  toggleCollapse(subUnidad: subUnidadI): void {
    subUnidad.expanded = !subUnidad.expanded;
  }
  
  // segmentSubUnits(){
  //   if (this.unidadesOrg.unidadOrganizativa.subUnidades.length > 0 ) {
     
  //     this.unidadDireccion = this.unidadesOrg.unidadOrganizativa.subUnidades.filter(subUnidad =>
  //       subUnidad.nombre.toLowerCase().includes('direccion')
  //     );

  //     this.unidadDepartamento = this.unidadesOrg.unidadOrganizativa.subUnidades.filter(subUnidad =>
  //       subUnidad.nombre.toLowerCase().includes('departamento')
  //     );

  //     this.unidadDivision = this.unidadesOrg.unidadOrganizativa.subUnidades.filter(subUnidad =>
  //       subUnidad.nombre.toLowerCase().includes('division' || 'decanato' )
  //     );
  //   }
  // }

}
