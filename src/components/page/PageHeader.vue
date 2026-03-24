<template>
  <div class="header-page">
    <div v-if="breadcrumbs?.length" class="header-page__breadcrumbs">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          v-for="(br, i) in breadcrumbs"
          :key="i"
          :label="br.label"
          :to="br.to"
        />
      </q-breadcrumbs>
    </div>
    <div class="header-page__title">
      <div class="header-page__left">
        <h1>
          {{props.title}}
        </h1>
      </div>
      <div class="header-page__right">
        <slot/>
      </div>
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
  breadcrumbs: {
    type: Array,
    required: false,
    default: () => ([]),
  },
});
</script>

<style lang="scss">
.header-page {
  &__title {
    margin-top: 6px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .q-breadcrumbs {
    color: var(--q-grey);
  }
  h1 {
    margin-bottom: 0;
  }
  .q-btn {
    margin-top: 0;
    margin-left: 0;
    line-height: 17px;
    &--round {
      font-size: 10px;
      width: 33px;
      height: 33.6px;
      display: block;
      line-height: 0;
    }
  }
  &__right {
    display: flex;
    gap: 6px;
  }
}
</style>
