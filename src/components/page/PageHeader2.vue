<template>
  <div :class="`header2-page header2-page--${color}`">
    <div class="header2-page__left">
      <h2>{{props.title}}</h2>
    </div>
    <div class="header2-page__right">
      <slot/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  color: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style lang="scss">
.header2-page {
  margin-bottom: 10px;
  display: flex;

  &__left {
    flex: 1 1 auto;
  }
  &__right {
    flex: 0 1 auto;
    .q-btn {
      transform: scale(0.8);
    }
  }
  h2 {
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .q-btn {
    padding: 0;
    margin: 0;
  }
}
</style>
