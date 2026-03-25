<template>
  <main class="app">
    <h1>Maler-<br>femaler</h1>
    <p class="app__hint">
      Añade una columna a un archivo CSV con el género de los nombres aportados.
    </p>
    <div class="app__split">
      <InputText
        v-model="nameColumn"
        label="Columna nombres"
        placeholder="first_name por defecto"
      />
      <InputText
        v-model="genderColumn"
        label="Nueva columna"
        placeholder="gender por defecto"
      />
      <InputText
        v-model="maleKey"
        label="Clave masculina"
        placeholder="M por defecto"
      />
      <InputText
        v-model="femaleKey"
        label="Clave femenina"
        placeholder="F por defecto"
      />
    </div>
    <InputFile
      v-model="file"
      label="Selecciona un archivo CSV"
      accept=".csv"
      mode="blob"
    />
    <div class="app__namelists">
      <span>Listas de nombres:</span>
      <a :href="`${base}names/male.txt`" download>male.txt</a>
      <a :href="`${base}names/female.txt`" download>female.txt</a>
      <a :href="`${base}names/ignore.txt`" download>ignore.txt</a>
    </div>
    <div v-if="stats" class="app__stats">
      <h2>Resultados</h2>
      <div class="app__stats-grid">
        <div class="app__stat-card">
          <span class="app__stat-label">Total filas</span>
          <strong class="app__stat-value">{{stats.total}}</strong>
        </div>
        <div class="app__stat-card app__stat-card--positive">
          <span class="app__stat-label">Con género</span>
          <strong class="app__stat-value">{{stats.found}}</strong>
        </div>
        <div class="app__stat-card app__stat-card--negative">
          <span class="app__stat-label">Sin género</span>
          <strong class="app__stat-value">{{stats.notFound}}</strong>
        </div>
      </div>
      <div v-if="notFoundNames.length" class="app__notfound">
        <h3>Nombres no encontrados: {{notFoundNames.length}}</h3>
        <ul>
          <li v-for="name in notFoundNames" :key="name">
            {{name}}
          </li>
        </ul>
      </div>
      <button class="app__btn" @click="restart">
        ↺ Reiniciar
      </button>
    </div>
    <div v-else class="app__instructions">
      <h3>Instrucciones</h3>
      <ol>
        <li>
          Configura los recuadros superiores:
          <ul>
            <li>
              <strong>Columna nombres:</strong>
              En qué columna de tu archivo CSV se encuentran los nombres de
              los que hay que determinar el género.
            </li>
            <li>
              <strong>Nueva columna:</strong>
              Cómo quieres que se llame la nueva columna.
            </li>
            <li>
              <strong>Clave masculina:</strong>
              Qué texto pone en la nueva columna a los hombres.
            </li>
            <li>
              <strong>Clave femenina:</strong>
              Qué texto pone en la nueva columna a las mujeres.
            </li>
          </ul>
        </li>
        <li>
          Selecciona en el recuadro grande tu archivo CSV, espera unos instantes
          y se descargará automáticamente un nuevo archivo con la columna de género añadida.
        </li>
      </ol>
    </div>
    <div class="app__contact">
      <p>With ♥️ by <a href="https://github.com/Saigesp">Saigesp</a></p>
      <a
        href="https://github.com/Saigesp/maler-femaler"
        class="app__github-link"
        aria-label="Contribuye en GitHub">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          aria-hidden="true">
          <!-- eslint-disable-next-line max-len -->
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import InputText from '@/components/inputs/text/InputText.vue';
import InputFile from '@/components/inputs/file/InputFile.vue';

const file = ref(null);
const stats = ref(null);
const notFoundNames = ref([]);
const maleKey = useStorage('male-key', 'M');
const femaleKey = useStorage('female-key', 'F');
const nameColumn = useStorage('name-column', 'first_name');
const genderColumn = useStorage('gender-column', 'gender');
const base = import.meta.env.BASE_URL;

async function fetchNameList(filename) {
  const response = await fetch(`${base}names/${filename}`);
  const text = await response.text();
  return text.split('\n').map(l => l.trim()).filter(Boolean);
}

async function loadNames() {
  const [male, female, ignore] = await Promise.all([
    fetchNameList('male.txt'),
    fetchNameList('female.txt'),
    fetchNameList('ignore.txt'),
  ]);
  return { male, female, ignore };
}

function parseCsv(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    // Handle quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === ',' && !inQuotes) { values.push(current); current = ''; }
      else { current += ch; }
    }
    values.push(current);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] || '').trim()]));
  });
  return { headers, rows };
}

