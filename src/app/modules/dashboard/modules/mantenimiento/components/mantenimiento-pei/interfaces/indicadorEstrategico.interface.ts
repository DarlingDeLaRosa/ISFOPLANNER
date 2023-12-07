import { InvolucradoI } from "./involucrado.interface";
import { RequerimientoI } from "./requerimientos.interface";
import { ResponsableI } from "./responsable.interface";
import { ResultadoEfectoI } from "./resultadoEfecto";

export interface IndicadoresEstrategicosI {
        id?: number,
        nombre: string,
        linaBase: number,
        meta: number,
        creadoPor?: number,
        idResultadoefecto:number
        resultadoefecto: ResultadoEfectoI,
        requerimientos: RequerimientoI[],
        cronograma: CronogramaI,
        responsables: ResponsableI[];
        involucrados: InvolucradoI[];
        }

    export interface CronogramaI{
      anio1: number,
      metaAnio1: number,
      anio2: number,
      metaAnio2: number,
      anio3: number,
      metaAnio3: number,
      anio4: number,
      metaAnio4: number
    }
