<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isDeletable?: boolean;
    isSelectable?: boolean;
    isPadding?: boolean;
  }>(),
  {
    isDeletable: false,
    isSelectable: false,
    isPadding: true,
  }
);

const { isDeletable, isSelectable, isPadding } = toRefs(props);
const isOpenCloseBtn = ref(false);
const closeBtnRef = ref<HTMLElement>();
const classOptions = computed(() => {
  return [
    isSelectable.value ? "btn-base" : "chip-base",
    isPadding.value ? "p-0.5-3" : "",
  ];
});

const handleToggleCloseBtn = () => {
  isDeletable.value && (isOpenCloseBtn.value = !isOpenCloseBtn.value);
};
</script>

<template>
  <div
    :class="classOptions"
    class="relative"
    relative
    w-fit
    @mouseenter="handleToggleCloseBtn"
    @mouseleave="handleToggleCloseBtn"
  >
    <slot></slot>
    <div
      ref="closeBtnRef"
      v-if="isOpenCloseBtn"
      class="animate-[zoom-in_300ms]"
      absolute
      inset-0
      flex
      justify-center
      items-center
      rounded-full
      bg="#fff3 dark:#0003"
      backdrop-blur-sm
      cursor-pointer
    >
      <div class="i-line-md:close-circle" bg="#000a dark:#fffa"></div>
    </div>
  </div>
</template>
