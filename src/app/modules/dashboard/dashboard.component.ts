import { Component, OnInit } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PermissionService } from '../../services/applyPermissions.service';
import { UnidadDataI, UserI, subUnit } from 'src/app/interfaces/Response.interfaces';
import { Router } from '@angular/router';
import { alertRemoveSure, unitActive } from 'src/app/alerts/alerts';
import { ConfiguracionPeriodoServive } from './modules/mantenimiento/services/configuracion-periodos.service';
import { periodoConfig } from './modules/mantenimiento/interfaces/mantenimientoPOA.interface';
import { AuthenticationService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit {

  sidenavOpened: boolean = false
  modulo = this.userSystemService.modulosSis
  userLogged: UserI = this.userSystemService.getUserLogged
  unidadOrgData: UnidadDataI = this.userSystemService.isUnidadOrgFather

  constructor(
    private router: Router,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    public autenticationService: AuthenticationService,
    private periodoService: ConfiguracionPeriodoServive,
    public userSystemService: UserSystemInformationService,
  ) {
    console.log(this.userLogged);
    console.log(this.unidadOrgData);
  }

  ngOnInit(): void {
    this.getPeriodoConfig()
  }

  async logOut(){
    let logOutDecision: boolean = await alertRemoveSure("¿ Estas seguro de cerrar sesión ?")

    if (logOutDecision) {
      this.autenticationService.postLogOut().subscribe((res:any) => {
        console.log(res);
      })
    }
  }
  
  getPeriodoConfig() {
    this.periodoService.getPeriodoConfig()
      .subscribe((res: any) => { 
        this.userSystemService.setConfigPeriodFormulacion = res.data.find((period: periodoConfig) => { return period.tipoProceso.nombre == 'Formulación' })
        this.userSystemService.setConfigPeriodMonitoreo = res.data.find((period: periodoConfig) => { return period.tipoProceso.nombre == 'Monitoreo' })
      })
  }

  changeUnitOrg(unitOrg: subUnit) {
    this.userSystemService.setUnitOrg = unitOrg
    this.userSystemService.unitChange.emit()
    this.router.navigate(['dashboard/formulacion']);
    unitActive(unitOrg.nombre)
  }
}
