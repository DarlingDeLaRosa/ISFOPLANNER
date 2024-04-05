import { ProductoI } from "../../../interfaces/mantenimientoPOA.interface";
import { InvolucradoI } from "./involucrado.interface";
import { RequerimientoI } from "./requerimientos.interface";
import { ResponsableI } from "./responsable.interface";
import { ResultadoEfectoI } from "./resultadoEfecto";
import { MedioVerificacionI } from './medio-verificacion.interface';
import { SupuestosRiesgosI } from "./supuestos-riesgos.interface";

export interface IndicadoresEstrategicosI {
  id?: number,
  nombre: string,
  lineaBase: number,
  meta: number,
  creadoPor?: number,
  tipoIndicador: {id: number, nombre: string}
  // idResultadoefecto: number
  resultadoEfecto: ResultadoEfectoI,
  productos: ProductoI[],
  mediosverificaciones: MedioVerificacionI[],
  supuestosRiesgos: SupuestosRiesgosI[],
  requerimientos: RequerimientoI[],
  cronograma: CronogramaI,
  responsables: ResponsableI[];
  // involucrados: InvolucradoI[];
}

export interface CronogramaI {
  anio1: number,
  anio2: number,
  anio3: number,
  anio4: number,
  metaAnio3: number,
  metaAnio2: number,
  metaAnio1: number,
  metaAnio4: number
}
