import { Injectable } from '@angular/core';
import { UserSystemInformationService } from './user-system-information.service';

@Injectable({
    providedIn: 'root'
})

export class PermissionService {
    modulos?: any[] = this.userSystemService.getUserLogged?.rol.modulos

    constructor(
        private userSystemService: UserSystemInformationService,
    ){}

    permisoLeer(idModulo: number): boolean {
        const modulo = this.modulos?.find((modulo: any) => modulo.idModulo === idModulo);
        return modulo.permiso.leer ? true : false;
    }

    permisoCrear(idModulo: number): boolean {
        const modulo = this.modulos?.find((modulo: any) => modulo.idModulo === idModulo);
        return modulo.permiso.crear ? true : false;
    }

    permisoEditar(idModulo: number): boolean {
        const modulo = this.modulos?.find((modulo: any) => modulo.idModulo === idModulo);
        return modulo.permiso.editar ? true : false;
    }

    permisoEliminar(idModulo: number): boolean {
        const modulo = this.modulos?.find((modulo: any) => modulo.idModulo === idModulo);
        return modulo.permiso.eliminar ? true : false;
    }
}