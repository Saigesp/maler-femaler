<template>
  <q-input
    v-model="model"
    outlined
    :label="props.label"
    :mask="props.mask"
    :placeholder="props.placeholder"
    :rules="props.rules"
  />
</template>

<script setup>
const model = defineModel({
  type: String,
  required: true,
  default: '',
});

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  rules: {
    type: Array,
    required: false,
    default: () => ([]),
  },
  mask: {
    type: String,
    required: false,
    default: '',
  },
});
</script>
