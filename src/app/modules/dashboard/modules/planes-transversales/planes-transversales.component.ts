import { format } from 'date-fns';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { ActividadesService } from '../formulacion/services/actividades.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PresupuestoInstitucionalService } from '../mantenimiento/services/presupuestoInstitucional.service';
import { ActividadI, CosteoDetallesI, postInsumoAceptacion } from '../formulacion/interfaces/formulacion.interface';
import { alertRemoveSure } from 'src/app/alerts/alerts';

@Component({
  selector: 'planes-transversales-root',
  templateUrl: './planes-transversales.component.html',
  styleUrls: ['./planes-transversales.component.css']
})
export class PlanesTransversalesComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  estado: boolean | null | string = null
  actividadesPerito!: ActividadI[]
  modulo = this.userSystemService.modulosSis
  presupuestosUnidad: { monto: number, montoRestante: number, montoEjecutado: number } | null = { monto: 0, montoRestante: 0, montoEjecutado: 0 }

  constructor(
    private router: Router,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private actividadesService: ActividadesService,
    private userSystemService: UserSystemInformationService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) { }

  ngOnInit(): void {
    this.getActividadesPerito()
    this.getPresupuestoUnidad()
  }

  sendDetailInsumo(idInsumo: number, indicadorId: number) { this.router.navigate(['dashboard/planesTransversales/detallePlanTransversal'], { queryParams: { id: idInsumo, idInd: indicadorId } }); }

  getActividadesPerito() {
    this.actividadesService.getActividadesPerito(this.page, this.estado).subscribe((res: any) => {
      this.actividadesPerito = res.data; this.pagination = res.pagination;
    })
  }

  getPresupuestoUnidad() {
    this.apiPresupuestoInstitucional.getPresupuestoUnidad(this.userSystemService.getUnitOrg.nombre).subscribe((res: any) => { this.presupuestosUnidad = res.data })
  }

  sendToIndicador(idIndicador: number) {
    this.router.navigate(['/dashboard/formulacion/indicadores'], { queryParams: { id: idIndicador } });
  }

  async aceptInsumo(insumo: CosteoDetallesI, indicadorId: number) {
    if (insumo.perito?.id == undefined) return
    let acepDecision: boolean = await alertRemoveSure(`¿Estas seguro de aceptar el insumo solicitado?`)

    if (acepDecision) {
      let acepObject: postInsumoAceptacion = {
        id: insumo.id,
        peritoAceptacion: true,
        cantidad: insumo.cantidad,
        idPerito: insumo.perito.id,
        idInsumo: insumo.insumo.id,
        montoTotal: insumo.montoTotal,
        costoUnitario: insumo.costoUnitario,
        idUnidadMedida: insumo.unidadMedida.id,
        descripcionInsumo: insumo.descripcionInsumo,
        fechaRecepcion: format(new Date(), 'yyyy-MM-dd'),
      }

      this.actividadesService.postAceptacionPerito(acepObject, indicadorId).subscribe((res: any) => {
        this.helperHandler.handleResponse(res, () => this.getActividadesPerito(), undefined, () => this.getPresupuestoUnidad())
      })
    }
  }

  async rejectInsumo(insumo: CosteoDetallesI) {
    if (insumo.perito?.id == undefined) return
    let removeDecision: boolean = await alertRemoveSure(`¿Estas seguro de rechazar el insumo solicitado?`)

    if (removeDecision) {
      let acepObject: {id: number, montoTotal: number} = {
        id: insumo.id,
        montoTotal: insumo.montoTotal,
      }

      this.actividadesService.postRechazoPerito(acepObject).subscribe((res: any) => {
        this.helperHandler.handleResponse(res, () => this.getActividadesPerito(), undefined, () => this.getPresupuestoUnidad())
      })
    }
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getActividadesPerito()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
        ; this.getActividadesPerito()
    }
  }
}
