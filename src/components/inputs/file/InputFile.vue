<template>
  <div class="input-file">
    <q-file
      v-show="false"
      ref="input"
      v-model="file"
      outlined
      :accept="props.accept"
      :max-file-size="props.maxSize"
      :rules="props.rules"
      @rejected="onRejected"
      @update:model-value="loadFile"
    />
    <div class="input-file__input" @click="openSelector">
      <div class="input-file__name">
        <div class="input-file__label">
          {{props.label || 'Archivo'}}
        </div>
        <div class="input-file__name">
          {{filename}}
        </div>
      </div>
      <q-spinner-oval
        v-if="loading"
        class="input-file__loading"
        color="primary"
        size="1.5em"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const model = defineModel({
  validator: (v) => typeof v === 'string' || typeof v === 'object' || v === null || v === undefined,
  required: false,
  default: null,
});

const emit = defineEmits([
  'set-name',
  'loaded',
]);

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  accept: {
    type: String,
    required: false,
    default: '*/*',
  },
  maxSize: {
    type: Number,
    required: false,
    default: 1024 * 1024 * 5,
  },
  rules: {
    type: Array,
    required: false,
    default: () => ([]),
  },
  mode: {
    validator: (v) => ['base64', 'blob', 'buffer'].includes(v),
    type: String,
    required: false,
    default: 'blob',
  },
  autofocus: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const quasar = useQuasar();
const input = useTemplateRef('input');
const file = ref(null);
const loading = ref(false);

const filename = computed(() => {
  if (file.value) return file.value.name;
  if (model.value && typeof model.value === 'string') return model.value.split('/').pop();
  return '';
});

const loadFile = (fileObject) => {
  const reader = new FileReader();
  loading.value = true;
  if (props.mode === 'blob') {
    emit('set-name', fileObject.name);
    model.value = fileObject;
    loading.value = false;
    emit('loaded', fileObject);
    return;
  }
  if (props.mode === 'buffer') {
    reader.readAsArrayBuffer(fileObject);
  } else {
    reader.readAsDataURL(fileObject);
  }
  reader.onload = () => {
    emit('set-name', filename.value);
    model.value = reader.result;
    loading.value = false;
    emit('loaded', reader.result);
  };
  reader.onerror = (error) => {
    quasar.notify({ type: 'negative', message: `${error}` });
    loading.value = false;
  };
};

const onRejected = (rejectedEntries) => {
  console.error('file rejected:', rejectedEntries);
  quasar.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation`,
  });
};

const openSelector = () => {
  if (loading.value) return;
  input.value.$el.click();
};

onMounted(() => {
  if (props.autofocus) input.value.pickFiles();
});
</script>

<style lang="scss">
.input-file {
  margin-bottom: 0.5rem;
  padding-bottom: 20px;

  &__input {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 0;
    padding: 0 14px;
    height: 56px;
    max-width: 100%;
    outline: none;
    background: var(--background-1);
    border: var(--border);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: box-shadow 0.1s, transform 0.1s;

    &:hover {
      box-shadow: var(--shadow-hover);
      transform: translate(2px, 2px);
    }
  }

  &__name {
    cursor: pointer;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: 0.9rem;
  }

  &__label {
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.5;
    margin-top: 2px;
    line-height: 1;
  }

  &__loading {
    color: var(--text-color-default);
  }
}
</style>
