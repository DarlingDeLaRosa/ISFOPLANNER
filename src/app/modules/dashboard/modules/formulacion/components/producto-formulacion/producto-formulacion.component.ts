import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { IndicadorGestionI, IndicadoresGestionGetI, ProductoI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {

  idProducto: number = 0;
  productoConsult!: ProductoI

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productoApi: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.idProducto = params['numero']; });
    this.getByIdProducto();
  }

  getByIdProducto() {
    this.productoApi.getByIdProducto(this.idProducto)
      .subscribe((resp: any) => { this.productoConsult = resp.data; console.log(resp); })
  }

  openModal(indicador: IndicadoresGestionGetI) { this.dialog.open(IndicadorEditarComponent, {data: indicador}) }
  
  crearActividad(){ this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {numero:this.idProducto} }); }
}