function normalizeName(raw) {
  let name = raw.toLowerCase()
    .replace(/-/g, ' ')
    .replace(/,/g, '')
    .trim();
  // Remove leading initials like "j. ", "m. ", "f. "
  name = name.replace(/^[jmf]\.? /, '');
  // Take first word only
  name = name.split(' ')[0];
  // Remove trailing dot
  if (name.endsWith('.')) name = name.slice(0, -1);
  return name;
}

function assignGenre(name, names) {
  if (!name || name.length <= 1) return '';
  if (name.includes('@')) return '';
  if (names.ignore.includes(name)) return '';
  if (/\d/.test(name)) return '';
  if (names.female.includes(name)) return femaleKey.value || 'F';
  if (names.male.includes(name)) return maleKey.value || 'M';
  return null; // not found
}

function toCsvLine(values) {
  return values.map(v => {
    const val = v || '';
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }).join(',');
}

function downloadCsv(headers, rows) {
  const universalBOM = '\uFEFF';
  const lines = [
    toCsvLine([...headers, genderColumn.value || 'gender']),
    ...rows.map(r => toCsvLine([...headers.map(h => r[h]), r.genre])),
  ];
  const blob = new Blob([universalBOM + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function restart() {
  window.location.reload();
}

watch(file, async (newFile) => {
  if (!newFile) {
    stats.value = null;
    notFoundNames.value = [];
    return;
  }

  const [text, names] = await Promise.all([
    newFile.text(),
    loadNames(),
  ]);

  const { headers, rows } = parseCsv(text);
  const notFound = [];

  const enrichedRows = rows.map(row => {
    const rawName = row[nameColumn.value || 'first_name'] || '';
    const normalized = normalizeName(rawName);
    const genre = assignGenre(normalized, names);
    if (genre === null) {
      if (normalized && !notFound.includes(normalized)) notFound.push(normalized);
      return { ...row, genre: '' };
    }
    return { ...row, genre };
  });

  const withGenre = enrichedRows.filter(r => r.genre !== '');

  stats.value = {
    total: rows.length,
    found: withGenre.length,
    notFound: rows.length - withGenre.length,
  };
  notFoundNames.value = notFound.sort();

  downloadCsv(headers, withGenre);
});
</script>

<style lang="scss">
.app {
  padding: 60px 24px 80px;
  max-width: 880px;
  margin: 0 auto;

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin-bottom: 2rem;
    border-bottom: var(--border);
    padding-bottom: 1rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -1px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  &__split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }

  &__namelists {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;

    span {
      color: #555;
    }

    a {
      color: var(--text-color-default);
      background: var(--accent);
      border: 2px solid #0a0a0a;
      padding: 2px 8px;
      text-decoration: none;
      box-shadow: 3px 3px 0 #0a0a0a;
      transition: box-shadow 0.1s, transform 0.1s;

      &:hover {
        box-shadow: 1px 1px 0 #0a0a0a;
        transform: translate(2px, 2px);
      }
    }
  }

  &__stats {
    margin-top: 2rem;
    padding: 1.5rem;
    border: var(--border);
    background: var(--background-1);
    box-shadow: var(--shadow);
  }

  &__stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 1.25rem;
  }

  &__stat-card {
    border: var(--border);
    padding: 0.75rem 1rem;
    background: var(--background-0);
    box-shadow: 4px 4px 0 #0a0a0a;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &--positive {
      background: #c8ffd4;
    }

    &--negative {
      background: #ffd4c8;
    }
  }

  &__stat-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
  }

  &__stat-value {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
  }

  &__hint {
    color: #5e5a55;
  }

  &__instructions {
    color: #5e5a55;
    margin-top: 2rem;
    h3 {
      margin-top: 1.5rem;
    }
    ol {
      list-style-type: decimal;
      padding-left: 20px;
      > li {
        margin-bottom: 0.5rem;
      }
    }
    ul {
      list-style-type: disc;
      padding-left: 20px;
      > li {
        margin: 0.1rem 0;
      }
    }
  }

  &__notfound {
    margin-bottom: 1.25rem;
    border: var(--border);
    padding: 1rem;
    background: #fff8cc;
    max-height: 280px;
    overflow-y: auto;

    ul {
      margin: 0;
      padding-left: 1.25rem;
      columns: 3;
      font-size: 0.82rem;
    }
  }

  &__btn {
    display: inline-block;
    background: var(--accent);
    color: #0a0a0a;
    border: var(--border);
    box-shadow: var(--shadow);
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: box-shadow 0.1s, transform 0.1s;

    &:hover {
      box-shadow: var(--shadow-hover);
      transform: translate(2px, 2px);
    }

    &:active {
      box-shadow: none;
      transform: translate(5px, 5px);
    }
  }

  &__github-link {
    display: inline-flex;
    align-items: center;
    margin-top: 0.5rem;
    color: #0a0a0a;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.6;
    }
  }

  &__contact {
    text-align: center;
    margin-top: 3rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
</style>
