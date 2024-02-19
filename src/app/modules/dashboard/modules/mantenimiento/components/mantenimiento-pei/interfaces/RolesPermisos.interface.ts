export interface RolesI {
    idRol: number
    nombre: string
    permisos: Permisos[]
}

export interface Permisos {
    idPermiso: number
    idModulo: number,
    crear: boolean,
    editar: boolean,
    eliminar: boolean
}