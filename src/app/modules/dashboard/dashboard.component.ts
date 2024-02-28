import { Component } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PermissionService } from '../../services/applyPermissions.service';
import { UnidadDataI, UserI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent {

  sidenavOpened: boolean = false;
  userLogged: UserI = this.userSystemService.getUserLogged
  unidadOrgData: UnidadDataI = this.userSystemService.isUnidadOrgFather

  constructor(
    public permisosCRUD: PermissionService,
    private userSystemService: UserSystemInformationService,
  ){
    console.log(this.userLogged);
    console.log(this.unidadOrgData);
  }
}
