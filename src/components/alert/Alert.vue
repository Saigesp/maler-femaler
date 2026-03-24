<template>
  <div :class="classes" :style="style">
    <div v-if="props.showIcon" class="alert__icon">
      <q-icon :name="icon" size="1.3em"/>
    </div>
    <div class="alert__content">
      <slot/>
    </div>
    <div class="alert__actions">
      <slot name="actions"/>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useColor } from '@/composables/Color';

const { statusColor } = useColor();

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'info',
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: true,
  },
  inline: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const classes = computed(() => {
  const cls = ['alert'];
  if (props.type) cls.push(`alert--${props.type}`);
  if (!props.showIcon) cls.push('alert--no-icon');
  if (props.inline) cls.push('alert--inline');
  return cls.join(' ');
});

const icon = computed(() => {
  if (props.icon) return props.icon;
  if (props.type === 'info') return 'info';
  if (props.type === 'success') return 'done';
  if (props.type === 'warning') return 'warning';
  return 'error';
});

const style = computed(() => {
  const colorScheme = statusColor(props.type);
  return {
    color: colorScheme[0],
    backgroundColor: colorScheme[1],
    borderColor: colorScheme[2],
  };
});
</script>

<style lang="scss">
.alert {
  display: flex;
  background: #e0e0e0;
  border-radius: 4px !important;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 1.6;

  &--no-icon {
    .alert__content {
      padding-left: 14px;
    }
  }
  &--inline {
    margin-top: 2px;
    .alert__content {
      padding: 0 6px 0 6px;
      font-size: small;
      font-weight: 700;
      line-height: 22px;
    }
  }
  &__icon {
    padding: 10px;
    line-height: 1em;
  }
  &__content {
    flex: 1 1 auto;
    padding: 8px 14px 8px 0;
    > a {
      color: inherit;
      font-weight: 600;
      text-decoration: underline;
    }
  }
  &__actions {
    > .q-btn {
      margin: 3px;
      padding: 6px 16px;
    }
  }
}
</style>
