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
      className="w-full text-left rounded-card bg-card px-4 py-3 mb-2 shadow-card hover:shadow-card-hover cursor-grab active:cursor-grabbing transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-body text-sm">{cliente.nombre}</span>
        {alertaContacto && (
          <span
            title={`${dias} días sin contacto`}
            className="shrink-0 inline-flex items-center rounded-pill bg-dot-red-soft text-dot-red text-xs px-2 py-0.5"
          >
            {dias}d sin contacto
          </span>
        )}
      </div>
      <p className="text-xs text-muted mt-1">{cliente.servicio}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-medium text-body">{formatoMoneda(cliente.monto)}</span>
        <span className="text-xs rounded-pill bg-fog text-caption px-2 py-0.5">
          {cliente.etiqueta}
        </span>
      </div>

      {cliente.etapa === "activo" && (
        <div className="mt-2">
          <div className="h-1.5 w-full rounded-pill bg-fog overflow-hidden">
            <div
              className="h-full rounded-pill bg-accent"
              style={{ width: `${cliente.progreso}%` }}
            />
          </div>
          <span className="text-[11px] text-muted">{cliente.progreso}% de avance</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-2 text-[11px] text-muted">
        <span>{cliente.responsable}</span>
        <span>Próximo: {formatoFecha(cliente.fechaProximoContacto)}</span>
      </div>
    </button>
  );
}
