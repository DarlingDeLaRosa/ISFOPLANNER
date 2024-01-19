import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { IndicadorGestionI, ProductoI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {

  productoConsult =  {
    nombre:'',
    actividades: [{ costeo : {id: 0, montoTotalEstimado: 0}, esPrevista : true, estado: {id: 0, nombre: ''}, frecuencia: {id: 0, nombre: ''}, id: 0, nombre: '' }],
    indicadoresGestion: [{ nombre: '',linaBase:0, meta: 0, responsable:{nombre:'', id: 0}, tipoIndicador: {nombre: '', id: 0}, estructuraProgramatica: {nombre: '', id: 0}, frecuencia: {}}]
  };

  idProducto: number = 0;

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

  openModal(indicador: IndicadorGestionI) { this.dialog.open(IndicadorEditarComponent, {data: indicador}) }

  crearActividad(){
    this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {numero:this.idProducto} });
  }
}


