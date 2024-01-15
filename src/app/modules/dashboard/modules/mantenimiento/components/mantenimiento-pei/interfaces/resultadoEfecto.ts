import { EjesI } from "./ejes.interface";
import { EstrategiaI } from "./estrategias.interface";

export interface ResultadoEfectoI {
  id?: number,
  nombre: string,
  creadoPor?: number,
  idEstrategia?: number,
  estrategia: EstrategiaI,
  ejeEstrategico?: EjesI,
}
