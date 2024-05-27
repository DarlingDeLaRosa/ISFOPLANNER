import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/appHelper.service';
import { ActividadesService } from '../../services/actividades.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { alertPeriodPromise, alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { IndicadorGestionService } from '../../../mantenimiento/services/indicadores-gestion.service';
import { IndicadoresGestionGetI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-indicadores-formulacion',
  templateUrl: './indicadores-formulacion.component.html',
  styleUrls: ['./indicadores-formulacion.component.css']
})
export class IndicadoresFormulacionComponent implements OnInit {

  idIndicador: number = 0;
  idIndicadorRecinto: number = 0
  metaIndicadorRecinto: number = 0
  indicador!: IndicadoresGestionGetI
  modulo = this.userSystemService.modulosSis
  userLogged = this.userSystemService.getUserLogged

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private indicadorService: IndicadorGestionService,
    private actividadesService: ActividadesService,
    private userSystemService: UserSystemInformationService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.idIndicador = params['id']; });
    this.getByIdIndicador();
  }

  getByIdIndicador() {
    this.indicadorService.getIndicadorByIdGestion(this.idIndicador)
      .subscribe((resp: any) => {
        this.indicador = resp.data;

        if (this.helperHandler.getExactMetaRecinto(this.indicador.indicadoresRecinto).metaRecinto == undefined && this.indicador.alcance.id != 2) {
          this.invalidIndRecinto()
        }

        if (this.indicador.alcance.id != 2) {
          this.idIndicadorRecinto = this.helperHandler.getExactMetaRecinto(this.indicador.indicadoresRecinto).metaRecinto?.id!
        }
      })
  }

  sendToNewAct() { this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: { id: this.idIndicador, indRec: this.idIndicadorRecinto } }); }
  sendToEditAct(idAct: number) { this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: { id: this.idIndicador, indRec: this.idIndicadorRecinto, idAct: idAct } }); }
  backToProducto() { this.router.navigate(['dashboard/formulacion/producto'], { queryParams: { id: this.indicador.producto.id } }); }

  async invalidIndRecinto() {
    await alertPeriodPromise("El administrador aun no establece la meta a su recinto.", `Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos `)
    this.backToProducto()
  }

  async removeActividad(id: number) {
    let removeDecision: boolean = await alertRemoveSure("¿Estas seguro de eliminar la actividad ?")

    if (removeDecision) {
      loading(true)
      this.actividadesService.removeActividades(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getByIdIndicador()) })
    }
  }
}
