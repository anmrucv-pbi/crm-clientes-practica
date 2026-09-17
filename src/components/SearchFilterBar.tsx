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
        className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm flex-1 min-w-[180px]"
      />
      <select
        value={etiquetaSeleccionada}
        onChange={(e) => onEtiquetaChange(e.target.value)}
        className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
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
        className="rounded-md bg-sky-600 text-white text-sm px-3 py-1.5 hover:bg-sky-700"
      >
        Nuevo cliente
      </button>
      <button
        onClick={onExportar}
        className="rounded-md border border-neutral-300 text-sm px-3 py-1.5 hover:bg-neutral-50"
      >
        Exportar JSON
      </button>
      <button
        onClick={onImportarClick}
        className="rounded-md border border-neutral-300 text-sm px-3 py-1.5 hover:bg-neutral-50"
      >
        Importar JSON
      </button>
      <button
        onClick={onEmpezarDeCero}
        className="rounded-md border border-neutral-300 text-sm px-3 py-1.5 text-red-600 hover:bg-red-50"
      >
        Empezar de cero
      </button>
    </div>
  );
}
