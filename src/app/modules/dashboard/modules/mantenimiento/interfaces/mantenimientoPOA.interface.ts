import { ActividadI } from "../../formulacion/interfaces/formulacion.interface"
import { IndicadoresEstrategicosI } from "../components/mantenimiento-pei/interfaces/indicadorEstrategico.interface"
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
  actividades: ActividadI
  indicadoresGestion: IndicadorGestionI[]
  responsables: ResponsableI[]
}

export interface IndicadorGestionI {
  id?: number | null
  nombre: string,
  idProducto?: number,
  alcance?: any,
  frecuencia: any
  linaBase: number,
  meta: number,
  responsable: ResponsableI,
  tipoIndicador: { nombre: string, id: number }
  estructuraProgramatica: { nombre: string, id: number }
  // idIndicadorEstrategico: number,
  indicadoresRecinto?: {
    metaFem: number,
    metaJvm: number,
    metaLnnm: number,
    metaEph: number,
    metaUm: number,
    metaEmh: number,
    metaRec: number
  }
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

export  interface asignarUnidadOrgI{
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