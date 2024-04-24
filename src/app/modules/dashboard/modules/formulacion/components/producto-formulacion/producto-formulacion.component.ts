import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { IndicadoresGestionGetI, ProductoI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { IndicadorEditarRecintosComponent } from '../../modals/indicador-editar-recintos/indicador-editar-recintos.component';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {

  productoConsult!: ProductoI
  idProducto: number = 0;
  metaIndicadorRecinto: number = 0
  userLogged = this.userSystemService.getUserLogged
  curretUnit: string = this.userSystemService.getUnitOrg.nombre

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public helperHandler: HelperService,
    private productoService: ProductoService,
    private actividadesService: ActividadesService,
    private userSystemService: UserSystemInformationService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.idProducto = params['id']; });
    this.getByIdProducto();
  }

  getByIdProducto() {
    this.productoService.getByIdProducto(this.idProducto).subscribe((resp: any) => { this.productoConsult = resp.data; console.log(resp.data); })
  }

  openModalIndicadoresRecinto(indicador: IndicadoresGestionGetI) {
    let dialogRef = this.dialog.open(IndicadorEditarComponent, { data: indicador })
    dialogRef.afterClosed().subscribe(() => { this.getByIdProducto() })
  }

  openModalResultadoEsperado(indicador: IndicadoresGestionGetI) {
    let dialogRef = this.dialog.open(IndicadorEditarRecintosComponent, { data: indicador })
    dialogRef.afterClosed().subscribe(() => { this.getByIdProducto() })
  }

  sendToIndicador(idIndicador: number) {
    this.router.navigate(['/dashboard/formulacion/indicadores'], { queryParams: { id: idIndicador } });
  }
  // sendToNewAct(){ this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {id: this.idProducto} }); }
  // sendToEditAct(idAct: number){ this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {id: this.idProducto, idAct: idAct} }); }


  // async removeActividad(id: number){
  //   let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el insumo?")

  //   if (removeDecision) {
  //     loading(true)
  //     this.actividadesService.removeActividades(id)
  //       .subscribe((res: any) => {
  //         this.helperHandler.handleResponse(res, () => this.getByIdProducto())
  //       })
  //   }
  // }
}


