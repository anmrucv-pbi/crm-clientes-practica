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

const DOT_COLOR: Record<Etapa, string> = {
  prospecto: "bg-dot-blue",
  propuesta: "bg-dot-orange",
  activo: "bg-dot-green",
  cerrado: "bg-dot-red",
};

export default function KanbanColumn({ etapa, titulo, clientes, onCardClick, onDragStart, onDrop }: Props) {
  const totalMonto = clientes.reduce((acc, c) => acc + c.monto, 0);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(etapa, e)}
      className="flex-1 min-w-[240px] bg-wash rounded-column shadow-column p-3 flex flex-col"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${DOT_COLOR[etapa]}`} />
        <div>
          <h3 className="text-sm font-semibold text-ink">{titulo}</h3>
          <p className="text-xs text-muted">
            {clientes.length} {clientes.length === 1 ? "cliente" : "clientes"} · {formatoMoneda(totalMonto)}
          </p>
        </div>
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
          <p className="text-xs text-muted text-center mt-6">Sin clientes en esta etapa</p>
        )}
      </div>
    </div>
  );
}
