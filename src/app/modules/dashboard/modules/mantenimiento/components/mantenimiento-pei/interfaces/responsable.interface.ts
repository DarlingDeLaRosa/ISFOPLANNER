export interface ResponsableI {
    idIndicadorEstrategico?:number,
    idUnidadOrganizativa?: number
    id: number,
    nombre: string,
    presupuestoEstimado?: number,
    creadoPor? : number
}

export interface ResponsableDeleteI {
  idIndicadorEstrategico:number,
  idUnidadOrganizativa: number
}


