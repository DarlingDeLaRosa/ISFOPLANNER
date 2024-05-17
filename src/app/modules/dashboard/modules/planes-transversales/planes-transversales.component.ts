import { format } from 'date-fns';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { ActividadesService } from '../formulacion/services/actividades.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PresupuestoInstitucionalService } from '../mantenimiento/services/presupuestoInstitucional.service';
import { ActividadI, CosteoDetallesI, postInsumoAceptacion } from '../formulacion/interfaces/formulacion.interface';

@Component({
  selector: 'planes-transversales-root',
  templateUrl: './planes-transversales.component.html',
  styleUrls: ['./planes-transversales.component.css']
})
export class PlanesTransversalesComponent implements OnInit {

  estado: boolean | null = null 
  actividadesPerito!: ActividadI[]
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

  filterByState(){
    this.getActividadesPerito() 
  }

  sendDetailInsumo(idInsumo: number, indicadorId: number) { this.router.navigate(['dashboard/planesTransversales/detallePlanTransversal'], { queryParams: { id: idInsumo, idInd: indicadorId } }); }

  getActividadesPerito() {
    this.actividadesService.getActividadesPerito(this.estado).subscribe((res: any) => { this.actividadesPerito = res.data; console.log(this.actividadesPerito );
     })
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
      peritoAceptacion: true,
      cantidad: insumo.cantidad,
      idPerito: insumo.perito.id,
      idInsumo: insumo.insumo.id,
      montoTotal: insumo.montoTotal,
      costoUnitario: insumo.costoUnitario,
      idUnidadMedida: insumo.unidadMedida.id,
      descripcionInsumo: insumo.descripcionInsumo,
      fechaRecepcion: format(new Date() , 'yyyy-MM-dd'),
    }

    this.actividadesService.postAceptacionPerito(acepObject, insumo.id, indicadorId).subscribe((res: any)=>{
      this.helperHandler.handleResponse(res, () => this.getActividadesPerito(), undefined ,() => this.getPresupuestoUnidad())
    })
  }
}
