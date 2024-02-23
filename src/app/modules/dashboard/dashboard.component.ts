import { Component } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PermissionService } from '../../services/applyPermissions.service';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent {

  sidenavOpened: boolean = false;
  userLogged: any = this.userSystemService.getUserLogged

  constructor(
    public permisosCRUD: PermissionService,
    private userSystemService: UserSystemInformationService,
  ){}
}
