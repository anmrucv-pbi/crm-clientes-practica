# Documentación funcional — CRM de clientes (práctica)

## 1. Contexto y objetivo

App de práctica para adaptar el flujo de trabajo de Zentenio (consultora de
datos e inteligencia artificial: integración de datos, dashboards, calidad y
seguridad de datos, productos digitales y soluciones de IA) a un caso real:
un CRM para hacer seguimiento comercial de clientes, desde el primer contacto
hasta el cierre, sin depender de planillas sueltas. Uso individual (una sola
persona), sin backend ni base de datos: los datos viven en memoria durante la
sesión y se persisten manualmente exportando/importando un archivo JSON.

Zentenio atiende clientes de varios rubros (farmacéutica, energía, logística,
distribución, finanzas) con cinco líneas de servicio. El CRM usa esos mismos
rubros y servicios como valores de referencia (ver Feature 2), aunque los
diez clientes de ejemplo son ficticios, no clientes reales de la empresa.

## 2. Usuario

Persona de Zentenio (por ejemplo, del equipo comercial o de delivery) que
gestiona su propia cartera de clientes y proyectos, sin equipo detrás dentro
de esta app. Un solo rol, sin permisos diferenciados.

## 3. Épica única: Gestión comercial de clientes

### Feature 1 — Tablero kanban de etapas
Descripción: cuatro columnas (Prospecto, Propuesta enviada, Activo, Cerrado).
Las tarjetas de cliente se arrastran entre columnas para reflejar el avance.
Cada columna muestra un punto de color distinto para identificar la etapa
de un vistazo.
Criterios de aceptación:
- Existen exactamente 4 columnas, en ese orden.
- Una tarjeta se puede arrastrar y soltar en cualquier columna.
- Al soltarla, la etapa del cliente se actualiza y persiste en memoria.

### Feature 2 — Ficha de cliente
Descripción: cada tarjeta guarda nombre, servicio, monto del proyecto, rubro,
responsable y fecha de próximo contacto. El servicio y el rubro se eligen de
listas fijas basadas en la oferta real de Zentenio:
- Servicios: integración y automatización de datos, calidad y seguridad de
  datos, dashboards e información en tiempo real, desarrollo de productos
  digitales, soluciones de inteligencia artificial.
- Rubros: farmacéutica, energía, logística, distribución, finanzas.
Criterios de aceptación:
- Se puede crear un cliente nuevo con todos esos campos.
- Se puede editar un cliente existente desde su tarjeta.
- Los campos obligatorios (nombre, monto) no pueden quedar vacíos al guardar.
- Servicio y rubro se seleccionan de la lista fija, no se escriben a mano.

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
Descripción: buscador por nombre de cliente y filtro por rubro.
Criterios de aceptación:
- El buscador filtra en tiempo real (sin botón de confirmar).
- El filtro por rubro se puede combinar con el buscador.
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

Diez clientes ficticios repartidos en las cuatro etapas, con nombres de
fantasía inspirados en los rubros reales de Zentenio (farmacéutica, energía,
logística, distribución, finanzas) — no son clientes reales de la empresa,
ni los montos/estados reflejan información real de facturación. Se cargan al
iniciar la app. El botón "Empezar de cero" limpia todo, sin volver a cargar
estos ejemplos.

## 6. Diseño

Se sigue el archivo `docs/design.md` (estilo "Relate", tomado de Refero
Styles): tipografía Inter, paleta con un solo acento azul, radios en dos
niveles (8px en tarjetas, 16px en columnas, botones en pill), sombras suaves
en vez de bordes marcados y puntos de color por etapa en el kanban.
