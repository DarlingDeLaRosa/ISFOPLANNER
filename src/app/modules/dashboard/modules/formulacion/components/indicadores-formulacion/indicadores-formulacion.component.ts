import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';
import { ActividadesService } from '../../services/actividades.service';
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
  userLogged = this.userSystemService.getUserLogged

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public helperHandler: HelperService,
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
        this.indicador = resp.data; console.log(resp);
        if (this.indicador.alcance.id != 2) this.idIndicadorRecinto =  this.helperHandler.getExactMetaRecinto(this.indicador.indicadoresRecinto).metaRecinto?.id!
      })
  }
  
  sendToNewAct(){ this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {id: this.idIndicador, indRec: this.idIndicadorRecinto} }); }
  sendToEditAct(idAct: number){ this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {id: this.idIndicador, indRec: this.idIndicadorRecinto, idAct: idAct} }); }
  backToProducto() { this.router.navigate(['dashboard/formulacion/producto'], { queryParams: { id: this.indicador.producto.id } });}

  async removeActividad(id: number){
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la actividad ?")

    if (removeDecision) {
      loading(true)
      this.actividadesService.removeActividades(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getByIdIndicador())})
    }
  }
}
