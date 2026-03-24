<template>
  <q-select
    v-model="value"
    class="input-boolean"
    outlined
    :options="options"
    :display-value="getDisplayValue(value)"
    :rules="rules"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits([
  'update:modelValue',
]);

const props = defineProps({
  modelValue: {
    validator: (v) => typeof v === 'boolean' || v === '',
    required: true,
    default: '',
  },
  allowEmpty: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const choices = [{
  value: true,
  label: t('common.yes'),
}, {
  value: false,
  label: t('common.no'),
}];

const options = computed(() => (
  props.allowEmpty
    ? [{ label: t('common.all-options'), value: '' }].concat(choices)
    : choices
));

const value = computed({
  get() {
    const opt = options.value.find((i) => i.value === props.modelValue);
    return opt === undefined ? '' : opt.value;
  },
  set(val) {
    emit('update:modelValue', val.value);
  },
});

const getDisplayValue = (val) => {
  const opt = options.value.find((i) => i.value === val);
  return (!opt || opt.value === '') ? '' : opt.label;
};

const rules = props.allowEmpty
  ? []
  : [(val) => (val === true || val === false) || t('error.required-field')];
</script>
