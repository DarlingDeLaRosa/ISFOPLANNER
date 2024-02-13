import { Component, OnInit } from '@angular/core';
import { EstrategiasService } from '../services/estrategias.service';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { EjesService } from '../services/ejes.service';
import { EjesI } from '../interfaces/ejes.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertRemoveSure } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent implements OnInit {

  ejes: Array<EjesI> = [];
  estrategiaForm: FormGroup;
  estrategias: Array<EstrategiaI> = [];

  constructor(
    private fb: FormBuilder,
    private ejesService: EjesService,
    private helperHandler: HelperService,
    private estrategiasService: EstrategiasService,
  ) {
    this.estrategiaForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idEjeEstrategico: new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllEjes();
    this.getAllEstrategia();
  }

  getAllEjes() {
    this.ejesService.getEjes()
      .subscribe((resp: any) => { this.ejes = resp.data; })
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias()
      .subscribe((resp: any) => { this.estrategias = resp.data; })
  }

  postEstrategia() {
    this.estrategiasService.postEstrategias(this.estrategiaForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEstrategia(), this.estrategiaForm) })
  }

  setValueEstrategia(estrategia: EstrategiaI) {
    this.estrategiaForm.setValue({
      id: estrategia.id,
      nombre: estrategia.nombre,
      idEjeEstrategico: estrategia.ejeEstrategico.id
    });
  }

  putEstrategia() {
    this.estrategiasService.updateEstrategias(this.estrategiaForm.value, this.estrategiaForm.value.id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEstrategia(), this.estrategiaForm) })
  }

  async deleteEstrategia(estrategiaId: number) {
    let removeDesicion: boolean = await alertRemoveSure("Estas seguro de eliminar esta estrategia?")

    if (removeDesicion) {
      this.estrategiasService.DeleteEstrategias(estrategiaId)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEstrategia(), this.estrategiaForm) })
    }
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putEstrategia(), this.estrategiaForm, () => this.postEstrategia())
  }
}
