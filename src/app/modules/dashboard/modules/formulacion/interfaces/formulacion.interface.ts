import { ResponsableI } from "../../mantenimiento/components/mantenimiento-pei/interfaces/responsable.interface"
import { ProductoI } from "../../mantenimiento/interfaces/mantenimientoPOA.interface"

export interface ActividadI {
  id: number,
  nombre: string,
  idProducto: number,
  idFrecuencia: number,
  prioridad: string
  idPresupuestoInstitucional: number
  idEstado: number,
  idEstructuraProgramatica: number,
  esPrevista: boolean,
  avance: number,
  idResponsable: number,
  costeo: CosteoI,
  producto?: ProductoI,
  responsables?: ResponsableI,
  frecuencia: FrecuenciaI,
  responsableUnidad: {id:number, nombre: string}
  responsableCargo: {id:number, nombre: string}
  // resultadoEsperadoCuantitativoT2?: number,
  // resultadoEsperadoCuantitativoT3?: number,
  // resultadoEsperadoCuantitativoT4?: number,
  // resultadoEsperadoCualitativoT1?: string,
  // resultadoEsperadoCualitativoT2?: string,
  // resultadoEsperadoCualitativoT3?: string,
  // resultadoEsperadoCualitativoT4?: string,
  // resultadoObtenidoCuantitativoT1?: number,
  // resultadoObtenidoCuantitativoT2?: number,
  // resultadoObtenidoCuantitativoT3?: number,
  // resultadoObtenidoCuantitativoT4?: number,
  // resultadoObtenidoCualitativoT1?: string,
  // resultadoObtenidoCualitativoT2?: string,
  // resultadoObtenidoCualitativoT3?: string,
  // resultadoObtenidoCualitativoT4?: string
}


// export interface RegionesI {
//   id: number,
//   nombre: string,
//   provincia: ProvinciaI[]
// }

export interface InsumosI {
  id: number,
  nombre: string,
  descripcion: string,
  auxiliar:{id: number, nombre: string}
  categoriaInsumo: CategoriaInsumoI
}

export interface CategoriaInsumoI {
  id: number,
  nombre: string,
}


export interface CosteoI {
  montoTotalEstimado: number,
  costeoDetalles: CosteoDetallesI[],
}

export interface CosteoDetallesI {
  id: string,
  idInsumo: number,
  costoUnitario: number,
  idPerito: number,
  cantidad: number,
  montoTotal: number,
  fechaRecepcion: Date
  idUnidadMedida: number
  descripcionInsumo: string
}

export interface CosteoDetallesGroupI {
  id: string,
  idInsumo: number,
  costoUnitario: number,
  cantidad: number,
  idPerito: number,
  montoTotal: number,
  nombrePerito: string
  fechaRecepcion: Date
  idUnidadMedida: number
  auxiliar: string
  nombre:string
  nombreUnidadMedida: string
  descripcionInsumo: string
}

// export interface ProvinciaI {
//   id: number,
//   nombre: string,
//   region: string
// }
// export interface MunicipioI {
//   id: number,
//   nombre: string,
//   provincia: ProvinciaI
// }

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

export interface CategoriaInsumosI {
  id: number,
  nombre: string,
}

export interface UnidadesMedidaI {
  id: number,
  nombre: string,
}

export interface indicadorRecinto {
  id?: number
  metaFem: number,
  metaJvm: number,
  metaLnnm: number,
  metaEph: number,
  metaUm: number,
  metaEmh: number,
  metaRec: number
}