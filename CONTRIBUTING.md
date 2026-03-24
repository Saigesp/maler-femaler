# Contribuir a Maler-Females

¡Gracias por tu interés en contribuir! A continuación encontrarás las pautas básicas para hacerlo.

## Requisitos previos

- Node.js ≥ 18
- npm ≥ 9

## Configuración del entorno de desarrollo

```bash
# 1. Haz un fork del repositorio y clónalo
git clone git@github.com:Saigesp/maler-femaler.git
cd maler-femaler

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

## Flujo de trabajo

1. Crea una rama a partir de `master` con un nombre descriptivo:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   # o
   git checkout -b fix/descripcion-del-bug
   ```
2. Realiza tus cambios siguiendo las convenciones del proyecto (ver más abajo).
3. Comprueba que el linter no reporta errores:
   ```bash
   npm run lint
   ```
4. Haz commit de tus cambios con un mensaje claro y en inglés:
   ```bash
   git commit -m "feat: add support for semicolon-separated CSVs"
   ```
5. Sube tu rama y abre una Pull Request contra `master`.

## Convenciones de código

- El código fuente está escrito en **Vue 3 + JavaScript** (sin TypeScript).
- Sigue el estilo definido en `eslint.config.js`. Puedes aplicar correcciones automáticas con `npm run lint-fix`.
- Los estilos se escriben en **SCSS** y se ubican en `src/styles/`.
- Usa nombres de variables y funciones en **inglés**.

## Añadir o corregir nombres

Las listas de nombres se encuentran en `public/names/`:

- `male.txt` — nombres masculinos.
- `female.txt` — nombres femeninos.
- `ignore.txt` — nombres ambiguos o que deben ignorarse.

Cada archivo contiene **un nombre por línea, en minúsculas y con acentos**. Si detectas un nombre mal clasificado o que falta, puedes editar directamente el archivo correspondiente y abrir una Pull Request.

## Reportar un bug

Abre un [issue](https://github.com/Saigesp/genders/issues) incluyendo:

- Descripción del problema.
- Pasos para reproducirlo.
- Comportamiento esperado vs. comportamiento actual.
- Capturas de pantalla o el CSV de ejemplo si es relevante.

## Proponer una mejora

Abre un [issue](https://github.com/Saigesp/genders/issues) describiendo la funcionalidad que propones y el problema que resuelve antes de ponerte a implementarla.
