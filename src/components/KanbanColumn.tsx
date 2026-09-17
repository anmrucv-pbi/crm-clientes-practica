"use client";

import { Cliente, Etapa } from "@/lib/types";
import { formatoMoneda } from "@/lib/utils";
import ClientCard from "./ClientCard";

interface Props {
  etapa: Etapa;
  titulo: string;
  clientes: Cliente[];
  onCardClick: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDrop: (etapa: Etapa, e: React.DragEvent) => void;
}

export default function KanbanColumn({ etapa, titulo, clientes, onCardClick, onDragStart, onDrop }: Props) {
  const totalMonto = clientes.reduce((acc, c) => acc + c.monto, 0);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(etapa, e)}
      className="flex-1 min-w-[240px] bg-surface rounded-lg border border-border p-3 flex flex-col"
    >
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-text">{titulo}</h3>
        <p className="text-xs text-text-muted">
          {clientes.length} {clientes.length === 1 ? "cliente" : "clientes"} · {formatoMoneda(totalMonto)}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {clientes.map((c) => (
          <ClientCard
            key={c.id}
            cliente={c}
            onClick={() => onCardClick(c.id)}
            onDragStart={onDragStart}
          />
        ))}
        {clientes.length === 0 && (
          <p className="text-xs text-text-muted text-center mt-6">Sin clientes en esta etapa</p>
        )}
      </div>
    </div>
  );
}
