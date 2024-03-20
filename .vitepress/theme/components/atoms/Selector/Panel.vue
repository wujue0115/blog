<script lang="ts" setup>
import Chip from "../Chip.vue";

const props = defineProps<{
  items: string[];
}>();
const emits = defineEmits(["change"]);

const { items } = toRefs(props);

const handleClick = (item: string) => {
  emits("change", item);
};
</script>

<template>
  <div w-full h-full>
    <Chip
      v-for="item in items"
      :key="item"
      is-selectable
      @click="handleClick(item)"
      m="t-3"
      whitespace-nowrap
    >
      {{ item }}
    </Chip>
  </div>
</template>
