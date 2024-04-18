import { ActividadI } from "../../formulacion/interfaces/formulacion.interface"
import { IndicadoresEstrategicosI } from "../components/mantenimiento-pei/interfaces/indicadorEstrategico.interface"
import { MedioVerificacionI } from "../components/mantenimiento-pei/interfaces/medio-verificacion.interface";
import { ResponsableI } from '../components/mantenimiento-pei/interfaces/responsable.interface';

export interface PreguntaPostI {
  id: number
  pregunta: string,
  contexto: string,
  respuesta: string,
  enlance: string
}

export interface MaterialApoyoI {
  id: number
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
  id: number
  nombre: string,
  totalConsumido: number,
  indicadorEstrategico: IndicadoresEstrategicosI
  actividades: ActividadI[]
  indicadoresGestion: IndicadoresGestionGetI[]
  responsables: ResponsableI[]
}

export interface IndicadorGestionI {
  nombre: string,
  linaBase: number,
  meta: number,
  logroEsperadoT1: number,
  logroEsperadoT2: number,
  logroEsperadoT3: number,
  logroEsperadoT4: number,
  idResponsable: number,
  idEstructuraProgramatica: number,
  idTipoIndicador: number,
  idProducto: number,
  idAlcance: number,
  idFrecuencia: number,
  mediosVerificaciones: [
    number
  ],
  responsables: number[],
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


export interface IndicadoresGestionGetI {
  id: number,
  nombre: string,
  lineaBase: number,
  meta: number,
  // montoConsumido:number
  logroEsperadoT1: number,
  logroEsperadoT2: number,
  logroEsperadoT3: number,
  logroEsperadoT4: number,
  actividades: ActividadI[]
  estructuraProgramatica: EstructuraProgramaticaI
  tipoIndicador: {
    id: number,
    nombre: string
  },
  alcance: {
    id: number,
    nombre: string
  },
  frecuencia: {
    id: number,
    nombre: string
  },
  producto: ProductoI
  responsables: ResponsableI
  mediosverificaciones: MedioVerificacionI[]
  indicadoresRecinto: {
    metaFem: number,
    metaJvm: number,
    metaLnnm: number,
    metaEph: number,
    metaUm: number,
    metaEmh: number,
    metaRec: number
  }
  historial: [
    {
      montoEjecutado: number,
      montoEjecutadoTransversal: number,
      lineaBase: number,
      meta: number,
      avance: number
    }
  ],
}

export interface UsuarioI {
  id: number | null
  usuario: string,
  nombre: string,
  apellidos: string,
  idRol: number,
  idUnidad: number,
  idCargo: number,
  idRecinto: number,
  idSistema: number
}

export interface PreguntaI {
  id: number
  actualizadoEn: Date
  contexto: string
  creadoEn: Date
  enlance: string
  pregunta: string
  respuesta: string
}


export interface UnidadOrgI {
  monto: number
  montoEjecutado: number
  montoRestante: number
  unidadOrganizativa?: subUnidadI
}

export interface asignarUnidadOrgI {
  idPresupuestoInstitucional: number,
  idUnidadOrganizativa?: number,
  monto: number
}

export interface subUnidadI {
  id: number
  nombre: string
  presupuesto: UnidadOrgI[]
  subUnidades: subUnidadI[]
  unidadPadre?: subUnidadI
  expanded?: boolean;
}

export interface PeriodoConfigI {
  id: number | null,
  idTipoProceso: number,
  FechaInicio: Date,
  FechaFin: Date,
  Prorroga: Date,
}

export interface PresupuestoInstitucionalI {
  id: number | null,
  montoTotal: number,
  justicarModificacion: string,
  fechaInicio: Date
  fechaFin: Date
}

export interface PresupuestoInstiGetI {
  enUso: boolean,
  id: number,
  montoTotal: number,
  montoRestante: number,
  montoEjecutado: number,
  justicarModificacion: string,
  fechaInicio: Date,
  fechaFin: Date,
  creadoEn: Date,
  creadoPor: string,
  actualizadoEn: Date,
  actualizadoPor: string
}