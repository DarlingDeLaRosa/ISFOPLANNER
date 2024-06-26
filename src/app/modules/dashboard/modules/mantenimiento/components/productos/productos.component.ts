import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { ProductoService } from '../../services/producto.service';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';
import { ResponsableI } from '../mantenimiento-pei/interfaces/responsable.interface';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { EntidadListViewComponent } from '../../modals/entidad-list-view/responsible-view.component';
import { IndicadoresEstrategicosI } from '../mantenimiento-pei/interfaces/indicadorEstrategico.interface';
import { IndicadorEstrategicoService } from '../mantenimiento-pei/services/indicadoresEstrategicos.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI, subUnit } from 'src/app/interfaces/Response.interfaces';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  prosupuestoInsti: number = 0
  productosForm: FormGroup
  productos!: ProductoI[];
  unidadesOrg: subUnidadI[] = []
  modulo = this.userSystemService.modulosSis
  indicadoresEstrategicos: IndicadoresEstrategicosI[] = []

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private helperHandler: HelperService,
    private apiProducto: ProductoService,
    public permisosCRUD: PermissionService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private userSystemService: UserSystemInformationService,
    private apiIndicadoresEstrategicos: IndicadorEstrategicoService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {
    this.productosForm = this.fb.group({
      id: 0,
      idPresupuesto: 0,
      nombre: new FormControl('', Validators.required),
      responsables: new FormControl('', Validators.required),
      idIndicadorEstrategico: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getProducto()
    this.getUnidadOrganizativa()
    this.getIndicadoresEstrategicos()
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(this.page, true)
      .subscribe((res: any) => { 
        if ( res.data.length > 0){
          this.productosForm.patchValue({ idPresupuesto: res.data[0].id }) 
          this.prosupuestoInsti = res.data[0].id
        }
      })
  }

  getIndicadoresEstrategicos() {
    this.apiIndicadoresEstrategicos.getIndicadoresEstrategicos(1,100)
      .subscribe((res: any) => { this.indicadoresEstrategicos = res.data })
  }

  getProducto() {
    this.apiProducto.getProducto(this.page).subscribe((res: any) => { this.productos = res.data;this.pagination = res.pagination;})
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas('',true)
      .subscribe((res: any) => { this.unidadesOrg = res.data; })
  }

  postProducto() {
    this.apiProducto.postProducto(this.productosForm.value)
    .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getProducto(), this.productosForm, ()=> this.getPresupuestoInstitucional()) })
  }

  putProducto() {
    this.apiProducto.putProducto(this.productosForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getProducto(), this.productosForm, ()=> this.getPresupuestoInstitucional()) })
  }

  async deleteProducto(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el producto.")

    if (removeDecision) {
      loading(true)
      this.apiProducto.removeProducto(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getProducto(), this.productosForm, ()=> this.getPresupuestoInstitucional()) })
    }
  }

  openModal(elementoList: any[], nombre: string, entidad: string) {
    this.dialog.open(EntidadListViewComponent, { data: { elementoList, nombre, entidad } })
  }

  setValueEditProducto(producto: any) {
    this.productosForm.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      idIndicadorEstrategico: producto.indicadorEstrategico.id,
      responsables: producto.responsables.map((responsable: ResponsableI)=>{ return responsable.id}),
    })
  }

  clearForm(){
    this.productosForm.reset()
    this.productosForm.patchValue({ idPresupuesto: this.prosupuestoInsti })
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putProducto(), this.productosForm, () => this.postProducto())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getProducto()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getProducto()
    }
  }
}
