import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { alertRemoveSure, unitActiveAlert } from 'src/app/alerts/alerts';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PermissionService } from '../../services/applyPermissions.service';
import { UnidadDataI, UserI, subUnit } from 'src/app/interfaces/Response.interfaces';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { UnidadOrganizativaService } from './modules/mantenimiento/services/unidad-organizativa.service';
import { periodoConfig, subUnidadI } from './modules/mantenimiento/interfaces/mantenimientoPOA.interface';
import { ConfiguracionPeriodoServive } from './modules/mantenimiento/services/configuracion-periodos.service';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit {

  isUnitFather: boolean = false
  sidenavOpened: boolean = false
  unidadesOrg: subUnidadI[] = []
  validPlanTransversal: boolean = false
  modulo = this.userSystemService.modulosSis
  userLogged: UserI = this.userSystemService.getUserLogged
  unidadOrgData: UnidadDataI = this.userSystemService.isUnidadOrgFather

  constructor(
    private router: Router,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    public autenticationService: AuthenticationService,
    private periodoService: ConfiguracionPeriodoServive,
    public userSystemService: UserSystemInformationService,
  ) {
    console.log(this.userLogged);
    console.log(this.unidadOrgData);
  }

  ngOnInit(): void {
    this.getPeriodoConfig()
    this.isUnidadOrgFather()
    this.getUnidadOrganizativaRecintos()
  }

  async logOut(){
    let logOutDecision: boolean = await alertRemoveSure("¿ Estas seguro de cerrar sesión ?")

    if (logOutDecision) {
      this.autenticationService.postLogOut().subscribe((res:any) => {
        console.log(res);
      })
    }
  }
  
  isUnidadOrgFather(){
    this.apiUnidadOrg.getUnidadesOrganizativas(this.userSystemService.getUnitOrg.nombre).subscribe((res: any)=>{
      if (res.data[0].subUnidades.length > 0) this.isUnitFather = true 
      else this.isUnitFather = false
    })
  }

  getUnidadOrganizativaRecintos() {
    this.apiUnidadOrg.getUnidadesOrganizativasRecintos().subscribe((res: any) => { 
      this.unidadesOrg = res.data 
      if (this.unidadesOrg.some((subUnidad: subUnidadI)=> subUnidad.nombre == this.userSystemService.getUnitOrg.nombre )) this.validPlanTransversal = true
      else this.validPlanTransversal = false
    })
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
    
    unitActiveAlert(unitOrg.nombre)
    this.getUnidadOrganizativaRecintos()
    this.isUnidadOrgFather()
  }
}
