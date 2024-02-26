export interface ResponseI {
    ok: boolean,
    statusCode: number,
    detail: string,
    data: []
}

export interface UserLogInI {
    username: string,
    password: string,
    idSistema: number
}

export interface UserI {
    idUsuario: number,
    usuario: string,
    nombre: string,
    apellidos: string,
    cargo: {
        idCargo: number,
        nombre: string
    },
    departamento: {
        idDepartamento: number,
        nombre: string,
        divisiones: [
            {
                id: number,
                nombre: string
            }
        ]
    },
    rol: {
        idRol: number,
        nombre: string,
        idSistema: number,
        sistema: {
            idSistema: number,
            nombre: string,
            descripcion: string,
            logo: string,
            enlace: string,
            estado: true,
            fechaCreacion: Date
            fechaModificacion: Date
            roles: [
                {
                    idRol: number,
                    nombre: string,
                    idSistema: number,
                    sistema: string
                }
            ]
        },
        modulos: [
            {
                idModulo: number,
                nombre: string,
                permiso: {
                    idPermiso: number,
                    idModulo: number,
                    crear: true,
                    editar: true,
                    eliminar: true,
                    leer: true
                }
            }
        ]
    },
    recinto: {
        idRecinto: number,
        nombre: string,
        siglas: string,
        direccion: string,
        teléfono: string,
        ext: string
    }
    unidad: string
}

