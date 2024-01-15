import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { ActividadI } from '../../interfaces/formulacion.interface';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {
  productoConsult =  {
    nombre:'',
    actividades: [{ costeo : {id: 0, montoTotalEstimado: 0}, esPrevista : true, estado: {id: 0, nombre: ''}, frecuencia: {id: 0, nombre: ''}, id: 0, nombre: '' }],
    indicadoresGestion: [{ nombre: '',linaBase:0, meta: 0, responsable:{nombre:''}, tipoIndicador: {nombre: ''}, estructuraProgramatica: {nombre: ''}}]
  };

  idProducto: number = 0;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productoApi: ProductoService,
    private actividadService: ActividadesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idProducto = params['numero'];
    });

    this.getByIdProducto();
    // this.getAllActividades();
  }

  getByIdProducto() {
    this.productoApi.getByIdProducto(this.idProducto)
      .subscribe((resp: any) => { 
        console.log(resp);
        
        this.productoConsult = resp.data;
      })
  }

  openModal() {
    this.dialog.open(IndicadorEditarComponent)
  }

  crearActividad(){
    this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {numero:this.idProducto} });
  }

  // getAllActividades(){
  //   this.actividadService.getActividades().subscribe((resp: any) => {
  //     this.actividadesList = resp.data;
  //     this.filterActividades();
  //   })
  // }

  // filterActividades() {
  //   this.actividadesProductoList = this.actividadesList.filter(item => item.producto!.id == this.idProducto);
  // }
}


