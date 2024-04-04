import { Component } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PermissionService } from '../../services/applyPermissions.service';
import { UnidadDataI, UserI, subUnit } from 'src/app/interfaces/Response.interfaces';
import { ProductoService } from './modules/mantenimiento/services/producto.service';
import { Router } from '@angular/router';
import { unitActive } from 'src/app/alerts/alerts';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent {

  sidenavOpened: boolean = false;
  modulo = this.userSystemService.modulosSis
  userLogged: UserI = this.userSystemService.getUserLogged
  unidadOrgData: UnidadDataI = this.userSystemService.isUnidadOrgFather

  constructor(
    public permisosCRUD: PermissionService,
    // private serviceProducto: ProductoService,
    private router: Router,

    public userSystemService: UserSystemInformationService,
  ) {
    console.log(this.userLogged);
    console.log(this.unidadOrgData);
  }

  changeUnitOrg(unitOrg: subUnit) {
    this.userSystemService.setUnitOrg = unitOrg
    this.userSystemService.unitChange.emit()
    this.router.navigate(['dashboard/panelDeControl']);
    unitActive(unitOrg.nombre)
  }
}
