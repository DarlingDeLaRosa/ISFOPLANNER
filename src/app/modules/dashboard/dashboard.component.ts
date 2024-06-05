import { Router } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PermissionService } from '../../services/applyPermissions.service';
import { UnidadDataI, UserI, subUnit } from 'src/app/interfaces/Response.interfaces';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { UnidadOrganizativaService } from './modules/mantenimiento/services/unidad-organizativa.service';
import { periodoConfig, subUnidadI } from './modules/mantenimiento/interfaces/mantenimientoPOA.interface';
import { ConfiguracionPeriodoServive } from './modules/mantenimiento/services/configuracion-periodos.service';
import { alertNoUserLevel, alertRemoveSure, loading, successMessageAlert, unitActiveAlert } from 'src/app/alerts/alerts';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit, OnDestroy {
  
  dropdownOpen = false;
  isUnitFather: boolean = false
  sidenavOpened: boolean = false
  unidadesOrg: subUnidadI[] = []
  validPlanTransversal: boolean = false
  modulo = this.userSystemService.modulosSis
  userLogged: UserI = this.userSystemService.getUserLogged
  unidadOrgData: UnidadDataI = this.userSystemService.isUnidadOrgFather

  constructor(
    private router: Router,
    public helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    public autenticationService: AuthenticationService,
    private periodoService: ConfiguracionPeriodoServive,
    public userSystemService: UserSystemInformationService,
  ) { }

  ngOnInit(): void {
    this.getPeriodoConfig()
    this.isUnidadOrgFather()
    this.validUnidadOrganizativaRecintos()

    if (this.unidadOrgData.unidad == 'DEPARTAMENTO DE TECNOLOGIAS DE LA INFORMACION Y COMUNICACION' || this.unidadOrgData.unidad == 'DIRECCION DE PLANIFICACION Y DESARROLLO') {
      this.getAllUnits()
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); 
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (event && event.target) {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.closest('.btnMenuContainer')) {
        this.dropdownOpen = false;
      }
    }
  }

  ngOnDestroy() { document.removeEventListener('click', this.handleClickOutside.bind(this)); }

  async logOut() {
    let logOutDecision: boolean = await alertRemoveSure("¿ Estas seguro de cerrar sesión ?")
    if (logOutDecision) this.sendOut()
  }

  isUnidadOrgFather() {
    if (this.unidadOrgData.userLevel == 1) {
      this.noUserLevel()
      return
    }

    this.apiUnidadOrg.getUnidadesOrganizativas(this.userSystemService.getUnitOrg.nombre).subscribe((res: any) => {
      if (res.data[0].subUnidades.length > 0) this.isUnitFather = true
      else this.isUnitFather = false
    })
  }

  getAllUnits() {
    this.apiUnidadOrg.getUnidadesOrganizativas('', false, true).subscribe((res: any) => {
      this.userSystemService.addUnitsToSubUnits = res.data
    })
  }

  validUnidadOrganizativaRecintos() {
    this.apiUnidadOrg.getUnidadesOrganizativasPeritos().subscribe((res: any) => {
      this.unidadesOrg = res.data
      if (this.helperHandler.findUnitOrgRec(this.userSystemService.getUnitOrg.nombre, this.unidadesOrg)) this.validPlanTransversal = true
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

  sendOut() {
    loading(true)
    this.autenticationService.postLogOut(this.userSystemService.getToken).subscribe((res: any) => {
      if (res.success) {
        loading(false)
        localStorage.clear()
        if (this.unidadOrgData.userLevel != 1) successMessageAlert(res.message)
        this.router.navigate(['/login'])
      }
    })
  }

  async noUserLevel() {
    await alertNoUserLevel()
    this.sendOut()
  }

  changeUnitOrg(unitOrg: subUnit) {
    this.dropdownOpen = !this.dropdownOpen;
    this.userSystemService.setUnitOrg = unitOrg
    this.userSystemService.unitChange.emit()
    this.router.navigate(['dashboard/ayuda']);

    unitActiveAlert(unitOrg.nombre)
    this.validUnidadOrganizativaRecintos()
    this.isUnidadOrgFather()
  }
}
