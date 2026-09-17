import { Cliente, DatosExportados } from "./types";

export function diasSinContacto(fechaUltimoContacto: string): number {
  const ultimo = new Date(fechaUltimoContacto).getTime();
  const hoy = new Date().getTime();
  const diffMs = hoy - ultimo;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function formatoMoneda(monto: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto);
}

export function formatoFecha(fechaIso: string): string {
  const [anio, mes, dia] = fechaIso.split("-");
  return `${dia}/${mes}/${anio}`;
}

export function exportarClientes(clientes: Cliente[]) {
  const datos: DatosExportados = {
    version: 1,
    exportadoEl: new Date().toISOString(),
    clientes,
  };
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const hoy = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `crm-clientes-${hoy}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parsearImportacion(texto: string): Cliente[] {
  const data = JSON.parse(texto);
  if (Array.isArray(data)) return data as Cliente[];
  if (data && Array.isArray(data.clientes)) return data.clientes as Cliente[];
  throw new Error("El archivo no tiene el formato esperado.");
}

export function nuevoId(prefijo: string): string {
  return `${prefijo}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
