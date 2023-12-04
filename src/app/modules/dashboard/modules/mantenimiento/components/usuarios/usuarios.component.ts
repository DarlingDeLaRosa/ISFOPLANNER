import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuarios.service';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { MaterialApoyoService } from '../../services/material-apoyo.service';
import { sistema } from 'src/environments/environments';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosForm: FormGroup;
  usuarios: any[] = []
  recintos: any[] = []
  cargos: any[] = []
  roles: any[] = []
  unidadesOrg: any[] = []
  
  constructor(
    public fb: FormBuilder,
    private apiUsuario: UsuarioService,
    private apiUnidadOrg: UnidadOrganizativaService

  ) {
    this.usuariosForm = this.fb.group({
      id: 0,
      usuario: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      idRol: new FormControl('', Validators.required),
      idUnidad: new FormControl('', Validators.required),
      idCargo: new FormControl('', Validators.required),
      idRecinto: new FormControl('', Validators.required),
      idSistema: sistema.idSistema
    })
  }
  
  ngOnInit(): void {
    this.getAllRecintos()
    this.getAllCargos()
    this.getUsuarios()
    this.getAllRoles()
    this.getUnidadOrganizativa()
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.unidadesOrg = res.data
      })
  }


  getAllRecintos() {
    this.apiUsuario.getAllRecintos()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        this.recintos = res.data
      })
  }

  getAllRoles() {
    this.apiUsuario.getAllRoles()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        this.roles = res.data
      })
  }

  getAllCargos() {
    this.apiUsuario.getAllCargos()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        this.cargos = res.data
      })
  }

  getUsuarios() {
    this.apiUsuario.getUsuario()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        
        this.usuarios = res.data
      })
  }

  postUsuarios() {
    this.apiUsuario.postUsuario(this.usuariosForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUsuarios()
          this.usuariosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putUsuarios() {
    this.apiUsuario.putUsuario(this.usuariosForm.value)
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUsuarios()
          this.usuariosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  async deleteUsuarios(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el usuario.")

    if (removeDecision) {
      this.apiUsuario.removeUsuario(id)
        .pipe(
          catchError((error) => {
            alertServerDown()
            return throwError(error)
          })
        )
        .subscribe((res: any) => {
          console.log(res);

          if (res.ok) {

            alertRemoveSuccess()
            this.getUsuarios()

          } else {
            errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
          }
        })
    }
  }

  setValueEditUsuarios(usuarios: any) {
    this.usuariosForm.reset(usuarios)
  }

  saveChangesButton() {
    console.log(this.usuariosForm.value);
    
    if (this.usuariosForm.valid) {
      if (this.usuariosForm.value.id > 0) this.putUsuarios()
      else this.postUsuarios()
    } else {
      alertNoValidForm()
    }
  }

}
