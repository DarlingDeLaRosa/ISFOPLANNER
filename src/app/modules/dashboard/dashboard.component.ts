import { Component, OnInit } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PermissionService } from '../../services/applyPermissions.service';
import { UnidadDataI, UserI, subUnit } from 'src/app/interfaces/Response.interfaces';
import { Router } from '@angular/router';
import { unitActive } from 'src/app/alerts/alerts';
import { ConfiguracionPeriodoServive } from './modules/mantenimiento/services/configuracion-periodos.service';
import { periodoConfig } from './modules/mantenimiento/interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit {

  sidenavOpened: boolean = false;
  modulo = this.userSystemService.modulosSis
  userLogged: UserI = this.userSystemService.getUserLogged
  unidadOrgData: UnidadDataI = this.userSystemService.isUnidadOrgFather

  constructor(
    private router: Router,
    public permisosCRUD: PermissionService,
    private periodoService: ConfiguracionPeriodoServive,
    public userSystemService: UserSystemInformationService,
  ) {
    console.log(this.userLogged);
    console.log(this.unidadOrgData);
  }

  ngOnInit(): void {
    this.getPeriodoConfig()
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
