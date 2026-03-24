<template>
  <div
    class="tag"
    :style="{
      color: props.color[0],
      backgroundColor: props.color[1],
      borderColor: props.color[2],
    }">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: Array,
    required: false,
    default: () => ([
      'black',
      'white',
      'black',
    ]),
  },
});
</script>

<style lang="scss">
.tag {
  display: inline-block;
  padding: 2px 4px;
  line-height: 1;
  border-radius: 4px;
  border-style: solid;
  border-width: 0.2px;
  font-weight: 700;
  font-size: 12px;
}
</style>
