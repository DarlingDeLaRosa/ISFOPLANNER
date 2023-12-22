export interface ActividadI{
  id?:number,
  nombre: string,
  idProducto: 0,
  idFrecuencia: 0,
  idEstado: 0,
  idEstructuraProgramatica: 0,
  esPrevista: true,
  avance: 0,
  resupuestoEstimado?: 0,
  resultadoEsperadoCuantitativoT1?: 0,
  resultadoEsperadoCuantitativoT2?: 0,
  resultadoEsperadoCuantitativoT3?: 0,
  resultadoEsperadoCuantitativoT4?: 0,
  resultadoEsperadoCualitativoT1?: string,
  resultadoEsperadoCualitativoT2?: string,
  resultadoEsperadoCualitativoT3?: string,
  resultadoEsperadoCualitativoT4?: string,
  // resultadoObtenidoCuantitativoT1?: 0,
  // resultadoObtenidoCuantitativoT2?: 0,
  // resultadoObtenidoCuantitativoT3?: 0,
  // resultadoObtenidoCuantitativoT4?: 0,
  // resultadoObtenidoCualitativoT1?: string,
  // resultadoObtenidoCualitativoT2?: string,
  // resultadoObtenidoCualitativoT3?: string,
  // resultadoObtenidoCualitativoT4?: string
}

export interface RegionesI{
  id: number,
  nombre:string,
  provincia: ProvinciaI []
}

export interface ProvinciaI {
  id: number,
  nombre: string,
  region: string
}
export interface MunicipioI {
  id: number,
  nombre: string,
  provincia: ProvinciaI
}
export interface EstadoI {
  id: number,
  nombre: string,
  creadoPor: number
}
export interface FrecuenciaI {
  id: number,
  nombre: string,
}
export interface MesesI {
  id: number,
  nombre: string,
  trimestre: string
}
