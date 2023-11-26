import { EjesI } from "./ejes.interface";

export interface EstrategiaI{
    id?: number,
    nombre: string,
    creadoPor?: number,
    idEjeEstrategico:number,
    ejeEstrategico: EjesI
}
