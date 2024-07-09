<script lang="ts" setup>
import Chip from "../Chip.vue";

const props = defineProps<{
  items: string[];
}>();
const emits = defineEmits(["change"]);

const chipStyle = ref({});
const panelRef = ref<HTMLElement | null>(null);

const handleClick = (item: string) => {
  emits("change", item);
};

onMounted(() => {
  nextTick(() => {
    chipStyle.value = {
      transform: "translateX(0px)",
      opacity: 1,
    };
  });
});
</script>

<template>
  <div ref="panelRef" w-full h-full>
    <Chip
      v-for="(item, index) in items"
      :key="item"
      :style="{
        transitionDelay: `${index * 30}ms`,
        ...chipStyle,
      }"
      is-selectable
      @click="handleClick(item)"
      m="t-3"
      whitespace-nowrap
      opacity-30
      translate="x-[150px]"
      duration="300"
      ease-out
    >
      {{ item }}
    </Chip>
  </div>
</template>
