import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetRolesI } from '../../components/mantenimiento-pei/interfaces/RolesPermisos.interface';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.css']
})
export class RolesViewComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public rol: GetRolesI) {}
}
