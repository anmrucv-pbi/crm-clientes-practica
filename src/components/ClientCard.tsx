"use client";

import { Cliente } from "@/lib/types";
import { diasSinContacto, formatoFecha, formatoMoneda } from "@/lib/utils";

interface Props {
  cliente: Cliente;
  onClick: () => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

export default function ClientCard({ cliente, onClick, onDragStart }: Props) {
  const dias = diasSinContacto(cliente.fechaUltimoContacto);
  const alertaContacto = dias > 14;

  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => onDragStart(e, cliente.id)}
      onClick={onClick}
      className="w-full text-left rounded-lg border border-neutral-300 bg-white p-3 mb-2 cursor-grab active:cursor-grabbing hover:border-neutral-400 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-neutral-900 text-sm">{cliente.nombre}</span>
        {alertaContacto && (
          <span
            title={`${dias} días sin contacto`}
            className="shrink-0 inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-0.5"
          >
            {dias}d sin contacto
          </span>
        )}
      </div>
      <p className="text-xs text-neutral-500 mt-1">{cliente.servicio}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-medium text-neutral-700">{formatoMoneda(cliente.monto)}</span>
        <span className="text-xs rounded-full bg-neutral-100 text-neutral-600 px-2 py-0.5">
          {cliente.etiqueta}
        </span>
      </div>

      {cliente.etapa === "activo" && (
        <div className="mt-2">
          <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-600"
              style={{ width: `${cliente.progreso}%` }}
            />
          </div>
          <span className="text-[11px] text-neutral-500">{cliente.progreso}% de avance</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-2 text-[11px] text-neutral-500">
        <span>{cliente.responsable}</span>
        <span>Próximo: {formatoFecha(cliente.fechaProximoContacto)}</span>
      </div>
    </button>
  );
}
