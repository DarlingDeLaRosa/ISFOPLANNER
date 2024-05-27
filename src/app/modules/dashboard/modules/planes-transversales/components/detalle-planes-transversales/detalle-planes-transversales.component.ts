import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/appHelper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActividadesService } from '../../../formulacion/services/actividades.service';
import { CosteoDetallesI, UnidadesMedidaI } from '../../../formulacion/interfaces/formulacion.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { loading } from 'src/app/alerts/alerts';

@Component({
  selector: 'app-detalle-planes-transversales',
  templateUrl: './detalle-planes-transversales.component.html',
  styleUrls: ['./detalle-planes-transversales.component.css']
})
export class DetallePlanesTransversalesComponent implements OnInit {

  idInsumo: number = 0
  insumoForm: FormGroup;
  idIndicador: number = 0
  insumoDetalle!: CosteoDetallesI
  unidadesMedidaList: Array<UnidadesMedidaI> = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private helperHandler: HelperService,
    private actividadesService: ActividadesService,
  ) {

    this.insumoForm = this.fb.group({
      cantidad: new FormControl('', Validators.required),
      idPerito: new FormControl('', Validators.required),
      idInsumo: new FormControl('', Validators.required),
      montoTotal: new FormControl('', Validators.required),
      costoUnitario: new FormControl('', Validators.required),
      idUnidadMedida: new FormControl('', Validators.required),
      fechaRecepcion: new FormControl('', Validators.required),
      descripcionInsumo: new FormControl('', Validators.required),
      peritoAceptacion: new FormControl('', Validators.required),
    })

    this.route.queryParams.subscribe(params => { 
      this.idInsumo = parseInt(params['id']) 
      this.idIndicador = parseInt(params['idInd']) 
    });
  }

  ngOnInit(): void {
    this.getUnidadesMedida()
  }

  calculateMontoTotal() {
    this.insumoForm.patchValue({ 
      montoTotal: this.insumoForm.value.cantidad * this.insumoForm.value.costoUnitario 
    })
  }
  
  getInsumoById() {
    this.actividadesService.getInsumoById(this.idInsumo).subscribe((res: any) => {
      this.insumoDetalle = res.data
      const { data } = res

      this.insumoForm.patchValue({
        peritoAceptacion: true,
        cantidad: data.cantidad,
        idPerito: data.perito.id,
        idInsumo: data.insumo.id,
        montoTotal: data.montoTotal,
        costoUnitario: data.costoUnitario,
        fechaRecepcion: data.fechaRecepcion,
        idUnidadMedida: data.unidadMedida.id,
        descripcionInsumo: data.descripcionInsumo,
      })
    })
  }

  getUnidadesMedida() {
    this.actividadesService.getUnidadesMedida().subscribe((resp: any) => {
      this.unidadesMedidaList = resp.data;
      this.getInsumoById()
    })
  }

  postaceptInsumo() {
    loading(true)
    console.log(this.insumoForm.value);
    
    this.actividadesService.postAceptacionPerito(this.insumoForm.value, this.insumoDetalle.id, this.idIndicador)
    .subscribe((res: any) => {
      this.helperHandler.handleResponse(res, () => '')
      if (res.ok) { this.router.navigate(['dashboard/planesTransversales']) }
    })
  }
}
