import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { alertRemoveSure } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { IndicadorEstrategicoService } from '../mantenimiento-pei/services/indicadoresEstrategicos.service';
import { HelperService } from 'src/app/services/appHelper.service';
import { ProductoI, subUnidadI } from '../../interfaces/mantenimientoPOA.interface';
import { IndicadoresEstrategicosI } from '../mantenimiento-pei/interfaces/indicadorEstrategico.interface';
import { ResponsableI } from '../mantenimiento-pei/interfaces/responsable.interface';
import { DetailViewComponent } from '../../modals/detail-view/detail-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosForm: FormGroup
  productos: ProductoI[] = []
  indicadoresEstrategicos: IndicadoresEstrategicosI[] = []
  unidadesOrg: subUnidadI[] = []

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private apiProducto: ProductoService,
    private apiIndicadoresEstrategicos: IndicadorEstrategicoService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private helperHandler: HelperService

  ) {
    this.productosForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      responsables: new FormControl('', Validators.required),
      idIndicadorEstrategico: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getProducto()
    this.getIndicadoresEstrategicos()
    this.getUnidadOrganizativa()
  }


  getIndicadoresEstrategicos() {
    this.apiIndicadoresEstrategicos.getIndicadoresEstrategicos()
      .subscribe((res: any) => { this.indicadoresEstrategicos = res.data })
  }

  getProducto() {
    this.apiProducto.getProducto()
      .subscribe((res: any) => { this.productos = res.data })
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => { this.unidadesOrg = res.data; })
  }

  postProducto() {
    console.log(this.productosForm.value);
    
    this.apiProducto.postProducto(this.productosForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getProducto(), this.productosForm) })
  }

  putProducto() {
    this.apiProducto.putProducto(this.productosForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getProducto(), this.productosForm) })
  }

  async deleteProducto(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el producto.")

    if (removeDecision) {
      this.apiProducto.removeProducto(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getProducto(), this.productosForm) })
    }
  }

  openModal(responsables: ResponsableI[]) {
    this.dialog.open(DetailViewComponent, { data: responsables })
  }

  setValueEditProducto(producto: any) {
    console.log(producto);
    
    this.productosForm.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      idIndicadorEstrategico: producto.indicadorEstrategico.id,
      responsables: producto.responsables.map((responsable: ResponsableI)=>{ return responsable.id}),
    })
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putProducto(), this.productosForm, () => this.postProducto())
  }
}
