<script lang="ts" setup>
import { useEventListener } from "../../../composables/useEventListener";
import { useElementPositionAligner } from "../../../composables/useElementPositionAligner";

import SelectorPanel from "./Panel.vue";
import Buttom from "../Buttom.vue";

const slots = useSlots();

const selectedItem = defineModel<string>();
const isOpenSelectorPanel = defineModel<boolean>("isOpenPanel", {
  default: false,
});
const selectorPanelTrigger = defineModel<number>("trigger", {
  default: 0,
});
const props = withDefaults(
  defineProps<{
    items: string[];
    placeholder?: string;
  }>(),
  {
    items: () => [],
    placeholder: "Select",
  }
);
const emits = defineEmits(["change", "click:input"]);

const { items, placeholder } = toRefs(props);

const selectorPanelWrapperRef = ref<HTMLElement>();

const triggerSelectorPanelAdjust = () => {
  selectorPanelTrigger.value ^= 1;
};

function handleToggleSelector() {
  isOpenSelectorPanel.value = !isOpenSelectorPanel.value;
  triggerSelectorPanelAdjust();
}

const handleClickInput = () => {
  handleToggleSelector();
  emits("click:input");
};

const handleSelect = (item: string) => {
  selectedItem.value = item;
  isOpenSelectorPanel.value = false;
  emits("change", item);
};

useEventListener(window, "resize", triggerSelectorPanelAdjust);
onMounted(() => {
  useElementPositionAligner(selectorPanelTrigger, selectorPanelWrapperRef);
});
</script>

<template>
  <div relative>
    <slot name="input"></slot>
    <Buttom v-if="!slots.input" @click.stop="handleClickInput">
      <template #before>
        <slot name="input:before"></slot>
      </template>
      {{ selectedItem || placeholder }}
      <template #after>
        <slot name="input:after"></slot>
        <div
          v-if="!slots['input:after']"
          :class="
            isOpenSelectorPanel
              ? 'i-material-symbols:arrow-drop-up-rounded'
              : 'i-material-symbols:arrow-drop-down-rounded'
          "
        ></div>
      </template>
    </Buttom>
    <div
      ref="selectorPanelWrapperRef"
      v-if="isOpenSelectorPanel"
      absolute
      z-1
      top-full
      left-0
      m="t-2"
      p="x-3 b-3"
      max-w-300px
      max-h-300px
      overflow-scroll
      box-border
      rounded-md
      outline-base
      bg="[var(--vp-c-bg)]"
    >
      <SelectorPanel :items="items" @change="handleSelect" />
    </div>
  </div>
</template>
