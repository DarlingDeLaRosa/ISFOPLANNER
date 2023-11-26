import { IndicadoresEstrategicosI } from "./indicadorEstrategico.interface";

export interface SupuestosRiesgosI {
    id?: number,
    nombre: string,
    creadoPor?: number,
    indicadorEstrategico?: IndicadoresEstrategicosI,
    idIndicadorEstrategico: number
}
