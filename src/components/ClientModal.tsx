"use client";

import { useState } from "react";
import { Cliente, Etapa, ETAPAS } from "@/lib/types";
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

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl border border-neutral-200 w-full max-w-lg max-h-[90vh] overflow-y-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-neutral-900">
            {esNuevo ? "Nuevo cliente" : "Editar cliente"}
          </h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 text-sm">
            Cerrar
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-neutral-600">Nombre</label>
            <input
              value={form.nombre}
              onChange={(e) => actualizar("nombre", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-600">Servicio</label>
            <input
              value={form.servicio}
              onChange={(e) => actualizar("servicio", e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-neutral-600">Monto del proyecto</label>
              <input
                type="number"
                value={form.monto}
                onChange={(e) => actualizar("monto", Number(e.target.value))}
                className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-600">Etiqueta</label>
              <input
                value={form.etiqueta}
                onChange={(e) => actualizar("etiqueta", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-neutral-600">Responsable</label>
              <input
                value={form.responsable}
                onChange={(e) => actualizar("responsable", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-600">Etapa</label>
              <select
                value={form.etapa}
                onChange={(e) => actualizar("etapa", e.target.value as Etapa)}
                className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
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
              <label className="text-xs text-neutral-600">Próximo contacto</label>
              <input
                type="date"
                value={form.fechaProximoContacto}
                onChange={(e) => actualizar("fechaProximoContacto", e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
            </div>
            {form.etapa === "activo" && (
              <div>
                <label className="text-xs text-neutral-600">Avance (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.progreso}
                  onChange={(e) => actualizar("progreso", Number(e.target.value))}
                  className="w-full rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-neutral-600">Bitácora</label>
            <div className="space-y-1 max-h-28 overflow-y-auto border border-neutral-200 rounded-md p-2 mb-2">
              {form.notas.length === 0 && (
                <p className="text-xs text-neutral-400">Todavía no hay notas.</p>
              )}
              {form.notas.map((n) => (
                <p key={n.id} className="text-xs text-neutral-700">
                  <span className="text-neutral-400">{formatoFecha(n.fecha)} — </span>
                  {n.texto}
                </p>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={notaNueva}
                onChange={(e) => setNotaNueva(e.target.value)}
                placeholder="Agregar nota rápida..."
                className="flex-1 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
              <button
                onClick={agregarNota}
                className="rounded-md border border-neutral-300 text-sm px-3 hover:bg-neutral-50"
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
              className="text-sm text-red-600 hover:underline"
            >
              Eliminar cliente
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-md border border-neutral-300 text-sm px-3 py-1.5">
              Cancelar
            </button>
            <button
              onClick={guardar}
              className="rounded-md bg-sky-600 text-white text-sm px-3 py-1.5 hover:bg-sky-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
