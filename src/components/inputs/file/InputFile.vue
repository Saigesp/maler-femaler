<template>
  <div class="input-file">
    <q-file
      v-show="false"
      ref="input"
      v-model="file"
      filled
      :max-file-size="props.maxSize"
      :rules="props.rules"
      @rejected="onRejected"
      @update:model-value="loadFile"
    />
    <div class="input-file__input">
      <div class="input-file__name" @click="openSelector">
        <div class="input-file__label">
          {{props.label || 'Archivo'}}
        </div>
        <div class="input-file__name">
          {{filename}}
        </div>
      </div>
      <div v-if="!loading && props.allowDelete" class="input-file__actions">
        <q-btn
          v-if="filename"
          round
          color="negative"
          icon="delete"
          @click="emptyFile"
        />
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
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

const quasar = useQuasar();

const model = defineModel({
  validator: (v) => typeof v === 'string' || typeof v === 'object' || v === null || v === undefined,
  required: false,
  default: null,
});

const emit = defineEmits([
  'set-name',
]);

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  allowDelete: {
    type: Boolean,
    required: false,
    default: true,
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
    default: 'base64',
  },
});

const input = ref(null);
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
  };
  reader.onerror = (error) => {
    quasar.notify({ type: 'negative', message: `${error}` });
    loading.value = false;
  };
};

const onRejected = (rejectedEntries) => {
  quasar.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
};

const openSelector = () => {
  if (loading.value) return;
  input.value.$el.click();
};

const emptyFile = () => {
  file.value = null;
  model.value = null;
};
</script>

<style lang="scss">
.input-file {
  margin-bottom: 0.5rem;
  padding-bottom: 28px;

  &__name {
    cursor: pointer;
    flex: 1 1 auto;
  }
  &__label {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 11px;
    line-height: 1;
  }
  &__input {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-radius: 4px;
    padding: 0 12px;
    height: 56px;
    max-width: 100%;
    outline: none;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(0, 0, 0, 0.24);
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &__loading {
    margin-top: 15px;
  }
  &__actions {
    .q-btn {
      width: 38px;
      margin: 0;
      margin-top: 9px;
    }
  }
}
</style>
