import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RolesI } from '../mantenimiento-pei/interfaces/RolesPermisos.interface';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Array<RolesI> = [];
  rolesForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService
  ){

    this.rolesForm = fb.group({

    })
  }

  ngOnInit(): void {
    
  }

  // saveChanges() {
  //   this.helperHandler.saveChanges(() => this.putSupuestoRiesgo(), this.supuestoRiesgoForm, () => this.postSupuestoRiesgo())
  // }
}
