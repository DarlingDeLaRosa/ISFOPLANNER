export interface PreguntaI {
  id: number | null
  pregunta: string,
  contexto: string,
  respuesta: string,
  enlance: string
}

export interface MaterialApoyoI {
  id: number | null
  titulo: string,
  descripcion: string,
  enlace: string,
  versionDocumento: string,
  idUnidadOrganizativa: number | null
  unidadOrganizativa: number | null
}

export interface EstructuraProgramaticaI {
  id: number | null
  nombre: string,
  codigo: string,
}

export interface ProductoI {
  id: number | null
  nombre: string,
}


export interface IndicadorGestionI {
  id: number | null
  nombre: string,
  idProducto: number,
  idAlcance: number,
  idIndicadorEstrategico: number,
  indicadoresRecinto: {
    metaFem: number,
    metaJvm: number,
    metaLnnm: number,
    metaEph: number,
    metaUm: number,
    metaEmh: number,
    metaRec: number
  }
}

