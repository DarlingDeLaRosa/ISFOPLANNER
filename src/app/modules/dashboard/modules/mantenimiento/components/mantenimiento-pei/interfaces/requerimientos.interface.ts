import { IndicadoresEstrategicosI } from "./indicadorEstrategico.interface";

export interface RequerimientoI {
    id: number,
    nombre: string,
    esFinanciero: boolean,
    creadoPor?: number,
    indicadorEstrategico?: IndicadoresEstrategicosI,
    idIndicadorEstrategico: number
}
