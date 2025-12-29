---
sidebar_position: 1
---

# Antes de empezar

## Estructura recomendada para equipos

Para mantener todo estandarizado y extensible, cada equipo debe seguir esta estructura:

```
devices/
	<equipo>/
		index.md            # Overview: descripción, beneficios, enlaces clave
		guides/
			getting-started.md
			tutorials.md
		resources/
			manuals.md        # Enlaces a manuales oficiales y PDFs
			downloads.md      # Inventarios, plantillas, hojas de clase
		challenges/
			index.md          # Retos por nivel (básico, intermedio, avanzado)
```

- Descargas (CSV, plantillas): colocar en `static/downloads/<equipo>/` o usar las hojas de inventario en `static/downloads/inventory/`.
- Imágenes: en `static/img/devices/<equipo>/`.
- Navegación: se genera automáticamente por carpetas.

## Buenas prácticas

- Escribe objetivos claros por guía y por reto.
- Incluye tiempos sugeridos y materiales necesarios.
- Añade rúbricas simples y listas de verificación.
- Enlaza a recursos oficiales (manuales, apps, firmware) cuando aplique.

---

> Esta guía ayuda a crear contenidos consistentes para clientes y docentes, manteniendo una estética minimalista e interactiva.