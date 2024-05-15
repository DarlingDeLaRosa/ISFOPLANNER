import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../formulacion/services/actividades.service';
import { ActividadI, CosteoDetallesI, postInsumoAceptacion } from '../formulacion/interfaces/formulacion.interface';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { HelperService } from 'src/app/services/appHelper.service';
import { PresupuestoInstitucionalService } from '../mantenimiento/services/presupuestoInstitucional.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'planes-transversales-root',
  templateUrl: './planes-transversales.component.html',
  styleUrls: ['./planes-transversales.component.css']
})
export class PlanesTransversalesComponent implements OnInit {

  actividadesPerito!: ActividadI[]
  estado: boolean | null = null 
  presupuestosUnidad: { monto: number, montoRestante: number, montoEjecutado: number } | null = { monto: 0, montoRestante: 0, montoEjecutado: 0 }

  constructor(
    private router: Router,
    private helperHandler: HelperService,
    private actividadesService: ActividadesService,
    private userSystemService: UserSystemInformationService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) { }

  ngOnInit(): void {
    this.getActividadesPerito()
    this.getPresupuestoUnidad()
  }

  sendDetailInsumo(idInsumo: number) { this.router.navigate(['dashboard/planesTransversales/detallePlanTransversal'], { queryParams: { id: idInsumo } }); }

  getActividadesPerito() {
    this.actividadesService.getActividadesPerito(this.estado).subscribe((res: any) => { this.actividadesPerito = res.data })
  }

  getPresupuestoUnidad() {
    this.apiPresupuestoInstitucional.getPresupuestoUnidad(this.userSystemService.getUnitOrg.nombre).subscribe((res: any) => { this.presupuestosUnidad = res.data })
  }

  sendToIndicador(idIndicador: number) {
    this.router.navigate(['/dashboard/formulacion/indicadores'], { queryParams: { id: idIndicador } });
  }

  aceptInsumo(insumo: CosteoDetallesI, indicadorId: number) {
    if (insumo.perito?.id == undefined) return 

    let acepObject: postInsumoAceptacion = {
      idInsumo: insumo.insumo.id,
      peritoAceptacion: true,
      cantidad: insumo.cantidad,
      fechaRecepcion: format(new Date() , 'yyyy-MM-dd'),
      idPerito: insumo.perito.id,
      montoTotal: insumo.montoTotal,
      costoUnitario: insumo.costoUnitario,
      idUnidadMedida: insumo.unidadMedida.id,
      descripcionInsumo: insumo.descripcionInsumo,
    }

    this.actividadesService.postAceptacionPerito(acepObject, insumo.id, indicadorId).subscribe((res: any)=>{
      this.helperHandler.handleResponse(res, () => this.getActividadesPerito(), undefined ,() => this.getPresupuestoUnidad())
    })
  }
}
