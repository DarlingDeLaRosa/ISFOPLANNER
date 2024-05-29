import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/appHelper.service';
import { ActividadI } from '../../interfaces/formulacion.interface';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { IndicadorEditarRecintosComponent } from '../../modals/indicador-editar-recintos/indicador-editar-recintos.component';
import { IndicadoresGestionGetI, ProductoI, subUnidadI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { IndicadorVistaMetaComponent } from '../../modals/indicador-vista-meta/indicador-vista-meta.component';
import { UnidadOrganizativaService } from '../../../mantenimiento/services/unidad-organizativa.service';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {

  idProducto: number = 0
  unitSiglas: string = ''
  listOfAct!: ActividadI[]
  productoConsult!: ProductoI
  unidadesOrg: subUnidadI[] = []
  metaIndicadorRecinto: number = 0
  modulo = this.userSystemService.modulosSis
  unitIndices: { [key: number]: number } = {};
  userLogged = this.userSystemService.getUserLogged
  exactUnit =  this.userSystemService.getUnitOrg.nombre
  curretUnit: string = this.userSystemService.getUnitOrg.nombre
  montosEstimados: { mte: number, mtte: number } = { mte: 0, mtte: 0 }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private productoService: ProductoService,
    private unidadOrgService: UnidadOrganizativaService,
    private userSystemService: UserSystemInformationService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.idProducto = params['id']; });
    this.getUnidadOrganizativaRecintos()
    this.getByIdProducto();
  }

  getUnidadOrganizativaRecintos() {
    this.unidadOrgService.getUnidadesOrganizativasRecintos().subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getByIdProducto() {
    this.productoService.getByIdProducto(this.idProducto).subscribe((resp: any) => {
      this.productoConsult = resp.data; })
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

  getActArrayRecinto(indicador: IndicadoresGestionGetI): ActividadI[] {
    if (this.userLogged.recinto.siglas != 'REC') this.listOfAct = this.helperHandler.getExactMetaRecinto(indicador.indicadoresRecinto).metaRecinto?.actividades!
    else {
      const indicadorIndex = this.unitIndices[indicador.id];
      if (indicador.indicadoresRecinto.length > 0) {
      
      if (indicadorIndex !== undefined) {
          let { actividades, sigla, montos } = this.helperHandler.getDiferentMetaRecinto(indicador.indicadoresRecinto)[this.unitIndices[indicador.id]]
          this.listOfAct = actividades;
          this.unitSiglas = sigla
          this.montosEstimados = montos
        } else {
          this.unitIndices[indicador.id] = 0;
          let { actividades, sigla, montos } = this.helperHandler.getDiferentMetaRecinto(indicador.indicadoresRecinto)[0]
          this.listOfAct = actividades;
          this.unitSiglas = sigla
          this.montosEstimados = montos
        }
      }
    }
    return this.listOfAct
  }

  nextRecinto(indicadorId: number) {
    if (this.unitIndices[indicadorId] === undefined) {
      this.unitIndices[indicadorId] = 0;
    } else {
      if (this.unitIndices[indicadorId] === 6) this.unitIndices[indicadorId] = 0;
      else this.unitIndices[indicadorId] += 1;
    }
  }

  backRecinto(indicadorId: number) {
    if (this.unitIndices[indicadorId] === undefined) {
      this.unitIndices[indicadorId] = 6;
    } else {
      if (this.unitIndices[indicadorId] === 0) this.unitIndices[indicadorId] = 6;
      else this.unitIndices[indicadorId] -= 1;
    }
  }
}


