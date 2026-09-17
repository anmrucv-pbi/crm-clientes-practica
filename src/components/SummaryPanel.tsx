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
          <div key={etapa.id} className="rounded-lg border border-neutral-200 bg-white p-3">
            <p className="text-xs text-neutral-500">{etapa.titulo}</p>
            <p className="text-lg font-semibold text-neutral-900">{enEtapa.length}</p>
            <p className="text-xs text-neutral-500">{formatoMoneda(total)}</p>
          </div>
        );
      })}
    </div>
  );
}
