"use client";

import { useState } from "react";
import { Cliente, Etapa, ETAPAS, RUBROS, SERVICIOS } from "@/lib/types";
import { formatoFecha, nuevoId } from "@/lib/utils";

interface Props {
  cliente: Cliente | null; // null = creando uno nuevo
  onClose: () => void;
  onGuardar: (cliente: Cliente) => void;
  onEliminar: (id: string) => void;
}

const vacio = (): Cliente => ({
  id: nuevoId("c"),
  nombre: "",
  servicio: "",
  monto: 0,
  etiqueta: "",
  responsable: "",
  etapa: "prospecto",
  fechaProximoContacto: new Date().toISOString().slice(0, 10),
  fechaUltimoContacto: new Date().toISOString().slice(0, 10),
  progreso: 0,
  notas: [],
});

export default function ClientModal({ cliente, onClose, onGuardar, onEliminar }: Props) {
  const [form, setForm] = useState<Cliente>(cliente ?? vacio());
  const [notaNueva, setNotaNueva] = useState("");
  const esNuevo = cliente === null;

  function actualizar<K extends keyof Cliente>(campo: K, valor: Cliente[K]) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function agregarNota() {
    if (!notaNueva.trim()) return;
    const nota = {
      id: nuevoId("n"),
      fecha: new Date().toISOString().slice(0, 10),
      texto: notaNueva.trim(),
    };
    setForm((prev) => ({ ...prev, notas: [...prev.notas, nota], fechaUltimoContacto: nota.fecha }));
    setNotaNueva("");
  }

  function guardar() {
    if (!form.nombre.trim() || !form.monto) return;
    onGuardar(form);
  }

  const campoInput =
    "w-full rounded-input border border-divider bg-card px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-focus";
  const campoLabel = "text-xs text-muted";

  return (
    <div className="fixed inset-0 bg-[rgba(2,5,32,0.45)] flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-modal shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-ink">
            {esNuevo ? "Nuevo cliente" : "Editar cliente"}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-body text-sm">
            Cerrar
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className={campoLabel}>Nombre</label>
            <input
              value={form.nombre}
              onChange={(e) => actualizar("nombre", e.target.value)}
              className={campoInput}
            />
          </div>
          <div>
            <label className={campoLabel}>Servicio</label>
            <select
              value={form.servicio}
              onChange={(e) => actualizar("servicio", e.target.value)}
              className={campoInput}
            >
              <option value="">Seleccionar...</option>
              {SERVICIOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={campoLabel}>Monto del proyecto</label>
              <input
                type="number"
                value={form.monto}
                onChange={(e) => actualizar("monto", Number(e.target.value))}
                className={campoInput}
              />
            </div>
            <div>
              <label className={campoLabel}>Rubro</label>
              <select
                value={form.etiqueta}
                onChange={(e) => actualizar("etiqueta", e.target.value)}
                className={campoInput}
              >
                <option value="">Seleccionar...</option>
                {RUBROS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={campoLabel}>Responsable</label>
              <input
                value={form.responsable}
                onChange={(e) => actualizar("responsable", e.target.value)}
                className={campoInput}
              />
            </div>
            <div>
              <label className={campoLabel}>Etapa</label>
              <select
                value={form.etapa}
                onChange={(e) => actualizar("etapa", e.target.value as Etapa)}
                className={campoInput}
              >
                {ETAPAS.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={campoLabel}>Próximo contacto</label>
              <input
                type="date"
                value={form.fechaProximoContacto}
                onChange={(e) => actualizar("fechaProximoContacto", e.target.value)}
                className={campoInput}
              />
            </div>
            {form.etapa === "activo" && (
              <div>
                <label className={campoLabel}>Avance (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.progreso}
                  onChange={(e) => actualizar("progreso", Number(e.target.value))}
                  className={campoInput}
                />
              </div>
            )}
          </div>

          <div>
            <label className={campoLabel}>Bitácora</label>
            <div className="space-y-1 max-h-28 overflow-y-auto rounded-input border border-divider p-2 mb-2 bg-fog">
              {form.notas.length === 0 && (
                <p className="text-xs text-muted">Todavía no hay notas.</p>
              )}
              {form.notas.map((n) => (
                <p key={n.id} className="text-xs text-body">
                  <span className="text-muted">{formatoFecha(n.fecha)} — </span>
                  {n.texto}
                </p>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={notaNueva}
                onChange={(e) => setNotaNueva(e.target.value)}
                placeholder="Agregar nota rápida..."
                className={`flex-1 ${campoInput}`}
              />
              <button
                onClick={agregarNota}
                className="rounded-pill border border-accent text-accent bg-card text-sm px-4 hover:bg-wash transition-colors"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          {!esNuevo ? (
            <button
              onClick={() => onEliminar(form.id)}
              className="text-sm text-dot-red hover:underline"
            >
              Eliminar cliente
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-pill border border-divider text-body bg-card text-sm px-4 py-1.5 hover:bg-fog transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={guardar}
              className="rounded-pill bg-accent text-white text-sm font-medium px-4 py-1.5 hover:bg-accent-hover transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
