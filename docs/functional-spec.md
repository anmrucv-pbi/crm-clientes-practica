# Documentación funcional — CRM de clientes (práctica)

## 1. Contexto y objetivo

App para que una consultora de marketing independiente gestione sus clientes
en distintas etapas comerciales, desde el primer contacto hasta el cierre,
sin depender de planillas sueltas. Uso individual (una sola persona), sin
backend ni base de datos: los datos viven en memoria durante la sesión y se
persisten manualmente exportando/importando un archivo JSON.

## 2. Usuario

Consultora/o de marketing independiente que gestiona sus propios clientes y
proyectos, sin equipo detrás. Un solo rol, sin permisos diferenciados.

## 3. Épica única: Gestión comercial de clientes

### Feature 1 — Tablero kanban de etapas
Descripción: cuatro columnas (Prospecto, Propuesta enviada, Activo, Cerrado).
Las tarjetas de cliente se arrastran entre columnas para reflejar el avance.
Criterios de aceptación:
- Existen exactamente 4 columnas, en ese orden.
- Una tarjeta se puede arrastrar y soltar en cualquier columna.
- Al soltarla, la etapa del cliente se actualiza y persiste en memoria.

### Feature 2 — Ficha de cliente
Descripción: cada tarjeta guarda nombre, servicio, monto del proyecto,
etiqueta de categoría, responsable y fecha de próximo contacto.
Criterios de aceptación:
- Se puede crear un cliente nuevo con todos esos campos.
- Se puede editar un cliente existente desde su tarjeta.
- Los campos obligatorios (nombre, monto) no pueden quedar vacíos al guardar.

### Feature 3 — Alerta de contacto vencido
Descripción: si pasaron más de 14 días desde el último contacto registrado,
la tarjeta muestra una alerta visual.
Criterios de aceptación:
- La alerta se calcula sobre la fecha de último contacto, no la de próximo contacto.
- Se recalcula en cada render (no depende de una acción manual).

### Feature 4 — Barra de avance por proyecto activo
Descripción: cada cliente en etapa "Activo" tiene un porcentaje de avance
editable, mostrado como barra en la tarjeta.
Criterios de aceptación:
- Solo se muestra/edita en clientes de la columna Activo.
- El valor va de 0 a 100.

### Feature 5 — Buscador y filtro
Descripción: buscador por nombre de cliente y filtro por etiqueta de categoría.
Criterios de aceptación:
- El buscador filtra en tiempo real (sin botón de confirmar).
- El filtro por etiqueta se puede combinar con el buscador.
- Ambos aplican sobre las 4 columnas a la vez.

### Feature 6 — Panel de resumen
Descripción: panel superior con cantidad de clientes y monto total por cada etapa.
Criterios de aceptación:
- Se recalcula automáticamente al mover, crear, editar o borrar un cliente.

### Feature 7 — Bitácora de notas
Descripción: cada cliente tiene un registro de notas cortas con fecha, tipo bitácora.
Criterios de aceptación:
- Cada nota nueva se agrega con la fecha del día, sin que el usuario la escriba a mano.
- Las notas se muestran en orden cronológico dentro de la ficha del cliente.

### Feature 8 — Exportar / Importar JSON
Descripción: exportar todos los clientes a un archivo JSON descargable, e
importar ese archivo para recuperar el estado. Botón "Empezar de cero" para
vaciar todo.
Criterios de aceptación:
- No se usa localStorage ni ninguna persistencia del navegador.
- Al exportar se descarga un archivo .json con la fecha en el nombre.
- Al importar, se reemplaza el estado actual por el del archivo.
- "Empezar de cero" pide confirmación antes de vaciar todo.
- Se muestra un aviso chico al pie indicando que los datos no se guardan solos.

## 4. Priorización (MoSCoW)

- Must have: Features 1, 2, 6, 8 (sin esto la app no cumple su propósito base).
- Should have: Features 3, 5 (mejoran mucho el uso diario, no bloquean el MVP).
- Could have: Features 4, 7 (suman valor pero la app funciona sin ellas).
- Won't have (por ahora): multiusuario, backend, notificaciones push, historial de cambios de etapa.

## 5. Datos de ejemplo

Diez clientes ficticios repartidos en las cuatro etapas, con montos y fechas
creíbles, cargados al iniciar la app. El botón "Empezar de cero" limpia todo,
sin volver a cargar estos ejemplos.

## 6. Diseño

Diseño plano: sin sombras difusas, sin degradados, sin íconos 3D. Tarjetas con
borde fino y esquinas redondeadas. Tipografía sans, sentence case. Paleta de
tres colores como máximo, con un solo color saturado como acento.
