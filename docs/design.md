# DESIGN.md — CRM de clientes

Guía de estilo visual para este proyecto. Sirve como referencia para cualquier cambio de UI (propio o hecho con un agente de IA): antes de tocar estilos, revisar este documento.

## Tono del producto

Herramienta interna de trabajo diario para un consultor/a que gestiona una cartera de clientes. Debe transmitir orden y claridad, no "marketing". Prioridad: que se lea rápido quién necesita atención (kanban, alertas) antes que la decoración.

Principios:
- Plano (flat): nada de sombras, degradés ni iconos 3D.
- Bordes finos en vez de sombras para separar elementos.
- Esquinas redondeadas, consistentes en todo el proyecto.
- Sentence case en textos de UI (ni Title Case ni MAYÚSCULAS), salvo nombres propios.
- Máximo 3 colores base + 1 color de acento saturado. Un color semántico (alerta) se permite como excepción funcional, no decorativa.

## Colores

| Rol | Valor | Uso |
|---|---|---|
| `--color-bg` | `#f8fafc` (slate-50) | Fondo general de la página |
| `--color-surface` | `#ffffff` | Fondo de tarjetas, modal, inputs |
| `--color-border` | `#e2e8f0` (slate-200) | Bordes finos (1px) en tarjetas, inputs, columnas |
| `--color-text` | `#0f172a` (slate-900) | Texto principal |
| `--color-text-muted` | `#64748b` (slate-500) | Texto secundario (fechas, etiquetas, ayuda) |
| `--color-accent` | `#2563eb` (blue-600) | Acento: botones primarios, focos, links, progreso |
| `--color-accent-soft` | `#eff6ff` (blue-50) | Fondos suaves de acento (chips, hover) |
| `--color-accent-strong` | `#1d4ed8` (blue-700) | Hover/active del acento |
| `--color-alert` | `#dc2626` (red-600) | Únicamente para la alerta de "+14 días sin contacto" |
| `--color-alert-soft` | `#fef2f2` (red-50) | Fondo de la alerta |

No se agregan más colores. Los 4 estados del kanban se distinguen por texto/orden de columna, no por colores distintos por columna (evita "arcoíris").

## Tipografía

- Familia: system font stack (sin Google Fonts, para no depender de red externa): `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`.
- Escala: 12px (meta/ayuda) · 14px (texto base) · 16px (subtítulos/nombres de cliente) · 20px (títulos de sección) · 24px (título de página).
- Pesos: 400 texto normal, 500 énfasis medio (nombres, totales), 600 solo para títulos de sección.
- Sentence case siempre: "Nuevo cliente", no "Nuevo Cliente".

## Espaciado

Escala base de 4px: 4 · 8 · 12 · 16 · 24 · 32.
- Padding interno de tarjetas: 12–16px.
- Separación entre tarjetas de una columna: 8px.
- Separación entre columnas del kanban: 16px.
- Márgenes de secciones (resumen, filtros, tablero): 24px.

## Radios y bordes

- Radio estándar: 8px (tarjetas, inputs, botones, modal).
- Radio chico: 6px (badges/etiquetas).
- Bordes: 1px solid `--color-border` en vez de sombras. Ningún `box-shadow` decorativo.

## Componentes

- **Botón primario**: fondo `--color-accent`, texto blanco, radio 8px, sin sombra; hover `--color-accent-strong`.
- **Botón secundario**: fondo `--color-surface`, borde 1px `--color-border`, texto `--color-text`; hover fondo `--color-accent-soft`.
- **Tarjeta de cliente**: `--color-surface`, borde 1px `--color-border`, radio 8px, padding 16px, sin sombra. Al arrastrar (drag), borde `--color-accent`.
- **Badge de alerta** (+14 días): fondo `--color-alert-soft`, texto `--color-alert`, radio 6px, sin ícono 3D (usar un punto o texto simple).
- **Barra de progreso**: track `--color-accent-soft`, relleno `--color-accent`, altura 6px, radio completo (pill).
- **Columnas del kanban**: fondo `--color-bg` ligeramente distinto al de página, borde 1px `--color-border`, encabezado en sentence case + contador.
- **Inputs/selects**: borde 1px `--color-border`, radio 8px, foco con borde `--color-accent` (sin glow ni sombra azul).
- **Modal**: `--color-surface`, borde 1px `--color-border`, radio 8px, sin overlay oscuro pesado (usar `rgba(15,23,42,0.4)` como fondo del overlay).

## Qué no usar

- Sombras (`box-shadow`) decorativas.
- Degradés.
- Iconos o ilustraciones 3D/skeumórficos.
- Más de un color de acento saturado.
- Texto en mayúsculas o Title Case para labels de UI.
- Colores distintos "porque sí" por columna o por cliente (solo el color de alerta tiene significado).

## Cómo usar este archivo

1. Antes de pedir un cambio de UI a un agente de IA, pegar o referenciar este archivo.
2. Indicar qué aspecto priorizar (color, tipografía, espaciado, componente puntual).
3. Después del cambio, revisar que la UI generada cumpla estas reglas (no solo que "se vea bien").
