import { Component, OnInit } from '@angular/core';
import { EjesService } from '../services/ejes.service';
import { EjesI } from '../interfaces/ejes.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertRemoveSure } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'app-ejes',
  templateUrl: './ejes.component.html',
  styleUrls: ['./ejes.component.css']
})
export class EjesComponent implements OnInit {

  ejes: Array<EjesI> = [];
  ejeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ejesService: EjesService,
    private helperHandler: HelperService,
  ) {
    this.ejeForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      objetivo: new FormControl('', Validators.required),
      numeroEje: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllEjes();
  }

  getAllEjes() {
    this.ejesService.getEjes()
      .subscribe((resp: any) => { this.ejes = resp.data; })
  }

  postEjes() {
    this.ejesService.postEjes(this.ejeForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEjes(), this.ejeForm) })
  }

  setValueEje(eje: EjesI) { this.ejeForm.reset(eje) }

  putEjes() {
    this.ejesService.updateEjes(this.ejeForm.value, this.ejeForm.value.id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEjes(), this.ejeForm) })
  }

  async deleteEjes(eje: EjesI) {
    let remove: boolean = await alertRemoveSure("Estas seguro de eliminar este eje?")
    if (remove) {
      this.ejesService.DeleteEjes(eje.id!)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEjes(), this.ejeForm) })
    }
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putEjes(), this.ejeForm, () => this.postEjes())
  }
}
