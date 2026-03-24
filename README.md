# Maler-Femaler

Aplicación web que enriquece un archivo CSV añadiendo una columna de género basada en el nombre de pila de cada fila.

## ¿Cómo funciona?

1. Sube un archivo CSV que contenga una columna con nombres de pila.
2. La aplicación normaliza cada nombre y lo busca en tres listas predefinidas (`male.txt`, `female.txt`, `ignore.txt`).
3. Se genera y descarga automáticamente un nuevo CSV con la columna de género añadida.

## Opciones de configuración

Todos los ajustes se persisten en el `localStorage` del navegador.

| Campo | Descripción | Valor por defecto |
|---|---|---|
| **Columna nombres** | Nombre de la columna del CSV que contiene los nombres | `first_name` |
| **Nueva columna** | Nombre de la columna de género que se añadirá al CSV | `gender` |
| **Clave masculina** | Valor que se escribirá para el género masculino | `M` |
| **Clave femenina** | Valor que se escribirá para el género femenino | `F` |

## Listas de nombres

Las listas de nombres se encuentran en `public/names/` y están disponibles para descarga desde la propia aplicación:

- `male.txt` — nombres masculinos (un nombre por línea).
- `female.txt` — nombres femeninos (un nombre por línea).
- `ignore.txt` — nombres ambiguos o a ignorar (un nombre por línea).

## Instalación y uso local

**Requisitos:** Node.js ≥ 18

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar el build de producción
npm run preview
```

## Stack tecnológico

- [Vue 3](https://vuejs.org/) — framework de interfaz de usuario.
- [Vite](https://vitejs.dev/) — bundler y servidor de desarrollo.
- [Quasar](https://quasar.dev/) — componentes UI.
- [VueUse](https://vueuse.org/) — utilidades de composición (persistencia en `localStorage`).
- [Sass](https://sass-lang.com/) — preprocesador CSS.
