import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndicadorEditarComponent } from '../../modals/indicador-editar/indicador-editar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../mantenimiento/services/producto.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Component({
  selector: 'app-producto-formulacion',
  templateUrl: './producto-formulacion.component.html',
  styleUrls: ['./producto-formulacion.component.css']
})
export class ProductoFormulacionComponent implements OnInit {
  productoConsult =  {
    nombre:'',
    indicadoresGestion: [{ nombre: '',linaBase:0, meta: 0, responsable:{nombre:''}, tipoIndicador: {nombre: ''}, estructuraProgramatica: {nombre: ''}}]
  };

  idProducto: number = 0;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productoApi: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idProducto = params['numero'];
      console.log(this.idProducto);
    });

    this.getByIdProducto();
  }

  getByIdProducto() {
    this.productoApi.getByIdProducto(this.idProducto)
      .subscribe((resp: any) => {this.productoConsult = resp.data;})
  }

  openModal() {
    this.dialog.open(IndicadorEditarComponent)
  }

  crearActividad(){
    this.router.navigate(['dashboard/formulacion/actividad'], { queryParams: {numero:this.idProducto} });
  }
}


