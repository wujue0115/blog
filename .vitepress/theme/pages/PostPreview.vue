<script lang="ts" setup>
import type { TTagLogic, TSortType } from "../types";
import { useRoute } from "vitepress";

import Divider from "../components/atoms/Divider.vue";
import TagPanel from "../components/organisms/PostPreviewTagPanel.vue";
import TagLogicPanel from "../components/organisms/PostPreviewTagLogicPanel.vue";
import SortPanel from "../components/organisms/PostPreviewSortPanel.vue";
import PostList from "../components/organisms/PostList.vue";

const route = useRoute();

const selectedTags = ref<string[]>([]);
const isOpenTagSelectorPanel = ref(false);

const selectedTagLogic = ref<TTagLogic>("and");
const isOpenTagLogicSelectorPanel = ref(false);

const selectedSortType = ref<TSortType>("publishDateNewToOld");
const isOpenSortSelectorPanel = ref(false);

const handleCloseSelectorPanel = () => {
  isOpenTagSelectorPanel.value = false;
  isOpenSortSelectorPanel.value = false;
  isOpenTagLogicSelectorPanel.value = false;
};

const handleQueryStringTag = () => {
  const url = new URL(window.location.href);
  const tag = url.searchParams.get("tag");
  if (tag) {
    selectedTags.value.push(tag);
  }
};

onBeforeMount(() => {
  handleQueryStringTag();
});

watch(
  [
    isOpenTagSelectorPanel,
    isOpenTagLogicSelectorPanel,
    isOpenSortSelectorPanel,
  ],
  (newValue, oldValue) => {
    const openSelectorPanels = [
      isOpenTagSelectorPanel,
      isOpenTagLogicSelectorPanel,
      isOpenSortSelectorPanel,
    ];

    let triggerIndex = -1;
    newValue.forEach((value, index) => {
      if (value && !oldValue[index]) {
        triggerIndex = index;
      }
    });

    if (triggerIndex === -1) return;

    openSelectorPanels.forEach((value, index) => {
      if (index !== triggerIndex) {
        openSelectorPanels[index].value = false;
      }
    });
  }
);
</script>

<template>
  <div
    flex
    justify-center
    min-h-100svh
    overflow-hidden
    lg="mt-16"
    @click="handleCloseSelectorPanel"
  >
    <div p="y-12" w="85% sm:80% md:60%">
      <h1 text="center 32px" leading-32px font-600>所有文章</h1>

      <Divider m="t-4" />

      <TagPanel
        v-model="selectedTags"
        v-model:isOpenPanel="isOpenTagSelectorPanel"
      />

      <Divider />

      <TagLogicPanel
        v-model="selectedTagLogic"
        v-model:isOpenPanel="isOpenTagLogicSelectorPanel"
      />

      <Divider />

      <SortPanel
        v-model="selectedSortType"
        v-model:isOpenPanel="isOpenSortSelectorPanel"
      />

      <Divider />

      <PostList
        :tags="selectedTags"
        :tagLogic="selectedTagLogic"
        :sortType="selectedSortType"
      />
    </div>
  </div>
</template>
