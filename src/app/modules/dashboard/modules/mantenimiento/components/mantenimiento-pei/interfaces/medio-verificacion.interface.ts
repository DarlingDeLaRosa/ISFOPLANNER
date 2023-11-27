import { IndicadoresEstrategicosI } from "./indicadorEstrategico.interface";

export interface MedioVerificacionI{

    id?: number,
    nombre: string,
    creadoPor: number,
    idIndicadorEstrategico: number,
    indicadorEstrategico?: IndicadoresEstrategicosI, 
}