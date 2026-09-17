export type Etapa = "prospecto" | "propuesta" | "activo" | "cerrado";

export const ETAPAS: { id: Etapa; titulo: string }[] = [
  { id: "prospecto", titulo: "Prospecto" },
  { id: "propuesta", titulo: "Propuesta enviada" },
  { id: "activo", titulo: "Activo" },
  { id: "cerrado", titulo: "Cerrado" },
];

export interface Nota {
  id: string;
  fecha: string; // ISO date
  texto: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  servicio: string;
  monto: number;
  etiqueta: string;
  responsable: string;
  etapa: Etapa;
  fechaProximoContacto: string; // ISO date
  fechaUltimoContacto: string; // ISO date
  progreso: number; // 0-100, solo aplica en etapa "activo"
  notas: Nota[];
}

export interface DatosExportados {
  version: 1;
  exportadoEl: string;
  clientes: Cliente[];
}
