export interface ResponsableI {
  nombre: string,
  idIndicadorEstrategico?: number,
  idUnidadOrganizativa?: number
  id: number,
  presupuestoEstimado?: number,
  creadoPor?: number
}

export interface ResponsableDeleteI {
  idIndicadorEstrategico: number,
  idUnidadOrganizativa: number
}


