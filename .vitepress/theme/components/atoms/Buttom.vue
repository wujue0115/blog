<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isPadding?: boolean;
  }>(),
  {
    isPadding: true,
  }
);

const { isPadding } = toRefs(props);
const classOptions = computed(() => {
  return [isPadding.value ? "p-0.5-3" : ""];
});
</script>

<template>
  <button :class="classOptions" btn-base flex items-center>
    <slot name="before"></slot>
    <slot></slot>
    <slot name="after"></slot>
  </button>
</template>
