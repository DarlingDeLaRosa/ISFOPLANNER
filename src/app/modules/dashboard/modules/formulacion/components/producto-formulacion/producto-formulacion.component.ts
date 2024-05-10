import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { IndicadoresGestionGetI, ProductoI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadI, indicadorMetaRecintosGet } from '../../interfaces/formulacion.interface';
import { IndicadorEditarRecintosComponent } from '../../modals/indicador-editar-recintos/indicador-editar-recintos.component';
import { IndicadorVistaMetaComponent } from '../../modals/indicador-vista-meta/indicador-vista-meta.component';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {

  unitIndex: number = 0
  idProducto: number = 0
  unitSiglas: string = ''
  listOfAct!: ActividadI[]
  productoConsult!: ProductoI
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
    this.productoService.getByIdProducto(this.idProducto).subscribe((resp: any) => {
      this.productoConsult = resp.data; console.log(resp.data);
    })
  }

  openModalIndicadoresRecinto(indicador: number) {
    let dialogRef = this.dialog.open(IndicadorEditarComponent, { data: indicador })
    dialogRef.afterClosed().subscribe(() => { this.getByIdProducto() })
  }

  openModalVistaIndicadoresRecinto(indicador: number) {
    let dialogRef = this.dialog.open(IndicadorVistaMetaComponent, { data: indicador })
    dialogRef.afterClosed().subscribe(() => { this.getByIdProducto() })
  }

  openModalResultadoEsperado(indicador: number) {
    let dialogRef = this.dialog.open(IndicadorEditarRecintosComponent, { data: indicador })
    dialogRef.afterClosed().subscribe(() => { this.getByIdProducto() })
  }

  sendToIndicador(idIndicador: number) {
    this.router.navigate(['/dashboard/formulacion/indicadores'], { queryParams: { id: idIndicador } });
  }

  changeArrayAct(indicador: IndicadoresGestionGetI): number {
    let unitRecinto

    this.unitIndex = indicador.indicadoresRecinto.findIndex((metaRecinto: indicadorMetaRecintosGet) => {
      unitRecinto = metaRecinto.responsable.nombre.split(' ').pop()
      this.unitSiglas = unitRecinto ? unitRecinto : ''
      return unitRecinto == this.userLogged.recinto.siglas
    })

    if (this.unitIndex == -1) {
      this.unitIndex = 6
      this.unitSiglas = 'REC'
    }
    
    return this.unitIndex
  }

  nextRecinto() {
    if (this.unitIndex == 6) this.unitIndex = 0
    else this.unitIndex += 1
  }

  backRecinto() {
    if (this.unitIndex == 0) this.unitIndex = 6
    else this.unitIndex -= 1
  }
}


