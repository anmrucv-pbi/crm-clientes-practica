"use client";

interface Props {
  busqueda: string;
  onBusquedaChange: (v: string) => void;
  etiquetaSeleccionada: string;
  etiquetas: string[];
  onEtiquetaChange: (v: string) => void;
  onNuevoCliente: () => void;
  onExportar: () => void;
  onImportarClick: () => void;
  onEmpezarDeCero: () => void;
}

export default function SearchFilterBar({
  busqueda,
  onBusquedaChange,
  etiquetaSeleccionada,
  etiquetas,
  onEtiquetaChange,
  onNuevoCliente,
  onExportar,
  onImportarClick,
  onEmpezarDeCero,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        className="rounded-lg border border-border px-3 py-1.5 text-sm flex-1 min-w-[180px] bg-surface focus:outline-none focus:border-accent"
      />
      <select
        value={etiquetaSeleccionada}
        onChange={(e) => onEtiquetaChange(e.target.value)}
        className="rounded-lg border border-border px-2 py-1.5 text-sm bg-surface focus:outline-none focus:border-accent"
      >
        <option value="">Todas las etiquetas</option>
        {etiquetas.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <button
        onClick={onNuevoCliente}
        className="rounded-lg bg-accent text-white text-sm px-3 py-1.5 hover:bg-accent-strong transition-colors"
      >
        Nuevo cliente
      </button>
      <button
        onClick={onExportar}
        className="rounded-lg border border-border text-sm px-3 py-1.5 bg-surface hover:bg-accent-soft transition-colors"
      >
        Exportar JSON
      </button>
      <button
        onClick={onImportarClick}
        className="rounded-lg border border-border text-sm px-3 py-1.5 bg-surface hover:bg-accent-soft transition-colors"
      >
        Importar JSON
      </button>
      <button
        onClick={onEmpezarDeCero}
        className="rounded-lg border border-border text-sm px-3 py-1.5 bg-surface text-alert hover:bg-alert-soft transition-colors"
      >
        Empezar de cero
      </button>
    </div>
  );
}
