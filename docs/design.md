# DESIGN.md — CRM de clientes

Guía de estilo visual del proyecto. Reemplaza la versión anterior (que seguía reglas propias de Zentenio de diseño "flat"). Esta versión sigue al pie de la letra el estilo **"Relate"** descargado de Refero Styles (styles.refero.design), adaptado del contexto de landing page al de una app real.

> Fuente: Relate — Style Reference ("cool dawn over product canvas"). Se aplican sus tokens y componentes tal cual, priorizando fidelidad al estilo por sobre las restricciones previas (sombras, degradés, radios variables sí están permitidos acá).

## Tono

Superficie SaaS blanco-frío, tinta casi negra con matiz violeta para títulos, un solo azul saturado ("Royal Signal") que hace todo el trabajo de marca. Tarjetas redondeadas flotando sobre un lienzo claro, con puntos de color (dots) para indicar estado. Tipografía compacta (Inter), espaciado denso (8–12px).

## Colores

| Rol | Valor | Uso |
|---|---|---|
| Canvas | `#fcfcfc` | Fondo de página |
| Wash | `#f0f4fe` | Fondo de columnas del kanban (superficie con tinte azulado) |
| Card | `#ffffff` | Tarjetas de cliente, panel de resumen, modal |
| Ink | `#020520` | Títulos principales |
| Body | `#14141e` | Texto de cuerpo / labels de producto |
| Caption | `#374151` | Texto secundario |
| Muted | `#6b7280` | Texto de ayuda, metadatos, fechas |
| Divider | `#e2e8f0` | Bordes finos |
| Fog | `#f1f5f9` | Fondo de inputs, etiquetas |
| Accent (Royal Signal) | `#145aff` | Acento único de marca: botones primarios, links, foco, progreso |
| Focus (Azure) | `#0099ff` | Anillo de foco en inputs |
| Dot azul | `#3b82f6` | Estado "Prospecto" |
| Dot naranja | `#ffa64d` | Estado "Propuesta enviada" |
| Dot verde | `#16ca2e` | Estado "Activo" |
| Dot rojo (Coral) | `#f26052` | Estado "Cerrado" y badge de alerta (+14 días sin contacto) |

Un solo azul saturado como marca (Royal Signal); verde/naranja/rojo se usan únicamente como dots de estado del kanban y en tags/badges puntuales — nunca como segundo color de marca.

## Tipografía

- Familia: **Inter** (400, 500, 600), cargada vía Google Fonts (`<link>` en `layout.tsx`, no `next/font` porque el entorno de build no tiene salida a Google Fonts).
- Fallback: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Tracking negativo en títulos (-0.16 a -0.2em aprox en tamaños chicos) para el look compacto característico del estilo.
- Escala usada en la app: 12px (meta/caption), 14px (cuerpo/labels/botones), 16px (subtítulos), 22px (título de página, weight 600).

## Radios (sistema de dos niveles)

| Elemento | Radio |
|---|---|
| Tarjetas de cliente (deal card) | 8px |
| Columnas del kanban (pipeline card) | 16px |
| Inputs / selects | 12px |
| Botones / badges / tags | pill (9999px) |
| Modal | 24px |

Nunca esquinas a 0px.

## Sombras

- Tarjetas de cliente y columnas: `0px 0px 4px -2px rgba(0,0,0,0.1)`.
- Hover de tarjeta: `0px 0px 4px -2px rgba(20,90,255,0.3)` (glow azul sutil).
- Modal: `0px 0px 50px -28px rgba(20,90,255,0.1), 0px 0px 3px -1px rgba(0,0,0,0.18)`.

## Componentes

- **Botón primario**: pill, fondo `Accent`, texto blanco. Hover: azul un poco más oscuro.
- **Botón secundario (ghost-outline)**: pill, fondo `Card`, borde 1px `Accent`, texto `Accent`. Hover: fondo `Wash`.
- **Tarjeta de cliente**: `Card`, radio 8px, sombra de tarjeta, sin borde (la sombra hace la separación).
- **Columna del kanban**: fondo `Wash`, radio 16px, sombra de columna, dot de color + título + contador.
- **Status dot**: círculo de 10px, color según etapa (ver tabla de colores).
- **Badge de alerta** (+14 días): fondo rojo suave (`rgba(242,96,82,0.12)`), texto Coral, pill.
- **Barra de progreso**: track `Fog`, relleno `Accent`, pill, 6px de alto.
- **Inputs/selects**: borde 1px `Divider`, radio 12px, fondo `Card`; foco con anillo `Focus` (azure).
- **Modal**: `Card`, radio 24px, sombra de modal (glow azul + sombra suave), sin overlay pesado (fondo `rgba(2,5,32,0.45)`).

## Cómo actualizar este archivo

Si en el futuro se baja otro estilo de Refero Styles para reemplazar este, seguir el mismo criterio: aplicar sus tokens tal cual (colores, tipografía, radios, sombras, componentes) en vez de forzarlo a reglas de diseño anteriores.
