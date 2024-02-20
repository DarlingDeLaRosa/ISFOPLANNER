
export interface GetRolesI {
    idRol: number,
    nombre: string,
    idSistema: number,
    modulos: Getmodulos[],
}

export interface Getmodulos {
    idModulo: number,
    nombre: string,
    permiso: {
        idPermiso: number,
        idModulo: number,
        crear: boolean,
        editar: boolean,
        eliminar: boolean,
        leer: boolean
    }
}

export interface modulo {
    idModulo: number
    nombre: string
    idSistema:number
}

export interface RolesI {
    idRol: number
    rolName: string
    idSistema: number
    permisos: Permisos[]
}

export interface Permisos {
    idPermiso: number
    idModulo: number,
    crear: boolean,
    editar: boolean,
    eliminar: boolean
}