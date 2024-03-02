<script lang="ts" setup>
import { data as posts } from "../../posts.data";
import { useToggle } from "../../composables/useToggle";
import Chip from "../atoms/Chip.vue";
import Buttom from "../atoms/Buttom.vue";
import Selector from "../atoms/Selector/index.vue";

const selectedTags = defineModel<string[]>({
  default: [],
});
const isOpenSelectorPanel = defineModel<boolean>("isOpenPanel", {
  default: false,
});

const tagSelectorPanelTrigger = ref(0);
const unSelectedTags = ref<string[]>(posts[0].allTags.sort());

const triggerTagSelectorPanelAdjust = () => {
  isOpenSelectorPanel.value && (tagSelectorPanelTrigger.value ^= 1);
};

const handleToggleTagSelector = (isOpen?: boolean) => {
  if (unSelectedTags.value.length === 0) return;

  isOpenSelectorPanel.value = useToggle(isOpenSelectorPanel.value, isOpen);
  triggerTagSelectorPanelAdjust();
};

const handleSelectTag = (tag: string) => {
  unSelectedTags.value = unSelectedTags.value.filter((t) => t !== tag);
  selectedTags.value = [...selectedTags.value, tag];
  triggerTagSelectorPanelAdjust();
};

const handleUnSelectTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  unSelectedTags.value.push(tag);
  unSelectedTags.value = unSelectedTags.value.sort();
  triggerTagSelectorPanelAdjust();
};
</script>

<template>
  <div p="y-4">
    <p font-600>選擇標籤</p>
    <div m="t-2" flex="~ wrap" justify-start items-center gap-2>
      <Chip
        v-for="tag in selectedTags"
        :key="tag"
        is-deletable
        is-selectable
        @click="handleUnSelectTag(tag)"
        >{{ tag }}</Chip
      >
      <Selector
        v-model:isOpenPanel="isOpenSelectorPanel"
        v-model:trigger="tagSelectorPanelTrigger"
        :items="unSelectedTags"
        @change="handleSelectTag"
      >
        <template #input>
          <Buttom
            :is-padding="false"
            @click.stop="handleToggleTagSelector"
            p-1.5
          >
            <div class="i-material-symbols:bookmark-add-outline-rounded"></div>
          </Buttom>
        </template>
      </Selector>
    </div>
  </div>
</template>
