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
  mesesImpacto: { id: number, nombre: string }[]
  responsableUnidad: { id: number, nombre: string }
  responsableCargo: { id: number, nombre: string }
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
  auxiliar: { id: number, nombre: string }
  categoriaInsumo: CategoriaInsumoI
}

export interface CategoriaInsumoI {
  id: number,
  nombre: string,
}


export interface CosteoI {
  id: number
  montoTotalEstimado: number,
  montoTotalTransversal: number
  costeoDetalle: CosteoDetallesI[],
}

export interface CosteoDetallesI {
  id: number,
  idInsumo: number,
  costoUnitario: number,
  idPerito: number,
  peritoAceptacion?: boolean
  insumo: any
  cantidad: number,
  montoTotal: number,
  fechaRecepcion: Date
  idUnidadMedida: number
  unidadMedida?: any
  descripcionInsumo: string
}

// export interface CosteoDetallesGetI {
//       id: number,
//       costoUnitario: number,
//       cantidad: number,
//       montoTotal: number,
//       fechaRecepcion: Date,
//       insumo: {
//         id: number,
//         nombre: string,
//         descripcion: string,
//         categoriaInsumo: { id: number, nombre: string },
//         auxiliar: { id: number, nombre: string }
//       },
//       descripcionInsumo: string,
//       perito: { id: number, nombre: string },
//       unidadMedida: { id: number, nombre: string }
// }

export interface CosteoDetallesGroupI {
  id: number,
  idInsumo: number,
  costoUnitario: number,
  cantidad: number,
  idPerito: any,
  montoTotal: number,
  peritoAceptacion?: boolean
  nombrePerito: string
  fechaRecepcion: Date
  idUnidadMedida: number
  auxiliar: string
  insumo: any
  nombre: string
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

export interface indicadorMetaRecintos {
  id?: number
  meta: number,
  logroEsperadoT1?: number,
  logroEsperadoT2?: number,
  logroEsperadoT3?: number,
  logroEsperadoT4?: number,
  idResponsable: number
}

export interface indicadorMetaRecintosGet {
  id: number
  meta: number,
  logroEsperadoT1: number,
  logroEsperadoT2: number,
  logroEsperadoT3: number,
  logroEsperadoT4: number,
  actividades: ActividadI[]
  montoTotalActividades: number
  montoTotalActividadesTransversales: number
  responsable: { id: number, nombre: string }
}


