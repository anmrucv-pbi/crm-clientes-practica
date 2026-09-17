"use client";

import { Cliente, ETAPAS } from "@/lib/types";
import { formatoMoneda } from "@/lib/utils";

interface Props {
  clientes: Cliente[];
}

export default function SummaryPanel({ clientes }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      {ETAPAS.map((etapa) => {
        const enEtapa = clientes.filter((c) => c.etapa === etapa.id);
        const total = enEtapa.reduce((acc, c) => acc + c.monto, 0);
        return (
          <div key={etapa.id} className="rounded-card bg-card shadow-card p-3">
            <p className="text-xs text-muted">{etapa.titulo}</p>
            <p className="text-lg font-semibold text-ink">{enEtapa.length}</p>
            <p className="text-xs text-caption">{formatoMoneda(total)}</p>
          </div>
        );
      })}
    </div>
  );
}
